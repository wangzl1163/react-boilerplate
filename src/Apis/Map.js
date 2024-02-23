/*
 * @Description: map api
 * @Author:
 * @Date: 2023-11-07 14:44:58
 * @LastEditTime: 2023-12-28 11:23:26
 * @LastEditors:
 */
import request from "@/Utils/HttpRequest.js";

// 获取地图服务
export function getMapService(params = {}) {
   return request.get("/system/api/api/junction/map/list", params, { baseURL: "/" }).then((res) => {
      return res.data?.[0];
   });
}

// 地图视角查询 (直接走三位地图的服务获取视角)
export function getMapViewAngle() {
   return request.get("/cmap/api/ctfo-cmap-user/v1/viewAngle/infoByAppCode", { appCode: "lasa-ledger" }, { baseURL: "/" }).then((res) => {
      const list = res.data || [];
      const target = list.find((v) => v.code === "1") || {};

      return target;
   });
}
