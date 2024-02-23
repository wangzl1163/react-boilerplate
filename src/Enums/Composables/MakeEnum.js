/*
 * @Description: 生成枚举
 * @Author:
 * @Date: 2023-10-24 16:56:47
 * @LastEditTime: 2023-12-06 17:10:36
 * @LastEditors:
 */
export function makeEnum(enumObj, enumKey = "status") {
   let list = function () {
      return Object.entries(enumObj).map((entry) => ({
         value: entry[1],
         label: entry[0]
      }));
   };

   const values = Object.values(enumObj);
   if (values.some((val) => ["number"].includes(typeof val))) {
      list = function () {
         return Object.entries(enumObj)
            .filter((en) => en.some((item) => typeof item === "number"))
            .map((entry) => ({
               value: entry[1],
               label: entry[0]
            }));
      };
   }

   const mapObj = Object.entries(enumObj).reduce((p, c) => {
      p[c[0]] = c[1];
      p[c[1]] = c[0];
      return p;
   }, {});

   return {
      [enumKey]: mapObj,
      list
   };
}
