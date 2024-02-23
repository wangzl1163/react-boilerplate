/*
 * @Description: 路口 api
 * @Author:
 * @Date: 2023-10-31 15:10:26
 * @LastEditTime: 2024-02-05 17:30:22
 * @LastEditors: Please set LastEditors
 */
import request from "@/Utils/HttpRequest.js";

export function getJunctions(params) {
   return request.get("/v1/cross/junctions", params).then((res) => {
      return res.data;
   });
}

export function getJunction(junction_id) {
   return request.get("/v1/cross/junction", { junction_id }).then((res) => {
      return res.data;
   });
}

export function getJunctionBaseInfo(junction_id) {
   return request.get("/junctions", { junction_id }).then((res) => {
      return res.data;
   });
}

// 获取指定类型的区域列表
export const fetchAreaList = function (data) {
   return request.post("/api/customArea/araeList", data).then((res) => {
      return res.data;
   });
};

// 获取区域内所有路口路段
export const fetchSectionJunctionList = (params) => {
   return request.get("/api/customArea/araeAttrs", params).then((res) => {
      return res.data;
   });
};

// 车道预览信息查询接口
export const fetchLanes = (params) => {
   return request.get("/lanes", params).then((res) => {
      return res.data;
   });
};

export const getJunctionRecord = (junctionId) => {
   return request.get("/v1/cross/operaor", { id: junctionId }).then((res) => {
      return res.data;
   });
};

export const getSCJunctionCanalization = (data) => {
   const url = "/system/nacos-gateway/java-server/basicData/findJunctionDetailById";
   return request.post(url, data, { baseURL: "/" }).then(
      (res) => {
         return res.data;
      },
      () => null
   );
};
