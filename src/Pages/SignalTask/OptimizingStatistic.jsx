/*
 * @Description:
 * @Author:
 * @Date: 2023-12-11 15:46:03
 * @LastEditTime: 2023-12-29 16:43:10
 * @LastEditors:
 */
import { useState, useEffect, useMemo } from "react";
import { Flex, Tree, Tag } from "antd";
import { VCard } from "@/Components";
import { getSignalOptimizingStatistic } from "@/Apis/Signal";

import "./OptimizingStatistic.less";

export default function OptimizingStatistic() {
   const [selectedTag, setSelectedTag] = useState("month");
   const [data, setData] = useState({ month: [], week: [], day: [] });
   const [selectedJunctionId, setSelectedJunctionId] = useState(undefined);
   const [selectedKeys, setSelectedKeys] = useState([]);

   const statistic = useMemo(() => {
      const s = data[selectedTag].find((item) => item.junction_id === selectedJunctionId)?.junction_stat ?? {};
      return s;
   }, [selectedJunctionId]);

   const handleTagChange = (tag) => {
      if (tag !== selectedTag) {
         setSelectedTag(tag);
      }
   };

   useEffect(() => {
      Promise.all([getSignalOptimizingStatistic("month"), getSignalOptimizingStatistic("week"), getSignalOptimizingStatistic("day")]).then(
         (res) => {
            console.log("----- res: ", res);
            setData({ month: res[0], week: res[1], day: res[2] });
            setSelectedKeys([res[0][0].junction_id]);
            setSelectedJunctionId(res[0][0].junction_id);
         }
      );
   }, [selectedTag]);

   return (
      <Flex gap={20} className="h-full w-full">
         <div className="h-full w-70 overflow-y-auto rounded-1 bg-module-base p-4">
            <Tag.CheckableTag
               key="month"
               className="inline-flex h-16 w-19.5 flex-col items-center justify-evenly text-extra-sm"
               checked={selectedTag === "month"}
               onChange={() => handleTagChange("month")}
            >
               <span>近一个月</span>
               <span>{data.month.length}</span>
            </Tag.CheckableTag>
            <Tag.CheckableTag
               key="week"
               className="inline-flex h-16 w-19.5 flex-col items-center justify-evenly text-extra-sm"
               checked={selectedTag === "week"}
               onChange={() => handleTagChange("week")}
            >
               <span>近一周</span>
               <span>{data.week.length}</span>
            </Tag.CheckableTag>
            <Tag.CheckableTag
               key="day"
               className="inline-flex h-16 w-19 flex-col items-center justify-evenly text-extra-sm"
               checked={selectedTag === "day"}
               onChange={() => handleTagChange("day")}
            >
               <span>今日</span>
               <span>{data.day.length}</span>
            </Tag.CheckableTag>

            {data[selectedTag].length > 0 && (
               <Tree
                  selectedKeys={selectedKeys}
                  className="mt-2.5 w-full"
                  treeData={data[selectedTag].map((item) => ({
                     key: item.junction_id,
                     title: item.junction_id + (item.junction_name ? "-" + item.junction_name : "")
                  }))}
                  defaultSelectedKeys={[data[selectedTag][0].junction_id]}
                  blockNode
                  onSelect={(sks) => {
                     if (sks[0]) {
                        setSelectedKeys(sks);
                        setSelectedJunctionId(sks[0]);
                     }
                  }}
               ></Tree>
            )}
         </div>

         <VCard title="运行方案" className="h-60 flex-auto" bodyStyle={{ height: "calc(100% - 48px)" }}>
            <Flex gap={16} className="h-full">
               <Flex vertical align="center" justify="center" className="h-full flex-auto bg-module-dark">
                  <div className="text-extra-xl font-bold text-[#E9F3FF]">{statistic.optimize_times}</div>
                  <div>信号优化次数</div>
               </Flex>
               <Flex vertical align="center" justify="center" className="h-full flex-auto bg-module-dark">
                  <div className="text-extra-xl font-bold text-[#E9F3FF]">{statistic.worker_nums}</div>
                  <div>信号优化投入人员</div>
               </Flex>
               <Flex vertical align="center" justify="center" className="h-full flex-auto bg-module-dark">
                  <div className="text-extra-xl font-bold text-[#E9F3FF]">
                     {statistic.worker_time}
                     {statistic.worker_time ? <span className="text-base">小时</span> : null}
                  </div>
                  <div>信号优化投入时间</div>
               </Flex>
            </Flex>
         </VCard>
      </Flex>
   );
}
