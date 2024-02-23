import request from "@/Utils/HttpRequest.js";

export function userInfo() {
   return request.get("/authentication/ctfo-platform-system/system/getUserInfo", null, { baseURL: "/" }).then((res) => {
      return res.data;
   });
}
