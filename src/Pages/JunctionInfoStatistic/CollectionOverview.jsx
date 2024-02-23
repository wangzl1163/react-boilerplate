import { useContext } from "react";
import { Flex } from "antd";
import { createMultiBarOption } from "echarts-util";
import { ChartCard } from "@/Components";
import { useCommonContext } from "@/Hooks/Context";

export default function CollectionOverviewStatistic() {
   const { Context } = useCommonContext();
   const { cross_collect_stat, cross_num } = useContext(Context);

   const colors = {
      新增路口: "#F6D839",
      更新路口: "#43D1A7"
   };

   const option = createMultiBarOption({
      title: "",
      data: cross_collect_stat
         ? [
              {
                 type: "bar",
                 name: "新增路口",
                 stack: "新增路口",
                 data: [
                    {
                       value: ["新增路口", cross_collect_stat.collect_num],
                       name: "新增路口",
                       itemStyle: { color: colors["新增路口"] }
                    }
                 ]
              },
              {
                 type: "bar",
                 name: "新增路口",
                 stack: "新增路口",
                 data: [
                    {
                       value: ["新增路口", cross_num],
                       name: "路口总数",
                       itemStyle: { color: "#455DDC" }
                    }
                 ]
              },
              {
                 type: "bar",
                 name: "更新路口",
                 stack: "更新路口",
                 data: [
                    {
                       value: ["更新路口", cross_collect_stat.change_num],
                       name: "更新路口",
                       itemStyle: { color: colors["更新路口"] }
                    }
                 ]
              },
              {
                 type: "bar",
                 name: "更新路口",
                 stack: "更新路口",
                 data: [
                    {
                       value: ["更新路口", cross_num],
                       name: "路口总数",
                       itemStyle: { color: "#455DDC" }
                    }
                 ]
              }
           ]
         : [],
      extraConfig: {
         config: {
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
                  const [p1, p2] = params;
                  return `<div class="px-2 py-1.5 w-full h-7 rounded-t-1 border-b border-solid border-[#545F78] leading-tight text-extra-sm" style="background-color:#3B4557;">${
                     p1.seriesName
                  }</div><div class="w-full h-20 p-2 flex flex-col justify-between"><div class="w-full"><div class="inline-block w-1.5 h-1.5 rounded-full bg-brand-base mr-1 mb-0.5"></div><span>${
                     p2.name
                  }：</span><span class="text-[#E9F3FF]">${cross_num}</span></div><div class="w-full"><div class="inline-block w-1.5 h-1.5 rounded-full bg-brand-base mr-1 mb-0.5"></div><span>${
                     p1.name
                  }数：</span><span class="text-[#E9F3FF]">${
                     p1.value[1]
                  }</span></div><div class="w-full"><div class="inline-block w-1.5 h-1.5 rounded-full bg-brand-base mr-1 mb-0.5"></div><span>${
                     p1.name
                  }占比：</span><span class="text-[#E9F3FF]">${((p1.value[1] / cross_num) * 100).toFixed()}%</span></div></div>`;
               },
               axisPointer: {
                  z: 1,
                  type: "line",
                  lineStyle: {
                     color: "rgba(212, 219, 255, 0.1)",
                     width: 46,
                     type: "solid"
                  }
               }
            },
            legend: {
               show: false
            },
            yAxis: {
               axisLine: { show: false },
               splitLine: { show: true, lineStyle: { color: "#5A5D67" } }
            },
            xAxis: {
               axisLine: { lineStyle: { color: "#5A5D67" } }
            },
            textStyle: {
               color: "rgba(233, 248, 255, 0.6)"
            }
         },
         seriesItemConfig: (item) => ({
            stack: item.stack,
            cursor: "default",
            barWidth: 30,
            barCategoryGap: "30%",
            barGap: "-100%"
         })
      }
   });

   return (
      <ChartCard
         title="路口信息采集总览（近一个月）"
         cardBodyStyle={{ height: "289px", width: "100%" }}
         option={option}
         actions={[
            <Flex key="1" justify="space-evenly">
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-brand-base mr-2"></span>
                  <span className="align-middle">路口总数</span>
               </div>
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-[#F6D839] mr-2"></span>
                  <span className="align-middle">新增路口</span>
               </div>
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-[#43D1A7] mr-2"></span>
                  <span className="align-middle">更新路口</span>
               </div>
            </Flex>
         ]}
      ></ChartCard>
   );
}
