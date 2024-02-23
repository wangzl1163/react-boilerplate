import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import themeJson from "./Assets/Theme/Theme.json";
import Store from "@/Store";
import App from "./App";

import "dayjs/locale/zh-cn";
import "virtual:svg-icons-register";
import "./Assets/Style/index.css";
import "./Assets/Style/Antd.less";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <Provider store={Store}>
         <HashRouter future={{ v7_startTransition: true }}>
            <ConfigProvider theme={{ ...themeJson, algorithm: theme.darkAlgorithm }} locale={zhCN}>
               <App />
            </ConfigProvider>
         </HashRouter>
      </Provider>
   </React.StrictMode>
);
