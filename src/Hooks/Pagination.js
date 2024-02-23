/*
 * @Description: 分页 hook
 * @Author:
 * @Date: 2023-10-31 17:33:29
 * @LastEditTime: 2023-10-31 17:52:04
 * @LastEditors:
 */
import { useState } from "react";

export default function usePage(form, callback) {
   const [pagination, setPagination] = useState({ current: 1, total: 0, size: 10 });

   return {
      config: {
         current: pagination.current,
         total: pagination.total,
         showSizeChanger: true,
         showQuickJumper: true,
         showTotal: () => `总共 ${pagination.total} 条`,
         onChange: (page, size) => {
            form.setFieldValue("pageNo", size === pagination.size ? page : 1);
            form.setFieldValue("pageSize", size);

            setPagination((state) => ({ ...state, current: size === pagination.size ? page : 1 }));

            callback();
         }
      },
      setPagination(value) {
         setPagination((state) => ({ ...state, ...value }));
      }
   };
}
