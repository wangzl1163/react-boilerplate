import request from "@/Utils/HttpRequest.js";

export function getSignalOptimizingRecords(junction_id) {
   return request.get("/v1/stat_signal/optimize", { junction_id }).then((res) => {
      return res.data;
   });
}

export function getSignalOptimizingStatistic(time_period) {
   return request.get("/v1/stat_signal/junctions", { time_period }).then((res) => {
      return res.data;
   });
}
