import React from "react";
import Lodash from "lodash";
import { fabric } from "fabric";

import northSvg from "@/Assets/Icons/Svg/north.svg";

import Road from "./DrawRoad";

class CanalizationRenderer extends React.Component {
   constructor(props) {
      super(props);

      this.canvas = null;
      this.canvasRef = null;

      this.canvasWidth = 600;
      this.canvasHeight = 600;

      this.alien = false;

      this.canvasCenter = {
         x: 300,
         y: 300,
         r: 280, // 车道长度
         pr: 80
      };

      this.roadData = [];
      this.roadCollection = [];
      this.centerPolygon = null;

      this.drawing = false;
      this.drawingShape = null;

      this.state = {
         canvasId: Math.random().toString(36).slice(2)
      };
   }

   componentDidMount() {
      console.log("----- canalizationRenderer mounted");
      console.log("----- canvasId: ", this.state.canvasId);
      this.initCtx();
      this.props.onRef && this.props.onRef(this);
   }

   render() {
      return (
         <div className={"relative w-fit h-fit " + (this.props.className ?? "")}>
            <canvas id={this.state.canvasId} ref={(ref) => (this.canvasRef = ref)} />
            <img src={northSvg} className="absolute top-3 left-3" alt="" />
         </div>
      );
   }

   initCtx = () => {
      this.canvasRef.width = this.canvasWidth;
      this.canvasRef.height = this.canvasHeight;

      this.canvas = new fabric.Canvas(this.state.canvasId, {});
   };

   clearCanvas = () => {
      this.canvas.clear();
      this.canvas.set("backgroundColor", this.props.backgroundColor ?? "#061D3B");
      this.roadCollection = [];
      this.drawing = false;
      this.drawingShape = null;
   };

   initRoadData = (
      roadData = [],
      //customShapes = [],
      round
   ) => {
      console.log("-----init roadData : ", roadData);

      sessionStorage.setItem("current_editing_road_data", JSON.stringify(roadData));

      this.roadData = roadData;

      this.initRoad(roadData, round);
      // this.drawCustomShapes(customShapes)
   };

   editRoadDataChange = (roadData, alien, round) => {
      this.alien = alien;
      if (roadData.length !== this.roadCollection.length || round != this.round) {
         this.roadCollection = [];
         this.initRoad(roadData, round);
      } else {
         const lastData = JSON.parse(sessionStorage.getItem("current_editing_road_data"));
         roadData.forEach((item, index) => {
            const flag = Lodash.isEqual(item, lastData[index]);
            if (!flag) {
               const roadItem = this.roadCollection[index];
               roadItem.roadData = item;
               roadItem.realBound.width = item.laneWidth * (item.laneCount + item.reverseLaneCount);
               roadItem.realBound.justWidth = item.laneWidth * item.laneCount;
               roadItem.realBound.reverseWidth = item.laneWidth * item.reverseLaneCount;
               roadItem.draw(roadItem);
               this.drawCenterPolygon();
            }
            if (flag && index === 0) {
               this.drawCenterPolygon();
            }
         });
      }
      this.round = round;
      sessionStorage.setItem("current_editing_road_data", JSON.stringify(roadData));
   };

   focusRoadForIndex = (roadIndex) => {
      const group = this.roadCollection[roadIndex].group;
      this.setActiveObject(group);
   };

   initRoad = (data, round) => {
      this.clearCanvas();

      console.log("---round", round);
      if (round) {
         let customShapes = [
            {
               type: "circle",
               default: true,
               data: {
                  top: 250,
                  left: 250,
                  strokeColor: "#ffffff",
                  strokeWidth: 2,
                  angle: 0,
                  fillColor: "#3e3e3c",
                  radius: 90,
                  selectable: false
               }
            },
            {
               type: "circle",
               default: true,
               data: {
                  top: 250,
                  left: 250,
                  strokeColor: "#a8a8a8",
                  strokeWidth: 2,
                  angle: 0,
                  fillColor: "#3e3e3c",
                  radius: 75,
                  selectable: false
               }
            },
            {
               type: "circle",
               default: true,
               data: {
                  top: 250,
                  left: 250,
                  strokeColor: "#a8a8a8",
                  strokeWidth: 2,
                  angle: 0,
                  fillColor: "#3e3e3c",
                  radius: 60,
                  selectable: false
               }
            },
            {
               type: "circle",
               default: true,
               data: {
                  top: 250,
                  left: 250,
                  strokeColor: "#ffffff",
                  strokeWidth: 2,
                  angle: 0,
                  fillColor: "#3e3e3c",
                  radius: 45,
                  selectable: false
               }
            }
         ];

         this.drawCustomShapes(customShapes, true);
      } else {
         this.drawCenterPolygon();
      }

      const deg = 360 / data.length;
      // 每条路
      for (let i = 0; i < data.length; i++) {
         const road = new Road(this.canvas, data[i], this.canvasCenter, deg * i - 180, this.drawCenterPolygon);
         this.roadCollection.push(road);
      }
   };

   drawCenterPolygon = () => {
      if (this.alien) {
         this.canvas.remove(this.centerPolygon);
         return;
      } else {
         this.centerPolygon && this.canvas.remove(this.centerPolygon);

         const points = [];
         this.roadCollection.forEach((road, index) => {
            const coord = road.group.getCoords();

            if (index > 0 && index < this.roadCollection.length) {
               points.push(coord[3]);
            }
            points.push(coord[2]);
            if (index === this.roadCollection.length - 1) {
               points.push(this.roadCollection[0].group.getCoords()[3]);
            }
         });
         this.centerPolygon = new fabric.Polygon(points, {
            fill: "transparent",
            selectable: false,
            objectCaching: false
         });
         this.canvas.add(this.centerPolygon);
      }
   };

   drawCustomShapes = (customShapes, isDefault) => {
      const shapes = {};
      customShapes.forEach((item, index) => {
         let shape;
         switch (item.type) {
            case "line":
               shape = this.initLineShape(item.data);
               break;
            case "polyline":
            case "polygon":
               shape = this.initPolygonShape(item.data);
               break;
            case "rect":
               shape = this.initRectShape(item.data);
               break;
            case "circle":
               shape = this.initCircleShape(item.data, isDefault);
               break;
            case "text":
               shape = this.initTextShape(item.data);
               break;
            case "image":
            case "go":
            case "left":
            case "right":
            case "goLeft":
            case "goRight":
            case "goTurn":
            case "goLeftRight":
            case "bike":
               this.initImageShape(item.data, index);
               return;
            case "zebra":
               shape = this.initZebraShape(item.data);
               break;
            default:
         }

         this.canvas.add(shape);
         if (!item.default) {
            shapes[index] = shape;
         }
      });
      if (!isDefault) {
         this.props.onCustomShapesAdded(shapes);
      }
   };

   addShape = (shapeName, data) => {
      this.canvas.off("mouse:down");
      this.canvas.off("mouse:move");
      this.drawing = false;
      this.canvas.remove(this.drawingShap);
      switch (shapeName) {
         case "rect":
            this.addRectShape();
            break;
         case "line":
            this.addLineShape();
            break;
         case "polyline":
            this.addPolyShape("polyline");
            break;
         case "polygon":
            this.addPolyShape("polygon");
            break;
         case "circle":
            this.addCircleShape();
            break;
         case "text":
            this.addTextShape();
            break;
         case "image":
            this.addImageShape(data);
            break;
         case "zebra":
            this.addZebraShape();
            break;
         case "go":
         case "left":
         case "right":
         case "goLeft":
         case "goRight":
         case "goTurn":
         case "goLeftRight":
         case "bike":
            this.addArrowShape(shapeName);
            break;
         default:
      }
   };

   deleteShape = (shape) => {
      this.canvas.remove(shape);
   };

   addRectShape = () => {
      const { customShapeStyles } = this.props;

      const origin = {};
      this.canvas.on("mouse:down", (e) => {
         if (!this.drawing) {
            this.drawing = true;
            origin.x = e.pointer.x;
            origin.y = e.pointer.y;
            this.drawingShape = new fabric.Rect({
               top: e.pointer.y,
               left: e.pointer.x,
               width: 1,
               height: 1,
               stroke: customShapeStyles.strokeColor,
               fill: customShapeStyles.fillColor,
               strokeWidth: customShapeStyles.strokeWidth,
               selectable: true
            });
            this.canvas.add(this.drawingShape);
            this.setControl(this.drawingShape);
            this.startDrawShape();
         } else {
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.drawing = false;
            this.props.onAddCustomShape({
               type: "rect",
               shape: this.drawingShape
            });
            this.drawingShape = null;
            this.stopDrawShape();
         }
      });

      this.canvas.on("mouse:move", (e) => {
         if (this.drawing) {
            const width = e.pointer.x - origin.x;
            const height = e.pointer.y - origin.y;
            this.drawingShape.set("width", width);
            this.drawingShape.set("height", height);
            this.canvas.renderAll();
         }
      });
   };

   addLineShape = () => {
      const { customShapeStyles } = this.props;

      this.canvas.on("mouse:down", (e) => {
         if (!this.drawing) {
            this.drawing = true;
            this.drawingShape = new fabric.Line([e.pointer.x, e.pointer.y, e.pointer.x, e.pointer.y], {
               stroke: customShapeStyles.strokeColor,
               strokeWidth: customShapeStyles.strokeWidth,
               selectable: true
            });
            this.canvas.add(this.drawingShape);
            this.setControl(this.drawingShape);
            this.startDrawShape();
         } else {
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.drawing = false;
            this.props.onAddCustomShape({
               type: "line",
               shape: this.drawingShape
            });
            this.drawingShape = null;
            this.stopDrawShape();
         }
      });

      this.canvas.on("mouse:move", (e) => {
         if (this.drawing) {
            this.drawingShape.set("x1", e.pointer.x);
            this.drawingShape.set("y1", e.pointer.y);
            this.canvas.renderAll();
         }
      });
   };

   addPolyShape = (type) => {
      const { customShapeStyles } = this.props;

      const coords = [];
      this.canvas.on("mouse:down", (e) => {
         if (!this.drawing) {
            this.drawing = true;
            coords.push({ x: e.pointer.x, y: e.pointer.y });
            coords.push({ x: e.pointer.x, y: e.pointer.y });
            setPolyline(coords);
            this.startDrawShape();
         } else {
            coords.push({ x: e.pointer.x, y: e.pointer.y });
            setPolyline(coords);
         }
      });

      this.canvas.on("mouse:move", (e) => {
         if (this.drawing) {
            coords[coords.length - 1] = {
               x: e.pointer.x,
               y: e.pointer.y
            };
            setPolyline(coords);
         }
      });

      this.canvas.on("mouse:dblclick", () => {
         if (this.drawing) {
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.canvas.off("mouse:dblclick");
            this.drawing = false;
            this.props.onAddCustomShape({
               type,
               shape: this.drawingShape
            });
            this.drawingShape = null;
            this.stopDrawShape();
         }
      });

      const setPolyline = (coords) => {
         if (this.drawingShape) {
            this.canvas.remove(this.drawingShape);
         }
         this.drawingShape = new fabric.Polyline(coords, {
            stroke: customShapeStyles.strokeColor,
            fill: type === "polyline" ? "" : customShapeStyles.fillColor,
            strokeWidth: customShapeStyles.strokeWidth,
            selectable: true
         });
         this.canvas.add(this.drawingShape);
         this.setControl(this.drawingShape);
      };
   };

   addCircleShape = () => {
      const { customShapeStyles } = this.props;

      const origin = {};
      this.canvas.on("mouse:down", (e) => {
         if (!this.drawing) {
            this.drawing = true;
            origin.x = e.pointer.x;
            origin.y = e.pointer.y;
            this.drawingShape = new fabric.Circle({
               top: origin.y,
               left: origin.x,
               originX: "center",
               originY: "center",
               radius: 1,
               stroke: customShapeStyles.strokeColor,
               fill: customShapeStyles.fillColor,
               strokeWidth: customShapeStyles.strokeWidth,
               hasControls: false,
               hasRotatingPoint: false,
               selectable: true
            });
            this.canvas.add(this.drawingShape);
            this.startDrawShape();
         } else {
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.drawing = false;
            this.props.onAddCustomShape({
               type: "circle",
               shape: this.drawingShape
            });
            this.drawingShape = null;
            this.stopDrawShape();
         }
      });

      this.canvas.on("mouse:move", (e) => {
         if (this.drawing) {
            const distance = new fabric.Point(origin.x, origin.y).distanceFrom(new fabric.Point(e.pointer.x, e.pointer.y));
            this.drawingShape.set("radius", distance);
            this.canvas.renderAll();
         }
      });
   };

   addTextShape = () => {
      const { customShapeStyles } = this.props;

      this.canvas.on("mouse:down", (e) => {
         this.startDrawShape();
         this.canvas.off("mouse:down");
         this.drawingShape = new fabric.Text(customShapeStyles.text, {
            left: e.pointer.x,
            top: e.pointer.y,
            originX: "center",
            originY: "center",
            fontSize: 20,
            fill: customShapeStyles.fillColor,
            stroke: customShapeStyles.strokeColor,
            strokeWidth: customShapeStyles.strokeWidth,
            selectable: true
         });
         this.canvas.add(this.drawingShape);
         this.props.onAddCustomShape({
            type: "text",
            shape: this.drawingShape
         });
         this.drawingShape = null;
         this.stopDrawShape();
      });
   };

   addImageShape = (data) => {
      fabric.Image.fromURL(
         data,
         (oImg) => {
            oImg.scaleToWidth(100);
            oImg.scaleToHeight(100);
            this.canvas.add(oImg);
            this.canvas.moveTo(oImg, 1);
            this.props.onAddCustomShape({
               type: "image",
               base64: data,
               shape: oImg
            });
         },
         {
            left: 50,
            top: 50,
            selectable: true
         }
      );
   };

   addZebraShape = () => {
      const { customShapeStyles } = this.props;

      this.canvas.on("mouse:down", (e) => {
         if (!this.drawing) {
            this.drawing = true;
            this.drawingShape = new fabric.Line([e.pointer.x, e.pointer.y, e.pointer.x, e.pointer.y], {
               stroke: customShapeStyles.strokeColor,
               strokeWidth: customShapeStyles.strokeWidth,
               strokeDashArray: [4, 5],
               selectable: true
            });
            this.canvas.add(this.drawingShape);
            this.setControl(this.drawingShape);
         } else {
            this.canvas.off("mouse:down");
            this.canvas.off("mouse:move");
            this.drawing = false;
            this.props.onAddCustomShape({
               type: "zebra",
               shape: this.drawingShape
            });
            this.drawingShape = null;
         }
      });

      this.canvas.on("mouse:move", (e) => {
         if (this.drawing) {
            this.drawingShape.set("x1", e.pointer.x);
            this.drawingShape.set("y1", e.pointer.y);
            this.canvas.renderAll();
         }
      });
   };

   addArrowShape = (shapeName) => {
      const url = `./static/img/${shapeName}.png`;

      fabric.Image.fromURL(
         url,
         (oImg) => {
            oImg.scaleToWidth(100);
            oImg.scaleToHeight(100);
            oImg.set("angle", 90);

            const fillColor = this.props.customShapeStyles.fillColor;
            const filter = new fabric.Image.filters.BlendColor({
               color: fillColor,
               mode: "tint",
               alpha: 1
            });
            oImg.filters[16] = filter;
            oImg.applyFilters();

            this.canvas.add(oImg);
            this.canvas.moveTo(oImg, 1);
            this.props.onAddCustomShape({
               type: shapeName,
               base64: url,
               shape: oImg
            });
         },
         {
            left: 150,
            top: 50,
            selectable: true
         }
      );
   };

   setControl = (shape) => {
      this.canvas.moveTo(shape, this.canvas.getObjects().length);

      shape.setControlsVisibility({
         bl: false,
         br: false,
         tl: false,
         tr: false,
         mb: false,
         mt: false,
         ml: false,
         mr: false
      });
      this.canvas.requestRenderAll();
   };

   startDrawShape = () => {
      this.canvas.discardActiveObject();
      this.canvas.getObjects().forEach((x) => {
         x.set("selectable", false);
      });
   };

   stopDrawShape = () => {
      this.canvas.getObjects().forEach((x) => {
         x.set("selectable", true);
      });
   };

   initLineShape = (data) => {
      console.log("initLineShape");
      return new fabric.Line([data.x1, data.y1, data.x2, data.y2], {
         stroke: data.strokeColor,
         strokeWidth: data.strokeWidth,
         angle: data.angle,
         selectable: true
      });
   };

   initPolygonShape = (data) => {
      return new fabric.Polyline(data.points, {
         top: data.top,
         left: data.left,
         stroke: data.strokeColor,
         fill: data.fillColor,
         strokeWidth: data.strokeWidth,
         angle: data.angle,
         selectable: true
      });
   };

   initRectShape = (data) => {
      return new fabric.Rect({
         top: data.top,
         left: data.left,
         width: data.width,
         height: data.height,
         stroke: data.strokeColor,
         fill: data.fillColor,
         strokeWidth: data.strokeWidth,
         angle: data.angle,
         selectable: true
      });
   };

   initCircleShape = (data, isDefault) => {
      return new fabric.Circle({
         top: data.top,
         left: data.left,
         originX: "center",
         originY: "center",
         radius: data.radius,
         stroke: data.strokeColor,
         fill: data.fillColor,
         strokeWidth: data.strokeWidth,
         hasControls: false,
         hasRotatingPoint: false,
         selectable: !isDefault,
         hasBorder: !isDefault
      });
   };

   initTextShape = (data) => {
      return new fabric.Text(data.text, {
         left: data.left,
         top: data.top,
         originX: "center",
         originY: "center",
         fontSize: data.fontSize,
         fill: data.fillColor,
         stroke: data.strokeColor,
         strokeWidth: data.strokeWidth,
         width: data.width,
         height: data.height,
         scaleX: data.scaleX,
         scaleY: data.scaleY,
         angle: data.angle,
         selectable: true
      });
   };

   initImageShape = (data, index) => {
      fabric.Image.fromURL(
         data.base64,
         (oImg) => {
            oImg.scaleToWidth(data.width);
            oImg.scaleToHeight(data.height);
            oImg.set("angle", data.angle);

            if (data.fillColor) {
               const filter = new fabric.Image.filters.BlendColor({
                  color: data.fillColor,
                  mode: "tint",
                  alpha: 1
               });
               oImg.filters[16] = filter;
               oImg.applyFilters();
            }

            this.canvas.add(oImg);
            oImg.moveTo(index);
            this.props.onAsyncShapeAdded(index, oImg);
         },
         {
            left: data.left,
            top: data.top,
            selectable: true
         }
      );
   };

   initZebraShape = (data) => {
      return new fabric.Line([data.x1, data.y1, data.x2, data.y2], {
         top: data.top,
         left: data.left,
         stroke: data.strokeColor,
         strokeWidth: data.strokeWidth,
         strokeDashArray: [4, 5],
         angle: data.angle,
         selectable: true
      });
   };

   setActiveObject = (shape) => {
      // let pai = parseInt(shape.top - 250) / parseInt(shape.left - 250);
      // console.log('pai',pai)
      // let customShapes=
      // [{type:'circle',default:true,data:{top:shape.aCoords.bl.y,left:shape.aCoords.bl.x,strokeColor:'#ffffff',strokeWidth:2,angle:0,fillColor:'#3e3e3c',radius:10,selectable: false}},
      // {type:'line',default:true,data:{x1:345,y1:345,x2:375,y2:375,strokeColor:'#fff',strokeWidth: 2,angle: 0,selectable: false}}]

      // this.drawCustomShapes(customShapes,true)

      this.canvas.setActiveObject(shape);
      this.canvas.requestRenderAll();
   };

   getJSON = () => {
      const data = this.roadCollection.map((x) => {
         return x.getData();
      });
      return data;
   };
}

export default CanalizationRenderer;
