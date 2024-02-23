/*
 * @Description: map container
 * @Author:
 * @Date: 2023-11-07 14:47:58
 * @LastEditTime: 2024-01-10 14:36:44
 * @LastEditors:
 */
import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import * as maptalks from "maptalks";
import * as markercluster from "maptalks.markercluster";
import { WMTSTileLayer } from "maptalks.wmts";
import { ImgIcon } from "@/Components";
import { MapContext } from "./Context";
import InfoWindow from "./InfoWindow";

import "maptalks/dist/maptalks.css";
import "./MaptalksContainer.less";

/**
 * @description: map container
 * @param {string} id 地图容器 id
 * @param {Array} center 地图中心点
 * @param {string} baseLayerType 底图类型，可选值：'wmts'、'wms'、'tile'，其中 tile 类型为基础 TileLayer
 * @param {string} baseLayerOptions 底图配置项，详细配置项参考 maptalks.js 文档中对应的 baseLayerType 的 layer 配置项
 * @param {string} poiLayerUrlTemplate 点位图url模板
 */
export default forwardRef(function MaptalksContainer(
   {
      id = "mapContainer",
      center = [116.6244, 40.08546],
      baseLayerType = "wms",
      baseLayerOptions,
      poiLayerUrlTemplate,
      children,
      onCompleted,
      onZoomend,
      onMarkerClick,
      onMarkerMouseover,
      onMarkerMouseout,
      infoWindowOptions = { header: null, body: null, footer: null },
      controlPositionRight = "10px"
   },
   ref
) {
   const animateMap = useRef(new Map());
   const infoWindow = useRef(null);
   const currentMarker = useRef(null);

   let map = null;
   let clusterLayer = null;

   const initMap = async () => {
      const baseLayers = {
         wmts: () => new WMTSTileLayer("base", baseLayerOptions),
         wms: () => new maptalks.WMSTileLayer("base", baseLayerOptions),
         tile: () => new maptalks.TileLayer("base", baseLayerOptions)
      };
      const mapInstance = new maptalks.Map(id, {
         center,
         zoom: 13,
         minZoom: 8,
         maxZoom: 18,
         attribution: false,
         zoomControl: false, // add zoom control
         scaleControl: true, // add scale control
         spatialReference: {
            projection: "EPSG:3857"
         },
         baseLayer: baseLayers[baseLayerType]()
      });

      // 加载信息点
      if (poiLayerUrlTemplate) {
         const poiLayer = new maptalks.VectorLayer("poi", {
            urlTemplate: poiLayerUrlTemplate
         });
         mapInstance.addLayer(poiLayer);
      }

      map = mapInstance;

      // 监听地图旋转
      mapInstance.on("rotate", function (param) {
         let angle = 0;
         if (param.from === 0) {
            angle = 0;
         }
         if (param.from < 0) {
            angle = -param.from;
         } else if (param.from <= 179.9999999999999 && param.from > 0) {
            angle = 360 - param.from;
         }
         // 获取元素 ———— 指北针图标的ID
         let ele = document.getElementById("compass");
         // 设置度数
         ele.style.transform = "rotate(" + angle + "deg)";
      });

      mapInstance.on("zoomend", (e) => {
         updateCurrentMarkerPosition();

         onZoomend && onZoomend(e);
      });

      mapInstance.on("moveend", () => {
         updateCurrentMarkerPosition();
      });

      mapInstance.on("click", () => {
         console.log("----- map click");
         if (currentMarker.current) {
            const preMarker = currentMarker.current;
            currentMarker.current = null;
            infoWindow.current.setVisible(false, preMarker.getInfoWindow());
         }
      });

      onCompleted && onCompleted(mapInstance);
   };
   const flyTo = (option, map, zoom = window.MAPTALKS_LEVEL_DEFAULT || 15) => {
      map.flyTo(
         {
            zoom,
            center: [option.lon, option.lat]
         },
         {
            duration: 500,
            easing: "out"
         },
         function (frame) {
            if (frame.state.playState === "finished") {
               console.log("animation finished");
            }
         }
      );
   };
   const renderClusterLayer = (markers = []) => {
      // 设置 ghost marker 以解决渲染多个 marker 时第一个 marker 无法点击问题。后续探索是否可以解决。
      const ghostMarker = new maptalks.Marker([Number(center[0]), Number(center[1])], {
         id: Math.random().toString(36).slice(2),
         symbol: {
            markerType: "ellipse",
            markerFillOpacity: 0,
            markerLineWidth: 0,
            markerWidth: 0,
            markerHeight: 0,
            markerDx: 0,
            markerDy: 0,
            markerOpacity: 1
         }
      });
      clusterLayer = new markercluster.ClusterLayer("cluster", [ghostMarker].concat(markers), {
         noClusterWithOneMarker: true,
         maxClusterZoom: 12,
         symbol: {
            markerType: "ellipse",
            markerFill: {
               property: "count",
               type: "interval",
               stops: [
                  [0, "rgb(69, 93, 220)"],
                  [9, "rgb(69, 93, 220)"],
                  [99, "rgb(69, 93, 220)"]
               ]
            },
            markerFillOpacity: 0.7,
            markerLineOpacity: 1,
            markerLineWidth: 0,
            markerLineColor: "#fff",
            markerWidth: {
               property: "count",
               type: "interval",
               stops: [
                  [0, 40],
                  [9, 60],
                  [99, 80]
               ]
            },
            markerHeight: {
               property: "count",
               type: "interval",
               stops: [
                  [0, 40],
                  [9, 60],
                  [99, 80]
               ]
            }
         },
         textSymbol: {
            textFill: "#E9F8FF",
            textHaloFill: "#fff",
            textHaloRadius: 4,
            textSize: 18
         },
         drawClusterText: true,
         geometryEvents: true,
         single: true
      });
      map.addLayer(clusterLayer);
   };
   // 渲染撒点
   const renderScatter = (markerUserData = {}, infoWindowOptions = undefined, markerSymbol = null) => {
      if (!clusterLayer) {
         renderClusterLayer();
      }

      let { lon, lat, color = "#6A81FF" } = markerUserData;
      let marker = new maptalks.Marker([Number(lon), Number(lat)], {
         id: Math.random().toString(36).slice(2),
         symbol: markerSymbol ?? getMarkerJumpySymbol(color, markerUserData.isJumpy)
      });
      if (markerUserData.isJumpy) {
         if (animateMap.has(markerUserData)) {
            clearInterval(animateMap.get(markerUserData));
            animateMap.set(markerUserData, null);
         }

         animateMap.set(
            markerUserData,
            setInterval(() => {
               marker.animate(
                  {
                     symbol: getMarkerJumpySymbol(color, markerUserData.isJumpy).map((v) => {
                        v.markerOpacity *= 0.2;
                        return v;
                     })
                  },
                  { duration: 300 }
               );
               setTimeout(() => {
                  marker.animate(
                     {
                        symbol: getMarkerJumpySymbol(color, markerUserData.isJumpy)
                     },
                     { duration: 300 }
                  );
               }, 300);
            }, 800)
         );
      }

      marker.userData = markerUserData;

      marker.on("click", (e) => {
         e.domEvent.stopPropagation(); // 阻止事件冒泡到 map 实例
         currentMarker.current = e.target;

         return onMarkerClick && onMarkerClick(e);
      });

      marker.on("mouseover", (e) => {
         currentMarker.current = e.target;

         onMarkerMouseover && onMarkerMouseover(e);
      });

      marker.on("mouseout", (e) => {
         currentMarker.current = e.target;

         onMarkerMouseout && onMarkerMouseout(e);
      });

      marker.addTo(clusterLayer);

      if (infoWindowOptions) {
         marker.setInfoWindow(infoWindowOptions);
         infoWindowOptions.show && marker.openInfoWindow();
      }
   };
   //更新当前marker位置
   const updateCurrentMarkerPosition = () => {
      if (currentMarker.current) {
         infoWindow.current.updatePosition();
      }
   };
   const getMarkerJumpySymbol = (color, hasJumping) => {
      const normalWidth = 16;
      let markerOptions = [{ opacity: 1 }, { opacity: 0.4 }, { opacity: 0.2 }];
      return markerOptions.map((jmo, ind) => ({
         markerType: "ellipse",
         markerFill: color,
         markerFillOpacity: jmo.opacity,
         markerLineWidth: 0,
         markerWidth: hasJumping ? normalWidth + ind * normalWidth : normalWidth,
         markerHeight: hasJumping ? normalWidth + ind * normalWidth : normalWidth,
         markerDx: 0,
         markerDy: 0,
         markerOpacity: 1
      }));
   };

   useEffect(() => {
      initMap();
      return function destroyed() {
         map && map.remove();
      };
   }, []);

   useImperativeHandle(
      ref,
      () => ({
         getMap: () => map,
         currentMarker: currentMarker.current,
         flyTo,
         renderScatter,
         setMarkerInfoWindowVisible: (value) => {
            infoWindow.current && infoWindow.current.setVisible(value, currentMarker.current?.getInfoWindow());
         },
         /**
          * 设置地图视角 center:[lon,lat]
          * @param {{
          *   center: [number,number],
          *   zoom?: number,
          *   pitch?: number,
          *   bearing?: number}} option
          * 注意：pitch 为地图倾斜角度，默认 0；bearing 为地图方向（航向），默认 0。
          */
         setMapView: ({ center, zoom = 15, pitch = 0, bearing = 0 } = {}) => map.setView({ center, zoom, pitch, bearing })
      }),
      []
   );

   return (
      <MapContext.Provider value={{ getCurrentMarker: () => currentMarker.current }}>
         <div className="relative h-full w-full">
            <div id={id} className="h-full w-full"></div>

            {children}

            <InfoWindow ref={infoWindow} {...infoWindowOptions}></InfoWindow>
            <ImgIcon
               id="compass"
               icon="compass"
               width="60px"
               height="60px"
               className="absolute bottom-16"
               style={{ right: controlPositionRight }}
            />
         </div>
      </MapContext.Provider>
   );
});
