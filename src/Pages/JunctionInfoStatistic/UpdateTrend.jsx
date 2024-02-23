/*
 * @Description: 路口信息更新趋势
 * @Author:
 * @Date: 2023-12-05 09:55:14
 * @LastEditTime: 2024-01-09 11:33:57
 * @LastEditors:
 */
import { useEffect, useState } from "react";
import { createLineOption } from "echarts-util";
import { ChartCard } from "@/Components";
import { getJunctionInfoUpdateTrendStatistic } from "@/Apis/Statistic";

export default function LightGroupStatistic() {
   const [option, setOption] = useState({});

   useEffect(() => {
      getJunctionInfoUpdateTrendStatistic().then((res) => {
         setOption(
            createLineOption({
               title: "",
               colors: ["#2D79FE"],
               data: res.map((item) => [item.operator_time, item.junction_num]),
               extraConfig: {
                  config: {
                     grid: { right: 12, left: 12 },
                     tooltip: {
                        show: true,
                        trigger: "axis",
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
                           const [p1] = params;
                           return `<div class="px-2 py-1.5 w-full h-7 rounded-t-1 border-b border-solid border-[#545F78] leading-tight text-extra-sm" style="background-color:#3B4557;">${p1.name}</div><div class="w-full h-fit p-2 flex flex-col justify-between"><div class="w-full"><div class="inline-block w-1.5 h-1.5 rounded-full bg-brand-base mr-1 mb-0.5"></div><span>${p1.seriesName}：</span><span class="text-[#E9F3FF]">${p1.value[1]}</span></div></div>`;
                        }
                     },
                     xAxis: {
                        boundaryGap: true,
                        axisLine: {
                           lineStyle: {
                              color: "#5A5D67"
                           }
                        }
                     },
                     yAxis: {
                        splitLine: {
                           lineStyle: {
                              color: "#5A5D67"
                           }
                        },
                        axisLine: {
                           show: false
                        }
                     }
                  },
                  seriesItemConfig: {
                     name: "更新路口数"
                  }
               }
            })
         );
      });
   }, []);

   return <ChartCard title="路口信息更新趋势（近一个月）" cardBodyStyle={{ height: "350px" }} option={option}></ChartCard>;
}
