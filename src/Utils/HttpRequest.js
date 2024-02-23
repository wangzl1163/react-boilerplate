import ba from "big-axios";
import { message } from "antd";

let hideError = false;

// 创建实例
const http = ba.create(
   {
      401: {
         msg: "验证失败"
      },
      404: {
         msg: "未找到对应内容"
      },
      500: {
         msg: "服务器发生错误，请稍后再试"
      }
   },
   {
      baseURL: import.meta.env.VITE_BASE_API, // api的base_url
      timeout: 60000 * 3 // 请求超时时间
   },
   {
      successfulCodes: [200, "200", 0, undefined]
   }
);

// 请求拦截器
http.interceptors.request.use(
   (config) => {
      config.headers.Authorization = window.getCnaviAuthToken && window.getCnaviAuthToken();

      // 在 option 中配置 data 对象
      if (config.data && config.data.hideError) {
         hideError = true;
      } else {
         hideError = false;
      }

      return config;
   },
   (err) => {
      if (!hideError) {
         message.destroy();
         message.error(err.message);
      }
      return Promise.reject(err);
   }
);

// 响应拦截器
http.interceptors.response.use(
   (response) => {
      if (!response.data.isError) {
         return Promise.resolve(response);
      } else {
         if (!hideError) {
            message.destroy();
            message.error(response.data.errMsg || response.data.message || response.data.msg);
         }

         const errorData = {
            ...response,
            errorUrl: response.request.responseURL
         };

         return Promise.reject(errorData);
      }
   },
   (err) => {
      if (!hideError && err.message !== "canceled") {
         message.destroy();
         message.error(err.message);
      }

      return Promise.reject(err);
   }
);

export default http;
