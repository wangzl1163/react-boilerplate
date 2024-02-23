import { useRoutes, Navigate } from "react-router-dom";

import Management from "@/Pages/JunctionInfoManagement";
import Statistic from "@/Pages/JunctionInfoStatistic";
import SignalTask from "@/Pages/SignalTask";

export default function Routes() {
   return useRoutes([
      {
         path: "/",
         element: <Navigate to="/junction-info-management" replace />
      },
      {
         path: "/junction-info-management",
         Component: Management
      },
      {
         path: "/junction-info-statistic",
         Component: Statistic
      },
      {
         path: "/signal-task-management",
         Component: SignalTask
      }
   ]);
}
