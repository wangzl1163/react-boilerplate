/*
 * @Description: 地图配置
 */

const urls = {
   '50.173.234': 'http://50.173.234.109:35001/webglapi/lib?n=mapabc-gl-api-min&v=3.0.0&ak=ec85d3648154874552835438ac6a02b2',
   '121.36.99': 'http://121.36.99.212:35001/webglapi/lib?n=mapabc-gl-api-min&v=3.0.0&ak=ec85d3648154874552835438ac6a02b2'
};
console.log('----- map sdk url', urls[location.hostname.split('.').slice(0, 3).join('.')]);
document.write(
   `<script type="text/javascript" src="${urls[location.hostname.split('.').slice(0, 3).join('.')] || urls['121.36.99']}" ></script>`
);
