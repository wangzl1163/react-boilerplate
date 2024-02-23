/*
 * @Description: 操作记录
 * @Author:
 * @Date: 2023-11-14 15:35:49
 * @LastEditTime: 2024-01-09 14:03:44
 * @LastEditors:
 */
import { useImperativeHandle, useState, forwardRef } from "react";
import { Modal, Divider } from "antd";
import { getJunctionRecord } from "@/Apis/Junction";

export default forwardRef(function JunctionRecord(props, ref) {
   const [visible, setVisible] = useState(false);
   const [records, setRecords] = useState([]);
   const [junction, setJunction] = useState({});

   useImperativeHandle(ref, () => ({
      show: (junction) => {
         setVisible(true);

         getJunctionRecord(junction.id).then((res) => {
            setJunction(junction);
            setRecords(res);
         });
      }
   }));

   return (
      <Modal
         title="查看记录"
         width={350}
         destroyOnClose={true}
         mask={false}
         open={visible}
         footer={null}
         getContainer={false}
         wrapClassName="!absolute !top-0 !right-120 !inset-auto !overflow-hidden"
         style={{ top: 20 }}
         onCancel={() => {
            setVisible(false);
         }}
      >
         <div className="text-[18px] font-medium text-font-primary">
            {junction.id}-{junction.name}
         </div>
         <div className="mt-4 text-extra-sm text-[#e9f8ff99]">
            <div className="mb-1">创建人员：{records[records.length - 1]?.operaor_name}</div>
            <div>创建时间：{records[records.length - 1]?.operaor_time}</div>
         </div>
         <Divider style={{ margin: "16px 0 6px" }}></Divider>
         <div className="inline-block w-36.5 text-center text-[#e9f8ff99]">更新人员</div>
         <div className="inline-block w-41 text-center text-[#e9f8ff99]">更新时间</div>
         <div className="max-h-100 overflow-auto [&::-webkit-scrollbar]:w-0">
            {records.map(
               (r, i) =>
                  i !== records.length - 1 && (
                     <div key={i} className="mt-3">
                        <div className="inline-block w-36.5 text-center">{r.operaor_name}</div>
                        <div className="inline-block w-41 text-center">{r.operaor_time}</div>
                     </div>
                  )
            )}
         </div>
      </Modal>
   );
});
