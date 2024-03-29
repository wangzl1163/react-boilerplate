/*
 * @Description:
 * @Author:
 * @Date: 2023-11-23 17:41:49
 * @LastEditTime: 2023-11-27 16:44:15
 * @LastEditors:
 */
import { useLayoutEffect, useState } from "react";
import { ResizeObserver } from "@juggle/resize-observer";

/**
 * 监听 DOM 节点尺寸变化
 * @param target HTMLElement, 必填，否则无法正常监听，建议以 document.body 作为缺省值
 * @returns type Size = { width: number; height: number };
 */
const useSize = (target) => {
   const [size, setSize] = useState({
      width: target?.clientWidth,
      height: target?.clientHeight
   });

   useLayoutEffect(() => {
      if (!target) return;

      const resizeObserver = new ResizeObserver((entries) => {
         entries.forEach((entry) => {
            const { clientWidth, clientHeight } = entry.target || {};
            setSize({
               width: clientWidth,
               height: clientHeight
            });
         });
      });

      resizeObserver.observe(target);
      return () => {
         resizeObserver.disconnect();
      };
   }, [target]);

   return size;
};

export default useSize;
