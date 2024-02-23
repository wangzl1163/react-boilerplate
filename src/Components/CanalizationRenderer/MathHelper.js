import Constant from './Constant';

export default class MathHelper {
   /**
    * 求坐标
    *
    * @param { x, y } center 中心点坐标
    * @param { number } r 半径
    * @param { number } deg 角度
    * @returns { x, y }
    */
   static getOutPos(center, r, deg) {
      const x = center.x + r * Math.cos((deg * Math.PI) / 180);
      const y = center.y + r * Math.sin((deg * Math.PI) / 180);
      return { x, y };
   }

   /**
    * 求中心点坐标与外围点坐标线段上的一点
    *
    * @param {x, y} center 中心点坐标
    * @param {x, y} outPos 外围点坐标
    * @param number length 距离中心点坐标的长度
    * @returns {x, y}
    */
   static getPosInLine(center, outPos, length) {
      let flag = false; // 标记负数
      let temp = Math.pow(outPos.x - center.x, 2) - Math.pow(outPos.y - center.y, 2);
      if (temp < 0) {
         temp = Math.abs(temp);
      }
      let k = Math.sqrt(temp);
      if (flag) {
         k = 0 - k;
      }

      const x = center.x + ((outPos.x - center.x) * length) / k;
      const y = center.y + ((outPos.y - center.y) * length) / k;
      return { x, y };
   }

   /**
    * 求平行线坐标
    * @param basePos   近圆心点坐标
    * @param outPos    远圆心点坐标
    * @param flag      step 和 方向标记 <0 顺时针 >0 逆时针
    * @returns {{x: number, y: *}[]}
    */
   static getParallelPos(basePos, outPos, flag) {
      let laneWidth = Constant.defaultValues.laneWidth * flag;

      const alpha = Math.atan((outPos.y - basePos.y) / (outPos.x - basePos.x));
      const x1 = outPos.x - Math.round(laneWidth * Math.sin(alpha));
      const y1 = outPos.y + Math.round(laneWidth * Math.cos(alpha));
      const x2 = basePos.x - Math.round(laneWidth * Math.sin(alpha));
      const y2 = basePos.y + Math.round(laneWidth * Math.cos(alpha));

      return [
         { x: x1, y: y1 },
         { x: x2, y: y2 }
      ];
   }

   /**
    * 通过角度求弧度
    *
    * @param number deg 角度
    * @returns number 弧度
    */
   static deg2Angle(deg) {
      return (deg * Math.PI) / 180;
   }

   /**
    * 通过弧度求角度
    *
    * @param number angle 弧度
    * @returns number 角度
    */
   static angle2Deg(angle) {
      return (angle * 180) / Math.PI;
   }

   /**
    * 求点旋转一定弧度后的位置
    *
    * @param {*} o 原点坐标
    * @param {*} a 要旋转的点的坐标
    * @param {*} angle 要旋转的弧度
    */
   static posRotate(o, a, angle) {
      // console.log(o, a, angle)
      const x = (a.x - o.x) * Math.cos(angle) - (a.y - o.y) * Math.sin(angle) + o.x;
      const y = (a.x - o.x) * Math.sin(angle) + (a.y - o.y) * Math.cos(angle) + o.y;
      return { x, y };
   }
}
