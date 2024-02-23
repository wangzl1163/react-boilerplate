/*
 * @Description:
 * @Author:
 * @Date: 2023-10-24 16:56:47
 * @LastEditTime: 2023-10-24 17:02:28
 * @LastEditors:
 */
import { makeEnum } from "./Composables/MakeEnum";

const Status = {
   成功: "success",
   失败: "failed"
};

export const ActionStatus = makeEnum(Status, "status");
