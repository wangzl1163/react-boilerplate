/*
 * @Description: 交通运行
 * @Author:
 * @Date: 2023-11-20 16:52:37
 * @LastEditTime: 2023-11-20 17:01:48
 * @LastEditors:
 */
import { useContext } from "react";
import { Descriptions } from "antd";
import Context from "./Context";

export default function TrafficCirculation() {
   const { realtime_info: circulation } = useContext(Context);
   const items = [
      {
         key: "1",
         label: "交通流量",
         children: circulation.realtime_traffic_flows
      },
      {
         key: "2",
         label: "排队长度",
         children: circulation.realtime_queue_length
      },
      {
         key: "3",
         label: "停车次数",
         children: circulation.realtime_stop_number
      },
      {
         key: "4",
         label: "交通延误",
         children: circulation.realtime_traffic_delays
      }
   ];

   return (
      <div className="h-full bg-module-dark px-5 py-4">
         <Descriptions items={items} column={1} />
      </div>
   );
}
