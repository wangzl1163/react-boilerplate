import Lodash from "lodash";
import { fabric } from "fabric";

import Constant from "./Constant";
import MathHelper from "./MathHelper";

let timerId;

class Road {
   // 中上点坐标, 用于定位 group
   basePos;
   // 实际长和宽 { width, height, justWidth, reverseWidth }
   realBound;
   // 实际坐标
   coords;
   // 路背景块
   bgRect;
   // left, top, width, height. 从 group 取出来的, 不知为何有误差(待查), 最好用 realBound
   boundingRect;
   // 组
   group;
   // 标识
   numberTag;

   /**
    * 构造函数
    * @param {*} canvas fabric.Canvas 实例
    * @param {*} data road data
    * @param {*} center canvas center
    * @param { number } angle 角度
    * @param { function } onChange 变形操作后的回调
    */
   constructor(canvas, data, center, angle, onChange) {
      this.canvas = canvas;
      this.roadData = data;
      this.canvasCenter = center;
      this.angle = data.angle !== undefined ? data.angle : angle;
      this.onChange = onChange;

      this.basePos = data.basePos || MathHelper.getOutPos(this.canvasCenter, this.canvasCenter.pr, this.angle + 90);

      const laneWidth = data.laneWidth || Constant.defaultValues.roadData.laneWidth;
      this.realBound = {
         width: laneWidth * (this.roadData.laneCount + this.roadData.reverseLaneCount),
         height: data.height || this.canvasCenter.r - this.canvasCenter.pr,
         justWidth: laneWidth * this.roadData.laneCount,
         reverseWidth: laneWidth * this.roadData.reverseLaneCount
      };

      this.draw();
      this.showNumberTag();
   }

   showNumberTag() {
      this.numberTag && this.canvas.remove(this.numberTag);

      const groupCoords = this.group.getCoords();
      const lt = groupCoords[0];
      const pos = MathHelper.getOutPos(lt, 20, this.angle);

      this.numberTag = new fabric.Text(String(this.roadData.code), {
         left: pos.x,
         top: pos.y,
         originX: "center",
         originY: "center",
         fontSize: 20,
         selectable: false,
         fill: "#fff"
      });
      this.canvas.add(this.numberTag);
   }

   bindGroupClickEvent() {
      this.group.on("selected", (e) => {
         window.onRoadSketchSelected(this.roadData.code);
      });
   }

   draw(roadItem) {
      this.remove();

      this.drawRoad(roadItem);
      this.drawBaseLine();
      this.drawLane();
      this.drawStopLine();
      this.drawReverseLane();
      if (this.roadData.zebra.show === 1) {
         this.drawZebra();
      }
      if (this.roadData.secondZebra.show === 1) {
         this.drawSecondZebra();
      }

      timerId = setTimeout(() => this.canvas.renderAll(), 500);

      this.bindEvt();
      this.bindGroupClickEvent();
   }

   remove() {
      if (this.group) {
         clearTimeout(timerId);
         this.canvas.remove(this.group);
      }
   }

   drawRoad(roadItem) {
      let curAngle = 0; // 增加偏移角联动
      let curX = 0; // 增加偏移角联动
      let curY = 0; // 增加偏移角联动
      if (roadItem) {
         curAngle = Number(roadItem.roadData.coordinateAzimuth) || 0;
         curX = Number(roadItem.roadData.xDeviation) || 0;
         curY = Number(roadItem.roadData.yDeviation) || 0;
      }
      this.bgRect = new fabric.Rect({
         left: this.basePos.x + curX,
         top: this.basePos.y + curY,
         fill: "transparent",
         width: this.realBound.width,
         height: this.realBound.height,
         angle: this.angle + curAngle,
         originX: "center"
      });

      // 四个角真实坐标
      this.coords = this.bgRect.getCoords();

      this.boundingRect = this.bgRect.getBoundingRect();

      // 重置角度后加入组
      this.bgRect.set("angle", 0);
      this.bgRect.set("left", 0);
      this.bgRect.set("top", 0);
      this.bgRect.set("originX", "left");

      const rect1 = new fabric.Rect({
         left: 0,
         top: 0,
         fill: this.roadData.round ? "transparent" : "#3e3e3c",
         width: this.realBound.justWidth,
         height: this.realBound.height,
         originX: "left",
         originY: "top"
      });
      const rect2 = new fabric.Rect({
         left: this.realBound.justWidth - 0.5,
         top: 0,
         fill: this.roadData.round ? "transparent" : "#3e3e3c",
         width: this.realBound.reverseWidth,
         height: this.realBound.height,
         originX: "left",
         originY: "top"
      });

      this.group = new fabric.Group([this.bgRect, rect1, rect2], {
         left: this.boundingRect.left + this.boundingRect.width / 2, // 因为它的 left 和 right 都是有偏差的, 所以计算的宽度也用它的
         top: this.boundingRect.top + this.boundingRect.height / 2, // 因为它的 left 和 right 都是有偏差的, 所以计算的宽度也用它的
         originX: "center",
         originY: "center",
         angle: 180 + this.angle + curAngle // 使手柄向外
      });
      this.group.setControlsVisibility({
         bl: false,
         br: false,
         tl: false,
         tr: false,
         mb: false, // 使用 mb 拉伸的话会导致 center 变化, 重绘时要重新计算, 暂时禁用
         ml: false,
         mr: false // 横向拉伸也会有同样问题, 暂不使用
      });

      this.canvas.add(this.group);
   }

   drawBaseLine() {
      if (this.roadData.reverseLaneCount === 0) {
         return;
      }

      const x = this.realBound.width / 2 - this.realBound.justWidth;
      const height = this.roadData.zebra.show === 1 ? this.realBound.height - 20 : this.realBound.height;

      const line = new fabric.Line([0, 0, 0, height], {
         left: 0 - x,
         top: 0 - this.realBound.height / 2,
         stroke: "#ff9632",
         strokeWidth: 2
      });
      this.group.add(line);
   }

   drawLane() {
      const { laneStreamImg, laneFeature } = Constant.dictionary;
      const { laneData } = this.roadData;

      for (let i = 0; i < laneData.length; i++) {
         const x = parseInt(0 - (this.realBound.width / 2 - this.realBound.justWidth) - (i + 1) * this.roadData.laneWidth, 10);
         const y = parseInt(this.realBound.height / 2, 10);
         const y1 = this.roadData.zebra.show === 1 ? 23 - y : -y; // 23 留给停车线和斑马线

         // 因为 4 条路只需画 3 条线, 所以
         if (i < laneData.length - 1) {
            const line = new fabric.Line([0, y, 0, y1], {
               left: x + 0.5,
               top: 0 - y + 0.5,
               stroke: this.roadData.round ? "transparent" : "#fff",
               strokeWidth: 2
            });
            this.group.add(line);
         }

         // 导向箭头
         const scaleWidth = this.roadData.laneWidth * 5;
         const scaleHeight = this.roadData.laneWidth - 2;
         const offsetY = this.roadData.round ? this.roadData.laneWidth + 5 : this.roadData.laneWidth + 35;
         const offsetX = this.roadData.laneWidth / 5;

         const stream = laneData[i].stream.sort();
         const laneStreamItem = laneStreamImg.find((x) => Lodash.isEqual(stream, x.code));
         if (laneStreamItem) {
            const imgName = laneStreamItem.img;
            fabric.Image.fromURL(
               `./static/img/${imgName}.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth);
                  oImg.scaleToHeight(scaleHeight);
                  oImg.rotate(-90);
                  this.group.add(oImg);
               },
               {
                  left: x - offsetX,
                  top: y - offsetY,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         // 摄像头
         const scaleWidth2 = this.roadData.laneWidth * 5 - 1;
         const scaleHeight2 = this.roadData.laneWidth - 2 - 1;
         const offsetY2 = this.roadData.laneWidth + 67;
         const offsetX2 = this.roadData.laneWidth / 5 - 6;

         const bindCamara = laneData[i].bindCamara;
         if (bindCamara) {
            fabric.Image.fromURL(
               `./static/img/camera.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth2);
                  oImg.scaleToHeight(scaleHeight2);
                  oImg.rotate(-90);
                  this.group.add(oImg);
               },
               {
                  left: x - offsetX2,
                  top: y - offsetY2,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         // 检测器1
         const scaleWidth3 = this.roadData.laneWidth * 5 - 1;
         const scaleHeight3 = this.roadData.laneWidth - 2 - 1;
         const offsetY3 = this.roadData.laneWidth + 85;
         const offsetX3 = this.roadData.laneWidth / 5 - 6;

         const bindDetector1 = laneData[i].bindDetector1;
         if (bindDetector1 && bindDetector1 != "0") {
            fabric.Image.fromURL(
               `./static/img/detector.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth3);
                  oImg.scaleToHeight(scaleHeight3);
                  oImg.rotate(-90);
                  this.group.add(oImg);
               },
               {
                  left: x - offsetX3,
                  top: y - offsetY3,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         // 检测器2
         const scaleWidth4 = this.roadData.laneWidth * 5 - 1;
         const scaleHeight4 = this.roadData.laneWidth - 2 - 1;
         const offsetY4 = this.roadData.laneWidth + 105;
         const offsetX4 = this.roadData.laneWidth / 5 - 6;
         const bindDetector2 = laneData[i].bindDetector2;
         if (bindDetector2 && bindDetector2 !== "0") {
            fabric.Image.fromURL(
               `./static/img/detector.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth4);
                  oImg.scaleToHeight(scaleHeight4);
                  oImg.rotate(-90);
                  this.group.add(oImg);
               },
               {
                  left: x - offsetX4,
                  top: y - offsetY4,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         // 检测器3
         const scaleWidth5 = this.roadData.laneWidth * 5 - 1;
         const scaleHeight5 = this.roadData.laneWidth - 2 - 1;
         const offsetY5 = this.roadData.laneWidth + 125;
         const offsetX5 = this.roadData.laneWidth / 5 - 6;

         const bindDetector3 = laneData[i].bindDetector3;
         if (bindDetector3 && bindDetector3 !== "0") {
            fabric.Image.fromURL(
               `./static/img/detector.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth5);
                  oImg.scaleToHeight(scaleHeight5);
                  oImg.rotate(-90);
                  this.group.add(oImg);
               },
               {
                  left: x - offsetX5,
                  top: y - offsetY5,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         // 非机动车道
         if (laneData[i].type === 2) {
            const imgName = laneStreamImg[0].img; // 0 特别留给非机动车标志
            fabric.Image.fromURL(
               `./static/img/${imgName}.png`,
               (oImg) => {
                  oImg.scaleToWidth(scaleWidth);
                  oImg.scaleToHeight(scaleHeight);
                  // oImg.rotate(-90)
                  this.group.add(oImg);
               },
               {
                  left: x,
                  top: y - offsetY - offsetY,
                  originX: "left",
                  originY: "top"
               }
            );
         }

         //#region 可变车道
         laneData[i].laneFeature &&
            laneData[i].laneFeature.forEach((lf) => {
               if (laneFeature[lf] && lf === laneFeature.variable_lane.code) {
                  let scaleWidth3 = this.roadData.laneWidth;
                  let scaleHeight3 = this.roadData.laneWidth * 4.1;
                  const imgName = laneFeature[lf].img;

                  fabric.Image.fromURL(
                     `./static/img/${imgName}.png`,
                     (oImg) => {
                        oImg.scaleToWidth(scaleWidth3);
                        oImg.scaleToHeight(scaleHeight3);
                        oImg.top = oImg.height - oImg.getScaledHeight() - 23;
                        this.group.add(oImg);
                     },
                     {
                        left: x + 1.5
                     }
                  );
               }
            });
         //#endregion

         //#region 公交车道
         laneData[i].laneFeature &&
            laneData[i].laneFeature.forEach((lf) => {
               if (laneFeature[lf] && lf === laneFeature.bus_lane.code) {
                  this.drawImage(laneFeature[lf].img, {
                     callback: (oImg) => {
                        let scaleWidth3 = this.roadData.laneWidth >= oImg.width ? oImg.width : this.roadData.laneWidth;
                        let scaleHeight3 = scaleWidth3 * 3.5;

                        oImg.scaleToWidth(scaleWidth3);
                        oImg.scaleToHeight(scaleHeight3);

                        oImg.left = x + 1.5 + (this.roadData.laneWidth > oImg.width ? (this.roadData.laneWidth - oImg.width) / 2 : 0);
                        oImg.top = -this.realBound.height / 2;
                     }
                  });
               }
            });
         //#endregion
      }
   }

   drawStopLine = () => {
      // 停车线
      const x = -(this.realBound.width / 2 - this.realBound.justWidth);
      const y = this.realBound.height / 2;

      const line = new fabric.Line([0, 0, -this.realBound.justWidth, 0], {
         left: x - this.realBound.justWidth,
         top: this.roadData.zebra.show === 1 ? y - 22 : y - 2,
         stroke: "#ffffff",
         strokeWidth: 2
      });
      this.group.add(line);
   };

   drawReverseLane() {
      for (let i = 1; i < this.roadData.reverseLaneCount; i++) {
         const x = parseInt(0 - (this.realBound.width / 2 - this.realBound.justWidth) + i * this.roadData.laneWidth, 10);
         const y = parseInt(this.realBound.height / 2, 10);
         const y1 = this.roadData.zebra.show === 1 ? y - 22 : y; // 22 留给斑马线, 因为不需要停车线, 所以比另一面少 1
         const line = new fabric.Line([x + 0.5, y1 + 0.5, x + 0.5, -y + 0.5], {
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeDashArray: [5, 5]
         });
         this.group.add(line);
      }
   }

   drawZebra() {
      // 斑马线
      const x = this.realBound.width / 2 - (this.realBound.width - 2);
      const y = this.realBound.height / 2;

      const length = this.roadData.secondZebra.show === 1 ? this.realBound.justWidth - 9 : this.realBound.width;

      const line = new fabric.Line([0, 0, length, 0], {
         left: x,
         top: y - 18,
         stroke: "#ffffff",
         strokeWidth: 18,
         strokeDashArray: [4, 5]
      });
      this.group.add(line);
   }

   drawSecondZebra() {
      const x = this.realBound.width / 2 - (this.realBound.reverseWidth - 2 - 9);
      const y = this.realBound.height / 2;

      const length = this.realBound.reverseWidth - 9 - 2 - 2;

      const line = new fabric.Line([0, 0, -length, 0], {
         left: x,
         top: y - 18,
         stroke: "#ffffff",
         strokeWidth: 18,
         strokeDashArray: [4, 5]
      });
      this.group.add(line);

      const rect = new fabric.Rect({
         left: x - 18,
         top: y - 18,
         fill: "transparent",
         stroke: "#ffffff",
         strokeWidth: 2,
         width: 12,
         height: 16,
         originX: "left",
         originY: "top"
      });
      this.group.add(rect);
   }

   bindEvt() {
      // 拖放, 旋转, 拉伸时, 保存数据和重绘
      this.group.on("scaled", (e) => {
         const { newScaleY } = e.transform;
         // if (e.by === 'x') {
         //     this.realBound.width *= newScaleX;
         // }
         if (e.by === "y") {
            this.realBound.height *= newScaleY;
         }
         this.draw();
         this.showNumberTag();
      });
      this.group.on("moving", (e) => {
         const { mt } = e.target.oCoords;
         const centerPos = this.group.getCenterPoint();
         const groupDeg = this.group.get("angle");
         // 计算 中上 点(绘制基础 rect 时使用的 left, top)
         // group 本身朝上, 所以要补回 this.angle
         const pos = MathHelper.posRotate(centerPos, mt, -MathHelper.deg2Angle(groupDeg - this.angle));

         this.basePos.x = pos.x;
         this.basePos.y = pos.y;

         this.group.setCoords();

         this.onChange();
         this.showNumberTag();
      });
      this.group.on("rotating", (e) => {
         const angle = this.group.get("angle");
         // basePos 也旋转了, 要重新计算
         const centerPos = this.group.getCenterPoint();
         const pos = MathHelper.posRotate(centerPos, this.basePos, MathHelper.deg2Angle(angle - this.angle + 180));
         this.basePos.x = pos.x;
         this.basePos.y = pos.y;
         this.angle = angle - 180; // 画的时候为了使手柄向外, 加了 180, 这里要减去. 还有上边 ↑ 这里

         this.group.setCoords();

         this.onChange();
         this.showNumberTag();
      });
   }

   getData = () => {
      const data = {
         basePos: this.basePos,
         height: this.realBound.height,
         angle: this.angle
      };
      return data;
   };

   drawImage(fileName, options, group = this.group) {
      const cb = options.callback;

      delete options.callback;

      fabric.Image.fromURL(
         `./static/img/${fileName}.png`,
         (oImg) => {
            if (!isNaN(options.scaleWidth)) {
               oImg.scaleToWidth(options.scaleWidth);
            }

            if (!isNaN(options.scaleHeight)) {
               oImg.scaleToHeight(options.scaleHeight);
            }

            if (cb) {
               cb(oImg);
            }

            if (group) {
               group.add(oImg);
            }
         },
         options
      );
   }
}

export default Road;
