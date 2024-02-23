import { useContext } from "react";
import { Flex } from "antd";
import { createPieOption } from "echarts-util";
import { ChartCard } from "@/Components";
import { useCommonContext } from "@/Hooks/Context";

export default function LightGroupStatistic() {
   const { Context } = useCommonContext();
   const { light_group_stat } = useContext(Context);

   const colors = {
      行人信号灯: "#43D1A7",
      非机动车信号灯: "#F6D839",
      机动车信号灯: "#455DDC"
   };

   const makeOption = (data) =>
      createPieOption({
         title: "",
         radius: ["38%", "58.34%"],
         data: data
            ? [
                 { num: data.vehicle_num, type: "机动车信号灯" },
                 { num: data.no_vehicle_num, type: "非机动车信号灯" },
                 { num: data.pedestrian_num, type: "行人信号灯" }
              ].map((ct) => ({
                 value: ct["num"],
                 name: ct["type"],
                 itemStyle: { color: colors[ct["type"]] },
                 label: {
                    rich: {
                       flag: {
                          width: 8,
                          height: 8,
                          backgroundColor: colors[ct["type"]],
                          borderRadius: 8,
                          align: "left",
                          verticalAlign: "top"
                       }
                    }
                 }
              }))
            : [],
         extraConfig: {
            config: {
               legend: {
                  show: false
               }
            },
            seriesItemConfig: {
               tooltip: { show: false },
               percentPrecision: 0,
               itemStyle: {
                  borderColor: "#252E3F",
                  borderWidth: 5
               },
               cursor: "default",
               label: {
                  show: true,
                  color: "#A6ABBF",
                  alignTo: "edge",
                  edgeDistance: 0,
                  distanceToLabelLine: -114,
                  formatter: "{flag|}{type|{b}}\n{percent|{c}（{d}%）}",
                  rich: {
                     type: {
                        color: "#A6ABBF",
                        fontSize: 12,
                        align: "left",
                        padding: [0, 0, 5, 4]
                     },
                     percent: {
                        color: "#E9F8FF",
                        fontSize: 12,
                        align: "left"
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
                     dy: 1,
                     align: isLeft ? "left" : "right",
                     verticalAlign: "middle"
                  };
               }
            }
         }
      });
   const option = makeOption(light_group_stat);

   const getDecoration = (data) =>
      data ? (
         <>
            <div className="h-39.5 w-39.5 absolute top-0 left-0 right-0 bottom-0 m-auto border border-line-base rounded-full"></div>
            <div className="w-25 h-25 absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-[url('@/Assets/Images/pie_bg.png')] bg-contain"></div>
         </>
      ) : null;

   return (
      <ChartCard
         title="信号灯组统计"
         cardBodyStyle={{ height: "289px", width: "100%" }}
         option={option}
         actions={[
            <Flex key="1" justify="space-evenly">
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-brand-base mr-2"></span>
                  <span className="align-middle">机动车信号灯</span>
               </div>
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-[#F6D839] mr-2"></span>
                  <span className="align-middle">非机动车信号灯</span>
               </div>
               <div>
                  <span className="inline-block w-3 h-1.5 rounded-px bg-[#43D1A7] mr-2"></span>
                  <span className="align-middle">行人信号灯</span>
               </div>
            </Flex>
         ]}
         cardBodyTop={getDecoration(light_group_stat)}
      ></ChartCard>
   );
}
