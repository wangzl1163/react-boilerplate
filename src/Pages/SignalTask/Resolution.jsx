/*
 * @Description:
 * @Author:
 * @Date: 2024-02-22 17:03:28
 * @LastEditTime: 2024-02-23 10:01:34
 */
/*
 * @Description: 信号方案
 * @Author:
 * @Date: 2023-12-07 17:36:45
 * @LastEditTime: 2023-12-28 15:47:44
 * @LastEditors:
 */
import { useState, useEffect, useRef } from "react";
import { Flex, Space } from "antd";
import { VCard } from "@/Components";
import { getSCJunctionCanalization } from "@/Apis/Junction";
import StagePhaseSvg from "./StagePhaseSvg/index";

import "./Resolution.less";

export default function Resolution({ children, junctionId }) {
   const [wsMonitorData, setWsMonitorData] = useState({});
   const [canalization, setCanalization] = useState({});
   const ws = useRef();
   if (!ws.current || ws.current.readyState !== 1) {
      ws.current = new WebSocket("ws://" + location.host + "/signal-control/oWs/junctions/junctionWorkedMonitor");
      ws.current.onopen = () => {
         ws.current.send(`["${junctionId}"]`);
      };
      ws.current.onmessage = (e) => {
         const data = JSON.parse(e.data);
         console.log("----- 信号方案 data: ", data);
         if (data.data[0]) {
            data.data[0].stage_detail.forEach((x) => {
               if (x.stage_no == data.data[0].real_stage) {
                  data.data[0].stage_run_time_pre = (data.data[0].stage_run_time / x.len) * 100;
                  if (data.data[0].stage_run_time_pre > 100) {
                     data.data[0].stage_run_time_pre = 100;
                  }
               }
            });
            setWsMonitorData(data.data[0]);
         }
      };
   }

   useEffect(() => {
      if (ws.current.readyState === 1) {
         ws.current.send(`["${junctionId}"]`);
      }

      getSCJunctionCanalization({ junction_id: junctionId }).then((res) => {
         if (!res) {
            setWsMonitorData({});
            setCanalization({});
         } else {
            setCanalization(JSON.parse(res.canalization));
         }
      });

      return () => {
         ws.current.close();
      };
   }, [junctionId]);

   return (
      <Flex gap={20} className="h-full w-full">
         {children}

         <VCard title="运行方案" className="flex-auto">
            <div>
               <span className="mr-10 inline-block">路口配置方案{wsMonitorData.currplan || ""}</span>
               <Space size={24} className="text-font-auxiliary">
                  <span>方案号：{wsMonitorData.currplan || "-"}</span>
                  <span>周期：{wsMonitorData.cycle || "-"}</span>
                  <span>相位差：{wsMonitorData.curoff || "-"}</span>
               </Space>
            </div>

            <div className="stagesSvg">
               {wsMonitorData.stage_detail &&
                  !!wsMonitorData.stage_detail.length &&
                  wsMonitorData.stage_detail.map((stage) => {
                     return (
                        <div key={stage.stage_no} className={`stageSvg ${wsMonitorData.real_stage === stage.stage_no ? "active" : ""}`}>
                           <div className="stage-no">阶段{stage.stage_no}</div>
                           <div className="card-body">
                              <StagePhaseSvg
                                 data={stage}
                                 canalization={canalization}
                                 countDown={wsMonitorData.real_stage === stage.stage_no}
                                 stageRunTime={wsMonitorData.stage_run_time}
                              />
                           </div>
                        </div>
                     );
                  })}
            </div>
         </VCard>
      </Flex>
   );
}
