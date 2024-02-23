/*
 * @Description: card
 * @Author:
 * @Date: 2023-11-21 17:11:56
 * @LastEditTime: 2023-11-22 16:58:29
 * @LastEditors:
 */
import { Card, Space } from "antd";
import { ImgIcon } from "@/Components";

export default function VCard({ children, title, bordered = false, headStyle, bodyStyle, ...props }) {
   return (
      <Card
         title={
            <Space>
               <ImgIcon icon="card_title" width="10px" height="10px"></ImgIcon>
               <span>{title}</span>
            </Space>
         }
         bordered={bordered}
         headStyle={{ border: "none", ...headStyle }}
         bodyStyle={{ marginInlineStart: 0, marginBlockStart: 0, backgroundColor: "#252E3F", ...bodyStyle }}
         {...props}
      >
         {children}
      </Card>
   );
}
