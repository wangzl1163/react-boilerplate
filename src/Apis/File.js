/*
 * @Description: 文件相关 api
 * @Author:
 * @Date: 2023-12-12 15:19:23
 * @LastEditTime: 2023-12-21 16:45:21
 * @LastEditors:
 */
import { saveAs } from "file-saver";
import request from "@/Utils/HttpRequest.js";

/**
 * 下载文件
 * @returns 返回文件流并下载
 */
export function fileDownload(filePath, fileName) {
   return request.get("/api/workorder/download", { filePath }, { responseType: "blob", baseURL: "/lasa/management" }).then((res) => {
      return saveAs(new Blob([res]), fileName);
   });
}

export function getImgSrc(path) {
   return import.meta.env.VITE_BASE_API + "/v1/cross/images?path=" + path;
}
