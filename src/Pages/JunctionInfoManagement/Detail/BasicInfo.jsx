/*
 * @Description: 基础信息
 * @Author:
 * @Date: 2023-11-17 14:11:11
 * @LastEditTime: 2023-12-21 16:46:18
 * @LastEditors:
 */
import { useContext } from "react";
import { Descriptions, Image, Flex } from "antd";
import { getImgSrc } from "@/Apis/File";
import Context from "./Context";

export default function BasicInfo() {
   const detail = useContext(Context);
   const items = [
      {
         key: "1",
         label: "路口名称",
         children: detail.name
      },
      {
         key: "2",
         label: "路口编号",
         children: detail.id
      },
      {
         key: "3",
         label: "路口类型",
         children: detail.junction_type_id
      },
      {
         key: "4",
         label: "道路等级",
         children: detail.junction_level
      },
      {
         key: "5",
         label: "所属管界队",
         children: detail.belong_team
      },
      {
         key: "6",
         label: "交通吸引点",
         span: 3,
         children: detail.attraction_point
      },
      {
         key: "7",
         label: "现场照片",
         span: 4,
         children: detail.images && (
            <Flex gap={10}>
               {detail.images.map((img, i) => (
                  <Image key={i} src={getImgSrc(img)} width={140} height={100} />
               ))}
            </Flex>
         )
      },
      {
         key: "8",
         label: "备注",
         children: detail.remark
      }
   ];

   return (
      <div className="h-full max-h-134.5 overflow-auto bg-module-dark px-5 py-4">
         <Descriptions items={items} column={4} />
      </div>
   );
}
