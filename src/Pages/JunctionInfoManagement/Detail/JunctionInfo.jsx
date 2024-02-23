/*
 * @Description: 路口信息
 * @Author:
 * @Date: 2023-11-17 14:01:03
 * @LastEditTime: 2023-11-20 17:10:57
 * @LastEditors:
 */
import { Tabs } from "antd";
import BaseTab from "./BaseTab";
import BasicInfo from "./BasicInfo";
import TrafficFacility from "./TrafficFacility";
import TrafficCirculation from "./TrafficCirculation";
import TrafficControl from "./TrafficControl";

export default function JunctionInfo() {
   const items = [
      {
         key: "1",
         label: "基础信息",
         children: <BasicInfo></BasicInfo>
      },
      {
         key: "2",
         label: "交通设施",
         children: <TrafficFacility></TrafficFacility>
      },
      {
         key: "3",
         label: "交通运行",
         children: <TrafficCirculation></TrafficCirculation>
      },
      {
         key: "4",
         label: "交通控制",
         children: <TrafficControl></TrafficControl>
      }
   ];

   return (
      <BaseTab>
         <Tabs items={items} className="h-full" />
      </BaseTab>
   );
}
