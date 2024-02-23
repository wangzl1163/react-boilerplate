/*
 * @Description: 路口详情
 * @Author:
 * @Date: 2023-11-10 16:03:17
 * @LastEditTime: 2023-11-21 16:28:15
 * @LastEditors:
 */
import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { Modal, Tabs } from "antd";
import { getJunction } from "@/Apis/Junction";
import JunctionInfo from "./JunctionInfo";
import DirectionItem from "./DirectionItem";
import Context from "./Context";

export default forwardRef(function JunctionDetail(props, ref) {
   const [visible, setVisible] = useState(false);
   const [detail, setDetail] = useState(null);
   const open = useRef(false);

   const items = [
      {
         key: "1",
         label: "路口信息",
         children: <JunctionInfo></JunctionInfo>
      },
      ...(detail
         ? detail.canalization_info.roadData.map((r, i) => ({
              key: i + 2,
              label: "方向" + r.code,
              children: <DirectionItem road={r}></DirectionItem>
           }))
         : [])
   ];

   useImperativeHandle(ref, () => ({
      setDetailVisible(junction) {
         getJunction(junction.id).then((res) => {
            open.current = true;
            setDetail(res);
         });
      }
   }));

   return (
      <Context.Provider value={detail}>
         <Modal
            title="路口详情"
            maskClosable={false}
            style={{ top: 70 }}
            width="calc(100vw - 50px)"
            open={detail && open.current}
            footer={null}
            onCancel={() => {
               open.current = false;
               setVisible(false);
            }}
            afterOpenChange={(value) => {
               if (value) {
                  setVisible(value);
               }
            }}
         >
            {visible ? <Tabs items={items} /> : ""}
         </Modal>
      </Context.Provider>
   );
});
