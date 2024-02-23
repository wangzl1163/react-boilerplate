/*
 * @Description: 路口信息统计
 * @Author:
 * @Date: 2023-11-22 10:02:08
 * @LastEditTime: 2023-12-05 09:57:54
 * @LastEditors:
 */
import request from "@/Utils/HttpRequest.js";

export function getJunctionInfoStatistic() {
   return request.get("/v1/stat_cross/overviews").then((res) => {
      return res.data;
   });
}

export function getJunctionInfoMaintainStatistic() {
   return request.get("/v1/stat_cross/maintains").then((res) => {
      return res.data;
   });
}

export function getJunctionInfoUpdateTrendStatistic() {
   return request.get("/v1/stat_cross/trends").then((res) => {
      return res.data;
   });
}
