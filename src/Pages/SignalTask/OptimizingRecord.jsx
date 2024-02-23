import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex } from "antd";
import { VTable } from "@/Components";
import { getSignalOptimizingRecords } from "@/Apis/Signal";
import { fileDownload } from "@/Apis/File";

export default function Optimization({ children, junctionId }) {
   const [optimizingRecords, setOptimizingRecords] = useState([]);

   const columns = [
      {
         title: "工单标题",
         align: "center",
         dataIndex: "title"
      },
      {
         title: "执行人",
         align: "center",
         dataIndex: "executor"
      },
      {
         title: "修改时间",
         align: "center",
         dataIndex: "updateTime"
      },
      {
         title: "执行备注",
         align: "center",
         dataIndex: ["workInfo", "remark"]
      },
      {
         title: "文件",
         align: "center",
         render: (text, record) => {
            return record.workInfo.files.map((file, i) => {
               return (
                  <Link className="mr-2" key={i} onClick={() => fileDownload(file.filePath, file.fileName)}>
                     {file.fileName}
                  </Link>
               );
            });
         }
      }
   ];

   useEffect(() => {
      getSignalOptimizingRecords(junctionId).then((res) => {
         setOptimizingRecords(res);
      });
   }, [junctionId]);

   return (
      <Flex gap={20} className="h-full w-full">
         {children}

         <div className="flex-auto">
            <div className="mb-5">任务列表</div>
            <VTable dataSource={optimizingRecords} columns={columns} rowKey="orderId" pagination={false}></VTable>
         </div>
      </Flex>
   );
}
