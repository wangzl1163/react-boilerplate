/*
 * @Description: 交通控制
 * @Author:
 * @Date: 2023-11-20 17:04:40
 * @LastEditTime: 2023-11-20 17:10:10
 * @LastEditors:
 */
import { useContext } from "react";
import { Descriptions } from "antd";
import Context from "./Context";

export default function TrafficCirculation() {
   const { control_info: control } = useContext(Context);
   const items = [
      {
         key: "1",
         label: "控制策略",
         children: control.control_policy
      },
      {
         key: "2",
         label: "相位时序",
         children: control.control_phase_timing
      },
      {
         key: "3",
         label: "控制方式",
         children: control.control_mode
      },
      {
         key: "4",
         label: "信号周期",
         children: control.control_signal_period
      },
      {
         key: "5",
         label: "控制时段",
         children: control.control_period
      },
      {
         key: "6",
         label: "配时方案",
         children: control.control_timing_scheme
      },
      {
         key: "7",
         label: "控制方案",
         children: control.control_plan
      },
      {
         key: "8",
         label: "绿信比",
         children: control.control_green_ratio
      },
      {
         key: "9",
         label: "相位差",
         children: control.control_phase_difference
      },
      {
         key: "10",
         label: "带宽",
         children: control.control_bandwidth
      }
   ];

   return (
      <div className="h-full bg-module-dark px-5 py-4">
         <Descriptions items={items} column={2} />
      </div>
   );
}
