/*
 * @Description: vite 配置文件
 */
/* eslint-disable no-unused-vars */
import * as path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import compressionPlugin from "vite-plugin-compression";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import removeConsolePlugin from "vite-plugin-remove-console";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import eslintPlugin from "@nabla/vite-plugin-eslint";

/**
 * @description:加载指定模式（mode）下的 .env 文件，读取环境变量
 * mode 通过 cross-env 在 scripts 中设置 mode variable 传入，mode 未传入时取 process.env.NODE_ENV 值
 *
 * Vite 默认是不加载 .env 文件的，因为这些文件需要在执行完 Vite 配置后才能确定加载哪一个
 * 这里使用 Vite 导出的 loadEnv 函数来加载指定的 .env 文件
 * @see:https://cn.vitejs.dev/config/#using-environment-variables-in-config
 */
const env = loadEnv(process.env.mode ?? process.env.NODE_ENV, process.cwd());

export default defineConfig({
   base: env.VITE_BASE ?? "/", // "/" 为 vite 默认值
   plugins: [
      react(),
      // 支持生成 js、css 文件的 gzip 压缩文件
      compressionPlugin({
         ext: ".gz",
         deleteOriginFile: false
      }),
      // 支持 svg 文件作为图标
      createSvgIconsPlugin({
         // 配置svg文件所在的文件路径
         iconDirs: [path.resolve(__dirname, "src/Assets/Icons/Svg")],
         symbolId: "icon-[dir]-[name]"
      }),
      removeConsolePlugin({ includes: JSON.parse(env.VITE_REMOVE_CONSOLE_INCLUDES ?? '["log"]') }), // 支持构建时删除 console 输出
      ViteImageOptimizer(), // 支持压缩 svg 和各种图片
      // 支持在 Vite 中使用 ESlint
      eslintPlugin({
         eslintOptions: {
            fix: true,
            cache: false
         }
      })
   ],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src")
      }
   },
   server: {
      strictPort: true,
      proxy: {
         [env.VITE_BASE_API + "/v1"]: {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true,
            configure: (proxy, options) => {
               // proxy 是 'http-proxy' 的实例
               proxy.on("proxyReq", proxyRequestLog);
            }
         },
         "/appcs": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true
         },
         "^(/mock)?/(authentication)?(system)?(cmap)?/": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true,
            configure: (proxy, options) => {
               proxy.on("proxyReq", proxyRequestLog);
            },
            rewrite(path) {
               return path.replace("mock/", "");
            }
         },
         "/cmap/geoserver": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true
         },
         "/js": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true
         },
         "/css": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true
         },
         "/img": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true
         },
         "/signal-control/oWs": {
            target: env.VITE_PROXY_TARGET_WS,
            ws: true
         },
         "/mock/v1/": {
            target: env.VITE_PROXY_TARGET,
            changeOrigin: true,
            configure: (proxy, options) => {
               // proxy 是 'http-proxy' 的实例
               proxy.on("proxyReq", proxyRequestLog);
            },
            rewrite(path) {
               return path.replace("mock/", "");
            }
         }
      }
   },
   build: {
      reportCompressedSize: false,
      rollupOptions: {
         // 确保外部化处理那些你不想打包进库的依赖
         external: []
      }
   }
});

const proxyRequestLog = (proxyReq, req, res, options) => {
   console.group("request info:");
   console.log("raw url: ", req.url);
   console.log("proxy url: ", proxyReq.path);
   console.log("method: ", req.method);
   console.groupEnd();
};
