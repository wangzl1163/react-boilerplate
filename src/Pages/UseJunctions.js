import { useState, useEffect } from "react";
import { getJunctions } from "@/Apis/Junction.js";

export default function () {
   const [junctions, setJunctions] = useState([]);

   useEffect(() => {
      getJunctions().then((res) => {
         setJunctions(res);
      });
   }, []);

   return junctions;
}
