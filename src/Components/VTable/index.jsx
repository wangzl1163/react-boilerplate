/*
 * @Description: 自动生成 key 的表格
 * @Author:
 * @Date: 2023-11-30 15:18:10
 * @LastEditTime: 2023-12-11 11:20:48
 * @LastEditors:
 */
import { Table } from "antd";

export default function VTable({ rowKey = "id", ...props }) {
   return <Table rowKey={(record) => record[rowKey]} {...props} />;
}
