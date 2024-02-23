/*
 * @Description: marker infoWindow
 * @Author:
 * @Date: 2023-11-10 17:21:25
 * @LastEditTime: 2023-12-29 17:21:45
 * @LastEditors:
 */
import { useRef, useMemo, useState, forwardRef, useImperativeHandle, useContext, useLayoutEffect } from "react";
import classnames from "classnames";
import { Point } from "maptalks";
import { MapContext } from "./Context";

/**
 * @description: marker infoWindow
 * @param {{top,right,left}} margin infoWindow 展示时与窗口之间的边距，当 infoWindow 超出边距时会自动调整位置
 * @param {number} visibleDuration 显示 infoWindow 时过渡动画所需的时间，单位：秒
 * @returns React 组件 MarkerInfoWindow
 */
export default forwardRef(function MarkerInfoWindow(
   { header, body, footer, width = "132px", className = "", margin, visibleDuration = 0, onVisibleChanged },
   ref
) {
   const mapContext = useContext(MapContext);
   const infoWindow = useRef(null);
   const [visible, setVisible] = useState(false);
   const [key, setKey] = useState(undefined);
   const marker = mapContext.getCurrentMarker();

   const markerContainerPoint = useMemo(() => {
      if (marker) {
         const map = marker.getMap();
         return map.coordToContainerPoint(marker.getCenter(), map.getZoom());
      }

      return {};
   }, [key]);

   console.log("-----markerContainerPoint: ", markerContainerPoint);

   useLayoutEffect(() => {
      if (infoWindow.current) {
         const el = infoWindow.current;
         el.style.top = markerContainerPoint.y - el.offsetHeight - 14 + "px";
         el.style.left = markerContainerPoint.x - el.offsetWidth / 2 + "px";
         el.style.opacity = 1;

         // 计算偏移量，地图撒点和 infoWindow 位置自动平移以避免 infoWindow 被遮挡
         const safeMargin = 10;
         const customMargin = { top: 0, right: 0, left: 0, ...margin };
         const map = marker.getMap();
         const { width } = map.getSize();

         let panY =
            customMargin.top + el.offsetHeight + 14 - markerContainerPoint.y > 0
               ? customMargin.top + el.offsetHeight + 14 - markerContainerPoint.y + safeMargin
               : 0;
         let panX =
            markerContainerPoint.x < customMargin.left + el.offsetWidth / 2
               ? customMargin.left + el.offsetWidth / 2 + safeMargin - markerContainerPoint.x
               : markerContainerPoint.x + el.offsetWidth / 2 > width - customMargin.right
                 ? width - customMargin.right - markerContainerPoint.x - el.offsetWidth / 2 - safeMargin
                 : 0;
         map.panBy(new Point(panX, panY), {
            animation: true,
            duration: visibleDuration * 1000 - 400 > 0 ? visibleDuration * 1000 - 400 : 600 - visibleDuration * 1000 // css 动画与地图动画有时间差
         });
         if (panY > 0) {
            el.style.top = customMargin.top + safeMargin + "px";
         }
         if (panX !== 0) {
            el.style.left =
               markerContainerPoint.x < customMargin.left + el.offsetWidth / 2
                  ? customMargin.left + safeMargin + "px"
                  : width - customMargin.right - el.offsetWidth - safeMargin + "px";
         }
      }

      onVisibleChanged && onVisibleChanged(visible, marker);
   }, [key]);

   useImperativeHandle(
      ref,
      () => ({
         setVisible: (value, infoWindowNative) => {
            // 与原生 infoWindow 是否展示互斥
            if (!value) {
               infoWindowNative && infoWindowNative.show();
            } else {
               infoWindowNative && infoWindowNative.hide();
            }

            setVisible(value);
            setKey(mapContext.getCurrentMarker()?.getId() ?? undefined);
         },
         updatePosition: () => {
            if (infoWindow.current) {
               const marker = mapContext.getCurrentMarker();
               const map = marker.getMap();
               const point = map.coordToContainerPoint(marker.getCenter(), map.getZoom());
               const el = infoWindow.current;
               el.style.top = point.y - el.offsetHeight - 14 + "px";
               el.style.left = point.x - el.offsetWidth / 2 + "px";
            }
         }
      }),
      []
   );

   return visible ? (
      <div
         key={key}
         ref={infoWindow}
         className={classnames(
            "absolute rounded-1 border border-solid border-[#B8C3FF] bg-[#283c64b3] text-font-primary backdrop-blur-[6px]",
            className
         )}
         style={{
            transitionProperty: "opacity",
            transitionTimingFunction: "ease-in",
            transitionDuration: visibleDuration + "s",
            opacity: 0,
            width: width
         }}
      >
         <div className="h-13.5 w-full p-4 text-me">{typeof header === "function" ? header() : header}</div>
         <div className="flex h-fit w-full flex-col justify-between p-4 pt-2">{typeof body === "function" ? body() : body}</div>
         <div className="relative overflow-hidden px-4 pb-4">{typeof footer === "function" ? footer() : footer}</div>
         <div
            className="absolute h-2.5 w-2.5 border border-l-0 border-t-0 border-solid border-[#B8C3FF] bg-[#283c64b3]"
            style={{ left: "calc(50% - 5px)", transform: "rotate(45deg)", bottom: "-6px" }}
         ></div>
      </div>
   ) : null;
});
