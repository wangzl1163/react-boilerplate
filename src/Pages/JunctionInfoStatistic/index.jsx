/*
 * @Description: 路口信息统计
 * @Author:
 * @Date: 2023-11-21 16:45:57
 * @LastEditTime: 2023-12-05 10:11:34
 * @LastEditors:
 */
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { Page } from "@/Components";
import { getJunctionInfoStatistic } from "@/Apis/Statistic";
import { useCommonContext } from "@/Hooks/Context";
import InfoOverview from "./InfoOverview";
import TypeStatistic from "./Type";
import SignalStatistic from "./Signal";
import LightGroupStatistic from "./LightGroup";
import CollectionOverviewStatistic from "./CollectionOverview";
import MaintainStatistic from "./Maintain";
import UpdateTrendStatistic from "./UpdateTrend";

export default function JunctionInfoStatistic() {
   const { makeContext, Provider } = useCommonContext();
   const [data, setData] = useState({
      cross_type_stat: [],
      signal_stat: { brand_stat: [], network_stat: [], power_stat: [] }
   });

   makeContext();

   useEffect(() => {
      getJunctionInfoStatistic().then((res) => {
         setData(res);
      });
   }, []);

   return (
      <Page>
         <Provider value={data}>
            <Row gutter={[20, 20]}>
               <Col span={6}>
                  <InfoOverview></InfoOverview>
               </Col>
               <Col span={6}>
                  <TypeStatistic></TypeStatistic>
               </Col>
               <Col span={12}>
                  <SignalStatistic></SignalStatistic>
               </Col>
               <Col span={6}>
                  <LightGroupStatistic></LightGroupStatistic>
               </Col>
               <Col span={6}>
                  <CollectionOverviewStatistic></CollectionOverviewStatistic>
               </Col>
               <Col span={6}>
                  <MaintainStatistic></MaintainStatistic>
               </Col>
               <Col span={6}>
                  <UpdateTrendStatistic></UpdateTrendStatistic>
               </Col>
            </Row>
         </Provider>
      </Page>
   );
}
