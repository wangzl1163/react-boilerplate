/*
 * @Description:
 * @Author:
 * @Date: 2023-12-07 17:34:30
 * @LastEditTime: 2023-12-28 14:12:12
 * @LastEditors:
 */
import { useState } from "react";
import { Input, Tree } from "antd";

import "./index.less";

export default function JunctionList({ junctions, onSelect, showSearch = true }) {
   const [junctionList, setJunctionList] = useState(junctions);
   const [selectedKeys, setSelectedKeys] = useState([junctions[0].id]);
   const treeData = junctionList.map((j) => ({ key: j.id, title: j.id + "-" + j.name }));

   const handleSearch = (e) => {
      setJunctionList(junctions.filter((junction) => (junction.name + junction.id).toLowerCase().includes(e.target.value.toLowerCase())));
   };

   return (
      <div className="h-full w-70 overflow-y-auto rounded-1 bg-module-base p-4">
         {showSearch && <Input.Search placeholder="请输入关键字" onChange={handleSearch}></Input.Search>}
         <Tree
            selectedKeys={selectedKeys}
            className="mt-2.5 w-full"
            treeData={treeData}
            defaultSelectedKeys={[junctions[0].id]}
            blockNode
            onSelect={(sks) => {
               if (sks[0]) {
                  setSelectedKeys(sks);
                  onSelect(sks[0]);
               }
            }}
         ></Tree>
      </div>
   );
}
