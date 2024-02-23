/*
 * @Description: 信号任务管理
 * @Author:
 * @Date: 2023-12-07 13:41:15
 * @LastEditTime: 2023-12-28 14:13:02
 * @LastEditors:
 */
import { useState } from "react";
import { Tabs } from "antd";
import { Page } from "@/Components";
import useJunctions from "../UseJunctions";
import JunctionList from "./JunctionList";
import Resolution from "./Resolution";
import OptimizingRecord from "./OptimizingRecord";
import OptimizingStatistic from "./OptimizingStatistic";

export default function SignalTask() {
   const junctions = useJunctions();
   const [currentId, setCurrentId] = useState(undefined);

   const items = [
      {
         key: "1",
         label: "当前信号方案",
         destroyInactiveTabPane: true,
         children: (
            <Resolution junctionId={currentId ?? junctions[0]?.id}>
               <JunctionList
                  junctions={junctions}
                  onSelect={(id) => {
                     setCurrentId(id);
                  }}
               />
            </Resolution>
         )
      },
      {
         key: "2",
         label: "信号优化记录",
         children: (
            <OptimizingRecord junctionId={currentId ?? junctions[0]?.id}>
               <JunctionList junctions={junctions} onSelect={(id) => setCurrentId(id)} />
            </OptimizingRecord>
         )
      },
      {
         key: "3",
         label: "信号优化统计",
         children: <OptimizingStatistic></OptimizingStatistic>
      }
   ];

   return (
      <Page>
         {junctions.length > 0 && (
            <Tabs items={items} destroyInactiveTabPane={true} className="h-full" onChange={() => setCurrentId(undefined)}></Tabs>
         )}
      </Page>
   );
}
