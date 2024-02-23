import { Tabs, Descriptions, Image, Flex, Table, Divider } from "antd";
import dictionary from "@/Assets/Constant/Dictionary";
import { getImgSrc } from "@/Apis/File";
import BaseTab from "./BaseTab";

export default function DirectionItem({ road }) {
   console.log("----- road : ", road);
   const bicycleLanes = road.laneData.filter((l) => l.type === "2");
   const items = [
      {
         key: "1",
         label: "基础信息",
         children: (
            <div className="bg-module-dark h-full px-5 py-4 overflow-auto max-h-134.5">
               <Descriptions
                  items={[
                     {
                        key: "1",
                        label: "方向名称",
                        children: road.dirName
                     },
                     {
                        key: "2",
                        label: "道路名称",
                        children: road.roadName
                     },
                     {
                        key: "7",
                        label: "现场照片",
                        span: 2,
                        children: road.images && (
                           <Flex gap={10}>
                              {road.images.map((img, i) => (
                                 <Image key={i} src={getImgSrc(img)} width={140} height={100} />
                              ))}
                           </Flex>
                        )
                     },
                     {
                        key: "8",
                        label: "备注",
                        children: road.remark
                     }
                  ]}
                  column={2}
               />
            </div>
         )
      },
      {
         key: "2",
         label: "进口信息",
         children: (
            <div className="bg-module-dark h-full px-5 py-4 overflow-auto max-h-134.5">
               <Descriptions
                  items={[
                     {
                        key: "1",
                        label: "机动车道",
                        children: road.laneCount
                     },
                     {
                        key: "2",
                        label: "车道宽度",
                        children: road.laneRealWidth + "米"
                     },
                     {
                        key: "3",
                        label: "",
                        span: 2,
                        children: (
                           <Table
                              columns={[
                                 {
                                    title: "车道名称",
                                    align: "center",
                                    key: "laneName",
                                    render: (text, record, index) => {
                                       return "车道" + (index + 1);
                                    }
                                 },
                                 {
                                    title: "车道转向",
                                    align: "center",
                                    key: "laneTurn",
                                    render: (text, record) => {
                                       return record.stream.map((s) => dictionary.laneStream[s].text).join("+");
                                    }
                                 },
                                 {
                                    title: "车道特性",
                                    align: "center",
                                    key: "laneFeature",
                                    render: (text, record) => {
                                       return record.laneFeature.map((lf) => dictionary.laneFeature[lf].text).join("、");
                                    }
                                 }
                              ]}
                              dataSource={road.laneData.filter((l) => l.type === "1")}
                              bordered={true}
                              pagination={false}
                           ></Table>
                        )
                     }
                  ]}
                  column={2}
               />
               <Divider className="mt-1 mb-5" />
               <Descriptions
                  items={[
                     {
                        key: "1",
                        label: "是否有非机动车道",
                        children: bicycleLanes.length ? "有" : "无"
                     },
                     {
                        key: "2",
                        label: "车道转向",
                        children: bicycleLanes.map((bl) => bl.stream.map((s) => dictionary.laneStream[s].text).join(",")).join(",")
                     }
                  ]}
                  column={1}
               />
               <Divider className="mt-1 mb-5" />
               <Descriptions items={[{ key: "1", label: "机非隔离类型", children: road.isolationType }]} column={1} />
            </div>
         )
      },
      {
         key: "3",
         label: "出口信息",
         children: (
            <div className="bg-module-dark h-full px-5 py-4 overflow-auto max-h-134.5">
               <Descriptions
                  items={[
                     {
                        key: "1",
                        label: "机动车道",
                        children: road.reverseLaneCount
                     },
                     {
                        key: "2",
                        label: "车道宽度",
                        children: road.laneRealWidth + "米"
                     }
                  ]}
                  column={2}
               />
               <Divider className="mt-1 mb-5" />
               <Descriptions items={[{ key: "1", label: "机非隔离类型", children: road.reverseIsolationType }]} column={1} />
            </div>
         )
      },
      {
         key: "4",
         label: "人行横道",
         children: (
            <div className="bg-module-dark h-full px-5 py-4 overflow-auto max-h-134.5">
               <Descriptions
                  items={[
                     {
                        key: "1",
                        label: "是否有人行道",
                        children: road.zebra.show ? "有" : "无"
                     },
                     {
                        key: "2",
                        label: "是否有二次过街",
                        children: road.secondZebra.show ? "有" : "无"
                     },
                     {
                        key: "3",
                        label: "长度",
                        children: (road.zebraLength ?? "") + "米"
                     }
                  ]}
                  column={3}
               />
            </div>
         )
      }
   ];

   return (
      <BaseTab>
         <Tabs items={items} className="h-full"></Tabs>
      </BaseTab>
   );
}
