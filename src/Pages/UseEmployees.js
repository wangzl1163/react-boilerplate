import { useState, useEffect } from "react";
import { getEmployees } from "@/Apis/Employee.js";

export default function useEmployees() {
   const [employees, setEmployees] = useState([]);

   useEffect(() => {
      getEmployees({ searchName: "", pageSize: 1000, pageNo: 1 }).then((res) => {
         console.log("----- employees: ", res);
         setEmployees(res.rows);
      });
   }, []);

   return employees;
}
