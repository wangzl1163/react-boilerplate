/*
 * @Description:
 * @Author:
 * @Date: 2023-11-23 17:41:49
 * @LastEditTime: 2023-11-24 17:31:10
 * @LastEditors:
 */
import debounce from "lodash/debounce";
import * as echarts from "echarts/core";
import { LineChart, BarChart, PieChart } from "echarts/charts";
import { TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

const componentsList = [];
const renderList = [];

function useEcharts(components, renders) {
   const baseComponents = [LineChart, BarChart, PieChart, LegendComponent, TooltipComponent, GridComponent];
   const currentRender = renders?.[0] || CanvasRenderer;
   echarts.use([...baseComponents, ...(Array.isArray(components) ? components : []), currentRender]);
}

const debounceUseEcharts = debounce(useEcharts, 0);

/**
 * Register echarts component, like `echarts.use`
 * - The following components are imported by default:
 * > *LineChart, BarChart, PieChart, LegendComponent, TooltipComponent, GridComponent*
 * @param components (EchartsChart | EchartsComponent | EchartsFeature)[]
 * @param render CanvasRenderer | SVGRenderer
 */
function use(components, render) {
   const main = () => {
      componentsList.push(...(Array.isArray(components) ? components : []));
      render && renderList.push(render);
      debounceUseEcharts(componentsList, renderList);
   };

   return main();
}

export default use;
