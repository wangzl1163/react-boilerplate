/*
 * @Description:
 * @Author:
 * @Date: 2023-10-27 10:47:26
 * @LastEditTime: 2023-12-29 15:47:30
 * @LastEditors:
 */
import { Space, Card } from "antd";
import { TitleComponent } from "echarts/components";
import { LabelLayout } from "echarts/features";
import { initOption } from "echarts-util";
import { ImgIcon, ChartCore } from "@/Components";

initOption({
   config: {
      textStyle: {
         color: "#A6ABBF"
      },
      xAxis: {
         axisLine: {
            show: true
         }
      }
   }
});

export default function ChartCard({
   title,
   titleVisible = true,
   option,
   cardBodyTop,
   cardBodyBottom,
   cardHeaderStyle,
   cardBodyStyle = {},
   chartStyle,
   chartClassName,
   chartTheme,
   chartClear = true,
   empty = "暂无数据",
   bordered = false,
   ...rest
}) {
   const hasData = function () {
      //在option被赋值为非空对象之前不做是否有数据判断
      if (option.series) {
         return option.series.length && option.series.some((item) => item.data.length > 0);
      }

      return true;
   };
   console.log("----- " + title + " chart option: ", option);
   return (
      <Card
         title={
            titleVisible ? (
               <Space>
                  <ImgIcon icon="card_title" width="10px" height="10px"></ImgIcon>
                  <span>{title}</span>
               </Space>
            ) : null
         }
         bordered={bordered}
         headStyle={{ border: "none", ...cardHeaderStyle }}
         bodyStyle={{ ...cardBodyStyle, position: "relative", backgroundColor: "#252E3F" }}
         {...rest}
      >
         {cardBodyTop}

         {hasData() ? (
            <ChartCore
               option={option}
               className={chartClassName}
               style={{ ...chartStyle }}
               theme={chartTheme}
               clear={chartClear}
               echartsComponents={[TitleComponent, LabelLayout]}
            />
         ) : (
            <div className="absolute left-0 right-0 top-0 flex h-1/5 items-end justify-center">{empty}</div>
         )}

         {cardBodyBottom}
      </Card>
   );
}
