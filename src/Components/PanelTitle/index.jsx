/*
 * @Description: panel title
 * @Author:
 * @Date: 2023-11-14 10:18:27
 * @LastEditTime: 2023-11-14 15:11:43
 * @LastEditors:
 */
import { Component } from "react";
import { Popover } from "antd";
import "./index.less";
export default class PanelTitle extends Component {
   content = () => {
      const { tooltipText = [] } = this.props;
      return (
         <div>
            {tooltipText.map((item, index) => (
               <p key={index}>{item}</p>
            ))}
         </div>
      );
   };
   render() {
      const { title, tooltipText = [], right } = this.props;
      return (
         <div className="panel-title">
            <div className="left">
               <i className="title-front" />
               <span className="title-text">{title}</span>
               {tooltipText.length ? (
                  <>
                     <span className="spliter">/</span>
                     <Popover content={this.content()}>
                        <i className="tooltip-icon" />
                     </Popover>
                  </>
               ) : (
                  ""
               )}
            </div>
            <div className="right">{right || ""}</div>
         </div>
      );
   }
}
