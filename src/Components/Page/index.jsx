/*
 * @Description: page component
 * @Author:
 * @Date: 2023-10-20 14:00:02
 * @LastEditTime: 2023-11-01 16:54:50
 * @LastEditors:
 */
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
import classnames from "classnames";

export default function Page({ children, isDetail = false, detailTitle, className }) {
   const navigate = useNavigate();

   return (
      <div
         className={classnames("h-full w-full bg-page-bg px-5 pb-3 pt-5 text-font-primary", className ?? "")}
         style={{ fontFamily: "'微软雅黑', PingFangSC" }}
      >
         {isDetail ? (
            <div className="flex h-full w-full flex-col p-4" style={{ backgroundColor: "#18202E" }}>
               <div className="mb-6 flex w-full items-center">
                  <div className="basis-9 cursor-pointer" onClick={() => navigate(-1)}>
                     <LeftOutlined />
                     <span>返回</span>
                  </div>
                  <div className="flex-1 text-center text-lg font-medium">{detailTitle}</div>
               </div>
               <div className="w-full flex-1">{children}</div>
            </div>
         ) : (
            children
         )}
      </div>
   );
}
