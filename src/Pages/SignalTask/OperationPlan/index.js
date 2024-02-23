import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, InputNumber, Button, message } from 'antd';
import Lodash from 'lodash';
import { OldAxios } from '@common/Axios';
import Constant from '@common/Constant';
import './index.less';
import PartTitle from '@common/PartTitle/index';
import StagePhaseSvg from '../StagePhaseSvg';
import { JUNCTION_PLAN_URL } from '@assets/js/constant';
import { openMsgWs, closeMsgWs, setGuid, getGuid } from '@common/msgWs';

class OperationPlan extends Component {
   state = {
      stageTimeEdit: false, //是否是编辑阶段时长的状态
      stageDetailBak: [], //写信号机要用的
      writeCtl: false //正在写信号机
   };
   msgWS = null; //发送指令返回的结果ws
   t1User = sessionStorage.getItem('t1_user');

   componentDidMount() {
      const userInfo = JSON.parse(this.t1User);
      this.msgWS = openMsgWs(this.msgWS, userInfo.userId, this.receiveMsg);
   }
   componentWillReceiveProps(nextProps) {
      const { currentJunctionId } = this.props;
      if (currentJunctionId != nextProps.currentJunctionId) {
         this.handleClickCancelStageTime();
      }
   }
   componentWillUnmount() {
      this.msgWS = closeMsgWs(this.msgWS);
   }
   render() {
      const { wsMonitorData, canalization, hideTitle, hideBtn, userReducer } = this.props,
         { stageTimeEdit, stageDetailBak, writeCtl } = this.state;
      return (
         <div className={`operation-plan right-part body-part mt20 ${process.env.REACT_APP_PLATFORM === 'YUN' ? '' : 'cq'}`}>
            <div className="tabs-title" style={{ display: hideTitle ? 'none' : 'block' }}>
               <PartTitle titleText="运行方案" />
            </div>
            <div className="content">
               <div className="top">
                  <div className="left">
                     <span className="mr40">路口配置方案{wsMonitorData.currplan || ''}</span>
                     <div>
                        <span>方案号：{wsMonitorData.currplan || '-'}</span>
                        <span>周期：{wsMonitorData.cycle || '-'}</span>
                        <span>相位差：{wsMonitorData.curoff || '-'}</span>
                     </div>
                  </div>
                  <div className="btns">
                     {stageTimeEdit ? (
                        <>
                           <Button onClick={this.handleClickCancelStageTime}>取消</Button>
                           <Button type="primary" disabled={writeCtl} onClick={this.handleClickWriteCtl}>
                              {writeCtl ? (
                                 <>
                                    <Icon type="reload" spin className="mr4" />
                                    写入中
                                 </>
                              ) : (
                                 '写信号机'
                              )}
                           </Button>
                        </>
                     ) : (
                        <>
                           {/* <Button type='primary' onClick={this.handleClickEditStageTime}>修改阶段时长</Button> */}
                           {(!!userReducer.menuList.includes('/app/junctionPlan') ||
                              !!userReducer.menuList.includes('/app/commonJunctionPlan')) && (
                              <Link
                                 className="history-single-btn"
                                 style={{ display: hideBtn ? 'none' : 'block' }}
                                 to={`${JUNCTION_PLAN_URL}?id=${wsMonitorData.junction_id}`}
                                 target="_blank"
                                 rel="opener"
                              >
                                 <Button type="primary" className="ml8">
                                    方案管理
                                 </Button>
                              </Link>
                           )}
                        </>
                     )}
                  </div>
               </div>
               <div className="stagesSvg">
                  {wsMonitorData.stage_detail &&
                     !!wsMonitorData.stage_detail.length &&
                     wsMonitorData.stage_detail.map((stage, stageIndex) => {
                        let _stage = wsMonitorData.stages.find((s) => s.id === stage.stage_no);
                        return (
                           <div key={stage.stage_no} className={`stageSvg ${wsMonitorData.real_stage === stage.stage_no ? 'active' : ''}`}>
                              <div className="stage-no">阶段{stage.stage_no}</div>
                              {/* {_stage ? '-' + _stage.name : ''} */}
                              <div className="card-body">
                                 <StagePhaseSvg
                                    data={stage}
                                    canalization={canalization}
                                    countDown={wsMonitorData.real_stage === stage.stage_no}
                                    stageRunTime={wsMonitorData.stage_run_time}
                                 />
                                 {stageTimeEdit && (
                                    <div className="stage-time-input">
                                       <InputNumber
                                          min={0}
                                          value={stageDetailBak[stageIndex].len}
                                          onChange={(val) => this.handleChangeStageTime(val, stage)}
                                       />
                                    </div>
                                 )}
                              </div>
                           </div>
                        );
                     })}
               </div>
            </div>
         </div>
      );
   }
   //调接口  修改配时方案时间
   fetchSetJunctionPlanTime = async () => {
      const { currentJunctionId, wsMonitorData } = this.props,
         { stageDetailBak } = this.state;
      let params = {
         junctionId: currentJunctionId, //路口号
         planNo: wsMonitorData.currplan, //方案号
         cycleLen: wsMonitorData.cycle, //周期
         offSet: wsMonitorData.curoff, //相位差
         stages: stageDetailBak.map((sItem, sIndex) => ({
            seqNo: sIndex + 1, //序号
            stageNo: sItem.stage_no, //阶段号
            stageTime: sItem.len, //阶段时长
            phases: sItem.phase_in_stage.map((pItem) => ({
               phaseNo: pItem.phase_id_in_stage
            }))
         }))
      };
      //TODO
      console.log('params>>', params);
      return;
      try {
         let res = await OldAxios.post(Constant.yapi.unitCtlSetJunctionPlanTime, params);
         if (res.data.isError === 'false') {
            setGuid(res.data.guid, 'setJunctionPlanTime');
         } else {
            message.error(res.data.message);
         }
      } catch (err) {
         message.error(err);
      }
   };
   //发送指令的提示
   receiveMsg = (wsmessage) => {
      if (wsmessage.data.type == 'request') {
         let guidObj = getGuid(wsmessage.data.value);
         if (guidObj) {
            if (guidObj[1] === 'setJunctionPlanTime') {
               if (wsmessage.code == 0) {
                  message.success(wsmessage.data.message);
               } else {
                  message.error(wsmessage.data.message);
               }
               this.setState({
                  stageTimeEdit: false,
                  writeCtl: false,
                  stageDetailBak: []
               });
            }
            setGuid(guidObj[0], undefined);
         }
      }
   };
   //点击修改阶段时长
   handleClickEditStageTime = () => {
      const { wsMonitorData } = this.props;
      this.setState({
         stageTimeEdit: true,
         stageDetailBak: wsMonitorData.stage_detail
      });
   };
   //取消修改阶段时长
   handleClickCancelStageTime = () => {
      this.setState({
         stageTimeEdit: false,
         writeCtl: false,
         stageDetailBak: []
      });
   };
   //写信号机
   handleClickWriteCtl = () => {
      this.setState(
         {
            writeCtl: true
         },
         this.fetchSetJunctionPlanTime
      );
   };
   //修改阶段时长的值
   handleChangeStageTime = (val, stage) => {
      const { stageDetailBak } = this.state,
         cloneStageDetailBak = Lodash.cloneDeep(stageDetailBak);
      let _stage = cloneStageDetailBak.find((item) => item.stage_no == stage.stage_no);
      _stage.len = val;
      this.setState({
         stageDetailBak: cloneStageDetailBak
      });
   };
}

function mapStateToProps(state) {
   // 把仓库中的属性放到组件的 props里
   return {
      userReducer: state.userReducer
   };
}
function mapDispatchToProps(dispatch) {
   // 把仓库中的方法放到组件的 props里
   return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationPlan);
