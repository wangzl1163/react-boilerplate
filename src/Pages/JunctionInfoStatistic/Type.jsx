/*
 * @Description: 路口类型统计
 * @Author:
 * @Date: 2023-11-22 15:07:18
 * @LastEditTime: 2024-01-09 09:44:14
 * @LastEditors:
 */
import { useContext } from "react";
import { Flex } from "antd";
import { createPieOption } from "echarts-util";
import { ChartCard } from "@/Components";
import { useCommonContext } from "@/Hooks/Context";

import "./Type.less";

export default function TypeStatistic() {
   const { Context } = useCommonContext();
   const { cross_type_stat } = useContext(Context);

   const colors = {
      十字: "#455DDC",
      T型: "#E37317",
      Y型: "#2AA471",
      十字有待转区: "#0F47AF",
      环岛: "#F6D839",
      入口: "#926FAF",
      出口: "#D1BBD9",
      T型有待转区: "#BE5A00",
      Y型有待转区: "#198858",
      无信号控制: "#556179",
      车道控制: "#EB6DA5",
      行人过街: "#E4017F"
   };
   const option = createPieOption({
      title: "",
      radius: ["0", "72.88%"],
      colors: Object.values(colors),
      data: cross_type_stat.map((ct) => ({
         value: ct.junction_num,
         name: ct.junction_type,
         itemStyle: { color: colors[ct.junction_type] },
         label: {
            rich: {
               flag: {
                  width: 8,
                  height: 8,
                  backgroundColor: colors[ct.junction_type],
                  borderRadius: 8,
                  align: "left",
                  verticalAlign: "top"
               }
            }
         }
      })),
      extraConfig: {
         config: {
            legend: {
               show: false
            }
         },
         seriesItemConfig: {
            tooltip: {
               show: true,
               backgroundColor: "#313C48",
               borderColor: "#545F78",
               borderWidth: 1,
               padding: 0,
               className: "w-35",
               textStyle: {
                  color: "#E9F3FF",
                  fontSize: 12
               },
               formatter: (params) => {
                  const p1 = params;
                  return `<div class="px-2 py-1.5 w-full h-7 rounded-t-1 border-b border-solid border-[#545F78] leading-tight text-extra-sm" style="background-color:#3B4557;">${p1.marker}${p1.name}</div><div class="w-full h-fit p-2 flex flex-col justify-between"><div class="w-full"><span>数量：</span><span class="text-[#E9F3FF]">${p1.value}</span></div><div class="w-full"><span>占比：</span><span class="text-[#E9F3FF]">${p1.percent}%</span></div></div>`;
               }
            },
            percentPrecision: 0,
            itemStyle: {
               borderColor: "#252E3F",
               borderWidth: 4
            },
            cursor: "default",
            label: {
               show: true,
               color: "#A6ABBF",
               alignTo: "edge",
               edgeDistance: 0,
               distanceToLabelLine: -99,
               minMargin: 4,
               formatter: "{flag|}{type|{b}}",
               rich: {
                  type: {
                     color: "#A6ABBF",
                     fontSize: 12,
                     align: "left",
                     padding: [0, 0, 0, 4]
                  }
               }
            },
            labelLine: {
               lineStyle: {
                  color: "#545F78"
               }
            },
            labelLayout: function (params) {
               const isLeft = params.labelRect.x < 403 / 2;
               return {
                  dy: -1,
                  align: isLeft ? "left" : "right",
                  verticalAlign: "bottom"
               };
            }
         }
      }
   });

   const hasData = cross_type_stat.length > 0;

   return (
      <ChartCard
         title="路口类型统计"
         className="type-statistic-card"
         cardBodyStyle={{ height: "289px", width: "100%" }}
         option={option}
         actions={[
            <Flex key="1" justify="flex-start" wrap="wrap" className="gap-x-2.5 px-4">
               {cross_type_stat.map((item, index) => {
                  return (
                     <div key={index} className="basis-23 text-left leading-4.5">
                        <span
                           className="mr-2 inline-block h-1.5 w-3 rounded-px"
                           style={{ backgroundColor: colors[item.junction_type] }}
                        ></span>
                        <span className="align-middle text-extra-sm">{item.junction_type}</span>
                     </div>
                  );
               })}
            </Flex>
         ]}
         cardBodyTop={
            hasData ? (
               <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-48.5 w-48.5 rounded-full border border-line-base"></div>
            ) : null
         }
      ></ChartCard>
   );
}
