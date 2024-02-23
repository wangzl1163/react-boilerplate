import { Component } from 'react';
import './index.less';
import BIKE_PURPLE from '@/Assets/Icons/svg/bike_purple.svg';
import BIKE_BLUE from '@/Assets/Icons/svg/bike_blue.svg';

export default class StagePhaseSvg extends Component {
   state = {
      ways: [],
      stageData: {},
      secondZebraConfig: {} //是否二次过街
   };
   bikeColor = {
      '#6A81FF': BIKE_PURPLE,
      '#88B3FF': BIKE_BLUE
   };
   path = {
      F: 'M 170 45 H 140', //直行    'M 180,30 H 155'
      R: 'M 170 45 H 150 L140 35', //右转  'M 180,30 H 165 L150 20'
      L: 'M 170 45 H 150 L140 55', //左转   'M 180,30 H 165 L150 40'
      T: 'M 170 65 L135 65 C135 65 125 70 135 75 L160 75', //掉头   'M 180 50 L140 50 C140 50 130 55 140 60 L155 60'
      W: 'M 160 25 H 40', //行人  'M 175 10 H 25'
      W1: 'M 160 25 H 114', //行一   'M 175 10 H 115'
      W2: 'M 86 25 H 40', //行二  'M 85 10 H 25'
      WR: 'M 180 20 L192 8' //右转行人   'M 180 20 L195 5'
   };

   getScaleNum() {
      return this.size / 200;
   }
   componentDidMount() {
      this.setSecondZebraConfig(this.props.canalization);
      this.setState(
         {
            stageData: this.props.data
         },
         () => {
            this.dataRemix();
         }
      );
   }
   render() {
      const { size, arrowsColor, color, backgroundColor, countDown, stageRunTime } = this.props;
      const { stageData, ways } = this.state;

      return (
         <div className="stage-phase-svg-box">
            <svg
               className="stage-graph"
               style={{ backgroundColor: backgroundColor || 'transparent' }}
               width={size}
               height={size}
               viewBox="0 0 200 200"
            >
               <defs>
                  <marker style={{ overflow: 'visible' }} id="stage-graph-arrow" refX="0.0" refY="0.0" orient="auto">
                     <polyline fill={arrowsColor} strokeWidth="2" points="4 0, 0 2, 0 -2"></polyline>
                  </marker>
                  <marker style={{ overflow: 'visible' }} id="stage-graph-arrow-w1" refX="0.0" refY="0.0" orient="auto">
                     <polyline fill={arrowsColor} strokeWidth="2" transform="rotate(180)" points="4 0, 0 2, 0 -2"></polyline>
                  </marker>
                  <marker style={{ overflow: 'visible' }} id="stage-graph-arrow-w2" refX="0.0" refY="0.0" orient="auto">
                     <polyline fill={arrowsColor} strokeWidth="2" points="4 0, 0 2, 0 -2"></polyline>
                  </marker>
                  <marker style={{ overflow: 'visible' }} id="stage-graph-arrow-l" refX="0.0" refY="0.0" orient="auto">
                     <polyline
                        fill={arrowsColor}
                        strokeWidth="2"
                        transform=" translate(-1, 0) rotate(-45)"
                        points="2 0, 0 3, 0 -3"
                     ></polyline>
                  </marker>
                  <marker style={{ overflow: 'visible' }} id="stage-graph-arrow-r" refX="0.0" refY="0.0" orient="auto">
                     <polyline
                        fill={arrowsColor}
                        strokeWidth="2"
                        transform=" translate(-1, 0) rotate(45)"
                        points="2 0, 0 3, 0 -3"
                     ></polyline>
                  </marker>
                  <path id="path-F" d={this.path.F} style={{ stroke: arrowsColor }}></path>
                  <path id="path-R" d={this.path.R} className="r" style={{ stroke: arrowsColor }}></path>
                  <path id="path-L" d={this.path.L} className="l" style={{ stroke: arrowsColor }}></path>
                  <path id="path-W" d={this.path.W} className="w" style={{ stroke: arrowsColor }}></path>
                  <path id="path-W1" d={this.path.W1} className="w" style={{ stroke: arrowsColor }}></path>
                  <path id="path-W2" d={this.path.W2} className="w" style={{ stroke: arrowsColor }}></path>
                  <path id="path-WR" d={this.path.WR} className="w" style={{ stroke: arrowsColor }}></path>
                  <path id="path-T" d={this.path.T} style={{ stroke: arrowsColor }}></path>
                  <g id="path-LFR">
                     <path d={this.path.F} style={{ stroke: arrowsColor }}></path>
                     <path d={this.path.L} style={{ stroke: arrowsColor }}></path>
                     <path d={this.path.R} style={{ stroke: arrowsColor }}></path>
                  </g>
                  <g id="path-RF">
                     <path d={this.path.F} style={{ stroke: arrowsColor }}></path>
                     <path d={this.path.R} style={{ stroke: arrowsColor }}></path>
                  </g>
                  <g id="path-LF">
                     <path d={this.path.F} style={{ stroke: arrowsColor }}></path>
                     <path d={this.path.L} style={{ stroke: arrowsColor }}></path>
                  </g>
                  <g id="path-B">
                     <image xlinkHref={this.bikeColor[arrowsColor]} width="30" height="20" stroke="#F00" x="90" y="27" />
                  </g>
               </defs>
               {ways.length ? (
                  ways.map((stage, i) => (
                     <use
                        key={`arrow-${i}`}
                        xlinkHref={`#path-${stage.arrow}`}
                        x="0"
                        y="0"
                        className={
                           stage.arrow == 'W' || stage.arrow == 'W1' || stage.arrow == 'W2' || stage.arrow == 'WR' ? 'non-motor' : ''
                        }
                        transform={this.transform(stage)}
                     />
                  ))
               ) : (
                  <text x="50" y="100" fill="rgba(233, 248, 255, 0.35)" style={{ fontSize: 20 }}>
                     无有效相位
                  </text>
               )}
            </svg>
            {ways.length ? (
               countDown ? (
                  <div
                     className="stage-graph-time count-down"
                     style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%)`,
                        fontSize: size / 3 - 20,
                        color: '#FFFFFF'
                     }}
                  >
                     {stageRunTime}/<span style={{ fontSize: size / 3 - 28 }}>{stageData.len}s</span>
                  </div>
               ) : (
                  <div
                     className="stage-graph-time"
                     style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%)`,
                        fontSize: size / 3 - 20,
                        color: color
                     }}
                  >
                     {stageData.len}
                     <span style={{ fontSize: size / 3 - 18 }}>s</span>
                  </div>
               )
            ) : (
               ''
            )}
         </div>
      );
   }
   setArrow = (phase_name) => {
      const { secondZebraConfig } = this.state;
      if (phase_name) {
         if (phase_name.includes('直行')) {
            return 'F';
         } else if (phase_name.includes('左转')) {
            return 'L';
         } else if (phase_name.includes('右转') && !phase_name.includes('右转行人')) {
            return 'R';
         } else if (phase_name.includes('掉头')) {
            return 'T';
         } else if ((phase_name.includes('行人') || phase_name.includes('人行横道')) && !phase_name.includes('右转行人')) {
            //console.log('secondZebraConfig>>', secondZebraConfig, phase_name[0])
            //判断是否有二次过街
            if (secondZebraConfig[phase_name[0]]) {
               return 'W1';
            } else {
               return 'W';
            }
         } else if (phase_name.includes('行一')) {
            return 'W1';
         } else if (phase_name.includes('行二')) {
            return 'W2';
         } else if (phase_name.includes('右转行人')) {
            return 'WR';
         } else if (phase_name.includes('非机')) {
            return 'B';
         } else if (phase_name.includes('左直右')) {
            return 'LFR';
         } else if (phase_name.includes('左直')) {
            return 'LF';
         } else if (phase_name.includes('右直')) {
            return 'RF';
         }
      } else {
         return '';
      }
   };
   setDirection = (phase_name) => {
      if (phase_name) {
         switch (phase_name[0]) {
            case '东':
               return 0;
            case '南':
               return 90;
            case '西':
               return 180;
            case '北':
               return 270;
            default:
               return 0;
         }
      }
   };
   dataRemix = () => {
      const { stageData } = this.state;
      let ways = [];
      let setArrow = this.setArrow;
      let setDirection = this.setDirection;
      if (stageData.phase_in_stage && stageData.phase_in_stage.length) {
         stageData.phase_in_stage.forEach((stageItem, index) => {
            ways[index] = [];
            ways[index].arrow = setArrow(stageItem.phase_name_in_stage, stageData.phase_in_stage);
            ways[index].direction = setDirection(stageItem.phase_name_in_stage);
         });
      }
      this.setState({
         ways
      });
   };
   //各方向是否有二次过街
   setSecondZebraConfig = (canalization) => {
      if (!canalization || !canalization.roadData) return;
      let secondZebraConfig = {},
         directionDict = {
            北: '东',
            东: '南',
            南: '西',
            西: '北'
         };

      canalization.roadData.forEach((item) => {
         secondZebraConfig[directionDict[item.dirName]] = item.secondZebra.show;
      });
      this.setState({
         secondZebraConfig
      });
   };
   transform = (arrow) => {
      let val = '';
      if (arrow.direction % 90) {
         val = `rotate(${arrow.direction || 0},100,100) translate(30,45)`;
      } else {
         val = `rotate(${arrow.direction || 0},100,100)`;
      }
      if (arrow.nonMotor) {
         //val += ` scale(0.7) translate(90,-20) `;
         val += ` translate(0,-30)`;
      }
      return val;
   };
}
StagePhaseSvg.defaultProps = {
   size: '140',
   color: '#E9F8FF', //中间文字颜色
   arrowsColor: '#6A81FF', //箭头颜色
   countDown: false //是否倒计时
};
