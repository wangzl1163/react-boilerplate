// MapABC GL map  layer

/**
 * 加载 MapABC（北京图盟） GL 地图的图层示例：
 * 在应用入口页 index.html 中引入一个 js 文件，以加载 MapABC GL 地图的 API 库，如 map-config.js，其内容类似为：
 * const urls = {
   '50.173.234': 'http://50.173.234.109:35001/webglapi/lib?n=mapabc-gl-api-min&v=3.0.0&ak=ec85d3648154874552835438ac6a02b2',
   '121.36.99': 'http://121.36.99.212:35001/webglapi/lib?n=mapabc-gl-api-min&v=3.0.0&ak=ec85d3648154874552835438ac6a02b2'
};
console.log('----- map sdk url', urls[location.hostname.split('.').slice(0, 3).join('.')]);
document.write(
   `<script type="text/javascript" src="${urls[location.hostname.split('.').slice(0, 3).join('.')] || urls['121.36.99']}" ></script>`
);
 * 在需要加载地图的页面中导入 MapABCLayer 类并在地图初始化完成后创建该图层添加到地图中就可以调用该图层的相关方法。
 * 比如，调用其 trafficLayer 方法开启路况图层，如：
 * import { MapABCLayer } from './MapABCLayer'
 * 
 * const loadTrafficLayer = () => {
   $trafficLayer.value = new MapABCLayer('trafficLayer', {})
   $map.value.addLayer($trafficLayer.value)

   window.setTimeout(() => {
      const glMap = $trafficLayer.value.getGlMap()
      glMap.trafficLayer(true, {
         //minzoom: 1, //路况显示的最小级别(1-24)
         //maxzoom: 24, //路况显示的最大级别(1-24)
         type: 'vector', //路况图层类型:vector(矢量),raster(栅格)
         refresh: 30 * 1000 //路况图层刷新时间，毫秒
         // before:'roads-symbol-49'
      })
   }, 3000)
}
 * 调用 loadTrafficLayer 方法开启路况图层，在加载完成后，路况图层将在地图中显示。如：
 * const handleViewerCompleted = (map) => {
   $map.value = map
   console.log('视图加载完毕', $map.value)
   handleQuery()

   loadTrafficLayer()
}
 */

import * as maptalks from 'maptalks';

const options = {
   renderer: 'dom',
   container: 'back',
   glOptions: {
      style: 'mapabc://style/mapabc80'
   }
};

export class MapABCLayer extends maptalks.Layer {
   constructor(id, options) {
      super(id, options);
   }
   static fromJSON(json) {
      if (!json || json['type'] !== 'MapABCLayer') {
         return null;
      }

      const layer = new MapABCLayer(json['id'], json['options']);
      return layer;
   }

   getGlMap() {
      const renderer = this._getRenderer();
      if (renderer) {
         return renderer.glMap;
      }
      return null;
   }

   toJSON() {
      var json = {
         type: this.getJSONType(),
         id: this.getId(),
         options: this.config()
      };
      return json;
   }
}

//定义默认的图层配置属性
MapABCLayer.mergeOptions(options);

MapABCLayer.registerJSONType('MapABCLayer');

MapABCLayer.registerRenderer(
   'dom',
   class {
      constructor(layer) {
         this.layer = layer;
         this._container = null;
         this.glMap = null;
      }

      getMap() {
         if (!this.layer) {
            return null;
         }
         return this.layer.getMap();
      }

      show() {
         if (this._container) {
            this.render();
            this._show();
         }
      }

      hide() {
         if (this._container) {
            this._hide();
            this.clear();
         }
      }

      remove() {
         delete this.layer;
         if (this.glMap) {
            this.glMap.remove();
            this.glMap = null;
         }

         if (this._container) {
            maptalks.DomUtil.removeDomNode(this._container);
            this._container = null;
         }
      }

      clear() {
         if (this._container) {
            this._container.innerHTML = '';
         }
      }

      setZIndex(z) {
         this._zIndex = z;
         if (this._container) {
            this._container.style.zIndex = z;
         }
      }

      needToRedraw() {
         const map = this.getMap();
         const renderer = map._getRenderer();
         return map.isInteracting() || (renderer && renderer.isViewChanged());
      }

      render() {
         if (!this._container) {
            this._createLayerContainer();
         }

         if (!this.glMap) {
            const map = this.getMap();
            const center = map.getCenter();
            const options = maptalks.Util.extend({}, this.layer.options['glOptions'], {
               container: this._container,
               center: new window.mapabcgl.LngLat(center.x, center.y),
               zoom: getMapZoom(map.getResolution())
            });
            this.glMap = new window.mapabcgl.Map(options);
            this.glMap.on('load', () => {
               this.layer.fire('layerload');
            });
         }
         this._syncMap();
      }

      drawOnInteracting() {
         const map = this.getMap();
         if (!this.glMap || !map) {
            return;
         }
         this._syncMap();
      }

      getEvents() {
         return {
            resize: this.onResize
         };
      }

      onResize() {
         this._resize();
      }

      _createLayerContainer() {
         const container = (this._container = maptalks.DomUtil.createEl('div', 'maptalks-mapabc-layer'));
         container.style.cssText = 'position:absolute;';
         this._resize();

         if (this._zIndex) {
            container.style.zIndex = this._zIndex;
         }

         const parent =
            this.layer.options['container'] === 'front' ? this.getMap()._panels['frontStatic'] : this.getMap()._panels['backStatic'];
         parent.appendChild(container);
      }

      _resize() {
         const container = this._container;
         if (!container) {
            return;
         }

         const size = this.getMap().getSize();
         container.style.width = size['width'] + 'px';
         container.style.height = size['height'] + 'px';

         if (this.glMap) {
            this.glMap.resize();
         }
      }

      _show() {
         this._container.style.display = '';
      }

      _hide() {
         this._container.style.display = 'none';
      }

      _syncMap() {
         const map = this.getMap();
         if (!this.glMap || !map) {
            return;
         }
         const center = map.getCenter();
         const cameraOptions = {
            center: new window.mapabcgl.LngLat(center.x, center.y),
            zoom: getMapZoom(map.getResolution()),
            bearing: map.getBearing(),
            pitch: map.getPitch()
         };
         this.glMap.jumpTo(cameraOptions);
      }
   }
);

const MAX_RES = (2 * 6378137 * Math.PI) / (256 * Math.pow(2, 20));
function getMapZoom(res) {
   return 19 - Math.log(res / MAX_RES) / Math.LN2;
}
