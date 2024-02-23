/*
 * @Description: 路口信息管理
 * @Author:
 * @Date: 2023-11-10 16:03:10
 * @LastEditTime: 2024-01-11 16:41:25
 * @LastEditors:
 */
import { useRef, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { MaptalksContainer, PanelTitle, CanalizationRenderer } from "@/Components";
import imgUrl from "@/Assets/Icons/Img/junction.png";
import { getMapViewAngle } from "@/Apis/Map";
import { getJunctions, getJunction } from "@/Apis/Junction";
import junctionTypes from "@/Assets/Constant/JunctionType";
import Item from "./Item";
import Record from "./Record";
import Detail from "./Detail";

export default function ManagementOverview() {
   const mapContainer = useRef(null);
   const record = useRef(null);
   const canalizationRenderer = useRef(null);
   const detail = useRef(null);
   const [form] = Form.useForm();
   const [junctions, setJunctions] = useState([]);
   const currentJunction = useRef(null);

   const handleSearch = () => {
      return getJunctions(form.getFieldsValue(true)).then((res) => {
         console.log("----- getJunctions: ", res);
         setJunctions(res);

         return res;
      });
   };
   const handleReset = () => {
      form.resetFields();
      handleSearch();
   };
   const handleMapCompleted = () => {
      getMapViewAngle().then((res) => {
         mapContainer.current.setMapView({ center: [res.lon, res.lat] });
      });

      handleSearch().then((res) => {
         res.forEach((item) => {
            mapContainer.current.renderScatter(
               { lon: item.longitude, lat: item.latitude, ...item },
               {
                  autoPan: false,
                  autoCloseOn: null,
                  autoOpenOn: null,
                  single: false,
                  custom: true,
                  show: true,
                  dx: 0,
                  dy: -8,
                  content:
                     '<div class="w-fit px-2 py-1.5 text-font-primary text-extra-sm rounded-1" style="background-color:#384EC4;border: 1px solid #A1ADBE;text-wrap: nowrap;">' +
                     item.id +
                     "-" +
                     item.name +
                     '<div class="w-2.5 h-2.5 absolute" style="background-color:#384EC4;border: 1px solid #A1ADBE;border-top: none;border-left: none;left: calc(50% - 5px);transform: rotate(45deg);bottom: -5px;"></div>' +
                     "</div>"
               }
            );
         });
      });
   };
   const handleMarkerClick = (e) => {
      currentJunction.current = e.target.userData;
      mapContainer.current.setMarkerInfoWindowVisible(true);
   };

   return (
      <MaptalksContainer
         ref={mapContainer}
         baseLayerOptions={{
            urlTemplate: window.LS_MAP_URL_TEMPLATE,
            crs: "EPSG:3857",
            layers: "lhasa_workspace:lhasa-web-dark-layer",
            version: "1.3.0",
            format: "image/png",
            transparent: true,
            backgroundZoomDiff: 6,
            renderer: "gl"
         }}
         poiLayerUrlTemplate={window.LS_MAP_URL_POI}
         onCompleted={handleMapCompleted}
         onMarkerClick={handleMarkerClick}
         infoWindowOptions={{
            width: "292px",
            margin: { right: 464 },
            header: () => (
               <div className="text-me">
                  <img src={imgUrl} className="mr-3 inline-block bg-brand-base align-bottom" />
                  {currentJunction.current?.id}-{currentJunction.current?.name}
               </div>
            ),
            body: (
               <div className="h-65">
                  <CanalizationRenderer
                     className="-translate-x-42.75 -translate-y-42.5 scale-[0.43]"
                     onRef={(e) => {
                        canalizationRenderer.current = e;
                     }}
                  ></CanalizationRenderer>
               </div>
            ),
            footer: (
               <Button
                  type="primary"
                  className="float-right"
                  onClick={() => {
                     detail.current.setDetailVisible(currentJunction.current);
                  }}
               >
                  查看详情
               </Button>
            ),
            onVisibleChanged: (visible, marker) => {
               if (visible) {
                  getJunction(marker.userData.id).then((res) => {
                     console.log("----- getJunction: ", res);
                     canalizationRenderer.current.initRoadData(res.canalization_info.roadData);
                  });
               }
            }
         }}
         controlPositionRight="470px"
      >
         <div className="absolute right-0 top-0 z-10 h-full w-116  bg-gradient-to-r from-[#0d213fcc] from-0% to-[#0d172be6] to-100% pt-5">
            <PanelTitle title="路口列表"></PanelTitle>
            <div className="h-[calc(100%_-_58px)] w-full overflow-auto p-3 [&::-webkit-scrollbar]:w-0">
               <Form
                  form={form}
                  layout="inline"
                  className="w-full"
                  initialValues={{ junction_id: "", junction_type: undefined, junction_name: "" }}
               >
                  <Form.Item className="!me-1.5" label="" name="junction_id">
                     <Input placeholder="路口编号" className="w-61" />
                  </Form.Item>
                  <Form.Item className="!me-1.5" label="" name="junction_type">
                     <Select placeholder="路口类型" className="!w-30">
                        {junctionTypes.map((jt, i) => (
                           <Select.Option key={i} value={jt.id}>
                              {jt.name}
                           </Select.Option>
                        ))}
                     </Select>
                  </Form.Item>
                  <Form.Item className="!me-0" label="">
                     <Button type="primary" onClick={() => handleSearch()}>
                        搜索
                     </Button>
                  </Form.Item>
                  <Form.Item className="!me-1.5 mt-2" label="" name="junction_name">
                     <Input placeholder="路口名称" className="w-92.5" />
                  </Form.Item>
                  <Form.Item className="!me-0 mt-2" label="">
                     <Button type="primary" onClick={() => handleReset()}>
                        重置
                     </Button>
                  </Form.Item>
               </Form>

               {junctions.map((item, i) => {
                  return (
                     <Item
                        className={i === 0 ? "mt-3" : "mt-2"}
                        key={item.id}
                        junction={item}
                        onShowRecord={(junction) => record.current.show(junction)}
                        onEdit={(junctionId) => {
                           window.open("/system/#/road?junctionId=" + junctionId, "_blank");
                        }}
                        onClick={(junction) => {
                           mapContainer.current.setMarkerInfoWindowVisible(false);
                           mapContainer.current.flyTo({ lon: junction.longitude, lat: junction.latitude }, mapContainer.current.getMap());
                        }}
                     ></Item>
                  );
               })}

               <Record ref={record}></Record>
            </div>
         </div>

         <Detail ref={detail}></Detail>
      </MaptalksContainer>
   );
}
