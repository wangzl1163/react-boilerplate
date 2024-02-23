/*
 * @Description: 图表组件
 * @Author:
 * @Date: 2023-11-23 17:41:49
 * @LastEditTime: 2023-12-22 17:36:23
 * @LastEditors:
 */
import { useRef, useLayoutEffect, useEffect, memo } from "react";
import debounce from "lodash/debounce";
import isFunction from "lodash/isFunction";
import * as echarts from "echarts/core";

import renderStyle from "../renderStyle";
import useSize from "./hooks/useSize";
import use from "./use";
import { charCanvas, chartWrapper } from "./style";
import { THEME_NAME } from "./theme";

use();

/**
 * 基础图表组件, 基于 ECharts 封装, 实现了 auto resize
 */
export default memo(function ChartCore({ className, style, option, clear, theme, onChartReady, echartsComponents = [] }) {
   use(echartsComponents);
   // echarts 实例
   const $chart = useRef(null);
   const chartRef = useRef(null);
   const chartWrapperRef = useRef(null);

   const { width, height } = useSize(chartWrapperRef.current ?? document.body);

   // resize，支持防抖
   const resizeHandler = debounce(() => {
      try {
         $chart.current?.resize();
      } catch (e) {
         console.warn(e);
      }
   }, 160);

   // 初始化图表
   const initChart = () => {
      if (!$chart.current) {
         $chart.current = echarts.init(chartRef.current, theme || THEME_NAME);
         $chart.current.setOption(option);
         isFunction(onChartReady) && onChartReady($chart.current);
      }
   };

   // 更新图表数据
   const updateChart = () => {
      if (!$chart.current) return;

      clear && $chart.current.clear();
      $chart.current.setOption(option);
   };

   // 销毁图表
   const dispose = () => {
      try {
         $chart.current?.dispose();
         $chart.current = null;
         console.log("----- chart disposed");
      } catch (e) {
         console.error("Charts Dispose Error: ", e);
      }
   };

   useLayoutEffect(() => {
      resizeHandler();
   }, [width, height]);

   // 组件挂载时初始化图表，组件卸载时销毁图表
   useEffect(() => {
      initChart();
      return dispose;
   }, [theme]);

   // 组件更新时更新图表
   useEffect(() => {
      if ($chart.current && option) {
         updateChart();
      }
   }, [option, className, style]);

   return (
      <div className={`${renderStyle(chartWrapper)} ${className || ""}`} ref={chartWrapperRef} style={style}>
         <div className={renderStyle(charCanvas)} ref={chartRef} />
      </div>
   );
});
