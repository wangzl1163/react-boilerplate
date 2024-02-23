/*
 * @Description:
 * @Author:
 * @Date: 2023-11-23 17:41:49
 * @LastEditTime: 2023-11-24 17:31:41
 * @LastEditors:
 */
import kebabCase from "lodash/kebabCase";

/** 生成 style 标签的 id 前缀 */
export const STYLE_PREFIX = "react-echarts-core";

/** style 对象转字符串 */
function getStyleText(className, style) {
   const cssText = Object.keys(style).reduce((accumulator, key) => {
      const cssKey = kebabCase(key);
      const cssValue = String(style[key]).replace("'", "");
      return `${accumulator}${cssKey}:${cssValue};`;
   }, "");

   return `.${className} { ${cssText} }`;
}

function renderStyleItem(style) {
   const className = style?.className || "";
   const id = `${STYLE_PREFIX}-${className}`;

   // 如果已创建过 style 则跳过
   if (window.document && !window.document.getElementById(id)) {
      const styleTag = document.createElement("style");
      styleTag.id = id;
      styleTag.innerText = getStyleText(className, style.styles);
      document.head.append(styleTag);
   }

   return className;
}

/**
 * CSS in Js 方案, 避免在引入 package 之后还要引入 package.css
 * 接受包含 className 及对应 style 的对象 StyleItem
 * 以 className 作为 id 在 <head> 下创建 <style> 标签
 * 函数最终返回 className
 */
export default function renderStyle(styles) {
   const v = Array.isArray(styles) ? styles : [styles];
   return v.map(renderStyleItem).join(" ");
}
