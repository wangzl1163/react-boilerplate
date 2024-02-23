/*
 * @Description:
 * @Author:
 * @Date: 2023-12-04 16:55:44
 * @LastEditTime: 2023-12-04 17:35:29
 * @LastEditors:
 */
import { useEffect, useState, useMemo } from "react";
import { Flex, Progress } from "antd";
import { VCard } from "@/Components";
import { getJunctionInfoMaintainStatistic } from "@/Apis/Statistic";

export default function MaintainStatistic() {
   const [data, setData] = useState([]);

   const max = useMemo(() => Math.max(...data.map((item) => item.junction_num)), [data]);

   useEffect(() => {
      getJunctionInfoMaintainStatistic().then((res) => {
         setData(res);
      });
   }, []);

   return (
      <VCard
         title="路口信息维护热度统计（TOP4/近一个月）"
         bodyStyle={{ height: "289px" }}
         actions={[
            <Flex key="1" justify="space-between" className="px-4">
               <span>路口</span>
               <span>更新次数</span>
            </Flex>
         ]}
      >
         <div className="h-72.25 overflow-y-auto">
            {data.map((item, i) => (
               <Flex key={i} vertical>
                  <div className="flex justify-between">
                     <span>{item.junction_name}</span>
                     <span>{item.junction_num}</span>
                  </div>
                  <Progress
                     percent={(item.junction_num / max) * 100}
                     showInfo={false}
                     strokeColor="#6A81FF"
                     trailColor="rgba(12, 18, 30, 0.5)"
                     strokeLinecap="square"
                     className="me-0"
                  />
               </Flex>
            ))}
         </div>
      </VCard>
   );
}
