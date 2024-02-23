import { useContext } from "react";
import { Descriptions, Divider, Collapse, Table } from "antd";
import { YesOrNoStatus } from "@/Enums/YesOrNo";
import { SignalLight } from "@/Enums/TrafficFacility";
import Context from "./Context";

import "./Collapse.less";

export default function TrafficFacility() {
   const { facilities_info: facilities } = useContext(Context);
   const items = [
      {
         key: "0",
         label: "中央隔离带隔离类型",
         span: 4,
         children: facilities.median_strip
      },
      {
         key: "1",
         label: "信号机品牌",
         children: facilities.signal_info.signal_brand
      },
      {
         key: "2",
         label: "信号机联网类型",
         children: facilities.signal_info.signal_network
      },
      {
         key: "3",
         label: "信号机取电类型",
         children: facilities.signal_info.signal_power
      },
      {
         key: "4",
         label: "信号机位置",
         children: facilities.signal_info.signal_addr
      },
      {
         key: "5",
         label: "是否有机动车信号灯灯杆",
         children: YesOrNoStatus.status[facilities.signal_pole_info.signal_pole_vehicle]
      },
      {
         key: "6",
         label: "是否有非机动车/行人灯杆",
         children: YesOrNoStatus.status[facilities.signal_pole_info.signal_pole_pedestrian]
      },
      {
         key: "7",
         label: "是否有一体化信号灯灯杆",
         span: 2,
         children: YesOrNoStatus.status[facilities.signal_pole_info.signal_pole_integration]
      },
      {
         key: "8",
         label: "电子警察数量",
         children: facilities.elec_police_num
      },
      {
         key: "9",
         label: "是否有诱导屏",
         children: YesOrNoStatus.status[facilities.induce_screen]
      },
      {
         key: "10",
         label: "是否有待转屏",
         span: 2,
         children: YesOrNoStatus.status[facilities.rotated_screen]
      },
      {
         key: "11",
         label: "联网通讯情况",
         children: facilities.network_comm
      }
   ];
   const items2 = [
      {
         key: "1",
         label: "信号灯类型",
         children: facilities.signal_pole_info.signal_pole_class?.map((item) => SignalLight.light[item]).join("，")
      }
   ];

   return (
      <div className="bg-module-dark h-full px-5 py-4 overflow-auto max-h-134.5">
         <Descriptions items={items} column={4} />
         <Divider className="mt-1 mb-5" />
         <Descriptions items={items2} column={1} />
         <Collapse defaultActiveKey={["0"]} expandIconPosition="end" collapsible="icon" bordered={false} ghost={true}>
            <Collapse.Panel
               header={
                  <>
                     信号灯组配线<span className="text-font-primary">（{facilities.phase_info.length}）</span>
                  </>
               }
               key="0"
            >
               <Table
                  columns={[
                     {
                        title: "相位编号",
                        align: "center",
                        dataIndex: "phaseId"
                     },
                     {
                        title: "方向",
                        align: "center",
                        dataIndex: "direction"
                     },
                     {
                        title: "车道类型",
                        align: "center",
                        dataIndex: "laneType"
                     },
                     {
                        title: "相位名称",
                        align: "center",
                        dataIndex: "phase"
                     }
                  ]}
                  dataSource={facilities.phase_info}
                  bordered={true}
                  pagination={false}
               ></Table>
            </Collapse.Panel>
            <Collapse.Panel
               header={
                  <>
                     检测器<span className="text-font-primary">（{facilities.detector_info.length}）</span>
                  </>
               }
               key="1"
            >
               <Table
                  columns={[
                     {
                        title: "检测器ID",
                        align: "center",
                        dataIndex: "detectorNumber"
                     },
                     {
                        title: "检测器类型",
                        align: "center",
                        dataIndex: "detectorType"
                     }
                  ]}
                  dataSource={facilities.detector_info}
                  bordered={true}
                  pagination={false}
               ></Table>
            </Collapse.Panel>
         </Collapse>
      </div>
   );
}
