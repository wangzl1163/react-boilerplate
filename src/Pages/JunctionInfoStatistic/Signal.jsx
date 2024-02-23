import { useContext } from "react";
import { Flex, Card, Space } from "antd";
import { createPieOption } from "echarts-util";
import { ChartCard, ImgIcon } from "@/Components";
import { useCommonContext } from "@/Hooks/Context";

export default function SignalStatistic() {
   const { Context } = useCommonContext();
   const {
      signal_stat: { brand_stat, network_stat, power_stat }
   } = useContext(Context);

   const colors = {
      千方: "#0074FF",
      海康: "#FD5502",
      海信: "#01A396",
      莱斯: "#9646ED",
      大华: "#B81A36",
      晨玉: "#926FAF",
      攸亮: "#13DBF2",
      东土: "#FFE693",
      其他: "#749AFF",
      UDP: "#749AFF",
      TCP: "#455DDC",
      未知: "#EB6DA5",
      主电: "#43D1A7",
      备电: "#198858"
   };

   const makeOption = (data, prefix, seriesItemConfig) =>
      createPieOption({
         title: "",
         radius: ["0%", "54%"],
         data: data.map((ct) => ({
            value: ct[prefix + "_num"],
            name: ct[prefix + "_type"],
            itemStyle: { color: colors[ct[prefix + "_type"]] },
            label: {
               rich: {
                  flag: {
                     width: 8,
                     height: 8,
                     backgroundColor: colors[ct[prefix + "_type"]],
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
               tooltip: { show: false },
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
                  distanceToLabelLine: -96,
                  formatter: "{flag|}{type|{b}}\n{percent|{c}（{d}%）}",
                  rich: {
                     type: {
                        color: "#A6ABBF",
                        align: "left",
                        fontSize: 12,
                        padding: [0, 0, 4, 4]
                     },
                     percent: {
                        fontSize: 12,
                        color: "#E9F8FF",
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
                  const isLeft = params.labelRect.x < 273 / 2;
                  return {
                     dy: 1,
                     align: isLeft ? "left" : "right",
                     verticalAlign: "middle"
                  };
               },
               ...seriesItemConfig
            }
         }
      });
   const brandOption = makeOption(brand_stat, "brand", {
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
      label: {
         show: true,
         color: "#A6ABBF",
         alignTo: "edge",
         edgeDistance: 0,
         distanceToLabelLine: -74,
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
      labelLayout: function (params) {
         const isLeft = params.labelRect.x < 403 / 2;
         return {
            dy: -1,
            align: isLeft ? "left" : "right",
            verticalAlign: "bottom"
         };
      }
   });
   const networkOption = makeOption(network_stat, "network");
   const powerOption = makeOption(power_stat, "power");

   const getDecoration = (data) =>
      data.length > 0 ? (
         <>
            <div className="h-38.5 w-38.5 absolute top-0 left-0 right-0 bottom-0 m-auto border border-line-base rounded-full"></div>
         </>
      ) : null;

   return (
      <Card
         title={
            <Space>
               <ImgIcon icon="card_title" width="10px" height="10px"></ImgIcon>
               <span>信号机统计</span>
            </Space>
         }
         bordered={false}
         headStyle={{ border: "none" }}
         bodyStyle={{ position: "relative", backgroundColor: "#252E3F", height: "350px", width: "100%" }}
      >
         <Flex className="h-72.25 w-full" gap={20}>
            <ChartCard
               titleVisible={false}
               option={brandOption}
               className="w-1/3 !shadow-none"
               cardBodyStyle={{ width: "100%", height: "100%", padding: 0 }}
               cardBodyTop={getDecoration(brand_stat)}
            ></ChartCard>
            <ChartCard
               titleVisible={false}
               option={networkOption}
               className="w-1/3 !shadow-none"
               cardBodyStyle={{ width: "100%", height: "100%", padding: 0 }}
               cardBodyTop={getDecoration(network_stat)}
            ></ChartCard>
            <ChartCard
               titleVisible={false}
               option={powerOption}
               className="w-1/3 !shadow-none"
               cardBodyStyle={{ width: "100%", height: "100%", padding: 0 }}
               cardBodyTop={getDecoration(power_stat)}
            ></ChartCard>
         </Flex>
         <Flex className="text-me font-medium" gap={20}>
            <div className="w-1/3 text-center">信号机品牌</div>
            <div className="w-1/3 text-center">信号机联网类型</div>
            <div className="w-1/3 text-center">信号机取电类型</div>
         </Flex>
      </Card>
   );
}
