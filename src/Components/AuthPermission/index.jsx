/*
 * @Description: 权限验证组件
 * @Author:
 * @Date: 2023-12-21 17:15:28
 * @LastEditTime: 2024-01-10 15:38:18
 * @LastEditors:
 */
import { useSelector } from "react-redux";
import { selectPermissionCodes } from "@/Store/Auth";

/**
 * @description 权限验证组件
 * @param {string|array} code - permission code
 * @param {React.ReactNode} children - children
 * @returns {React.ReactNode}
 */
export default function AuthPermissions({ code, children }) {
   const codes = Array.isArray(code) ? code : [code];
   const permissionCodes = useSelector(selectPermissionCodes);
   return codes.every((c) => permissionCodes.includes(c)) ? children : null;
}
