/*
 * @Description: junction item
 * @Author:
 * @Date: 2023-11-14 13:40:51
 * @LastEditTime: 2024-01-09 17:55:44
 * @LastEditors:
 */
import { Divider, Flex, Descriptions } from "antd";
import { RightOutlined } from "@ant-design/icons";
import classnames from "classnames";

export default function JunctionItem({ junction, className, onShowRecord, onEdit, onClick }) {
   const items = [
      {
         label: "路口类型",
         children: junction.junction_type_id
      },
      {
         label: "更新时间",
         children: junction.modify_date ? junction.modify_date : junction.create_date
      },
      {
         label: "行政区划",
         children: junction.administrative_area_name
      }
   ];

   return (
      <div
         tabIndex={-1}
         className={classnames(
            "h-42 w-full rounded-1 bg-[#283c64b3] px-4 py-3 text-font-primary hover:cursor-pointer hover:bg-brand-base focus:bg-brand-base active:bg-brand-base",
            className
         )}
         style={{ backdropFilter: "blur(6px)" }}
         onClick={() => onClick(junction)}
      >
         <Flex className="w-full" justify="space-between">
            <span className="font-medium">
               {junction.id}-{junction.name}
            </span>
            <span
               className="text-extra-sm"
               onClick={(e) => {
                  e.stopPropagation();
                  onShowRecord(junction);
               }}
            >
               查看记录
            </span>
         </Flex>
         <Divider style={{ margin: "12px 0" }} />
         <Descriptions title="" size="small" column={2} items={items} className="" />
         <Divider style={{ margin: "6px 0 12px" }} />
         <Flex
            className="w-full"
            justify="space-between"
            onClick={(e) => {
               e.stopPropagation();
               onEdit(junction.id);
            }}
         >
            <span className="font-medium">编辑</span>
            <span className="text-extra-sm">
               <RightOutlined />
            </span>
         </Flex>
      </div>
   );
}
