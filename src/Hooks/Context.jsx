/*
 * @Description: 通用 context
 * @Author:
 * @Date: 2023-11-22 10:12:58
 * @LastEditTime: 2023-11-22 10:30:01
 * @LastEditors:
 */
import { createContext } from "react";

let Context = null;
export const useCommonContext = () => {
   const makeContext = (initialValue) => (Context = createContext(initialValue));

   const Provider = ({ children, value }) => {
      return <Context.Provider value={value}>{children}</Context.Provider>;
   };

   return {
      makeContext,
      Context,
      Provider
   };
};
