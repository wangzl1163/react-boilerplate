export default {
   colors: {
      lite: '#6b7a90',
      white: '#ffffff',
      red: '#fb0008',
      green: '#23ff08',
      yellow: '#ffed32',
      black: '#000',
      blue: '#0677ef'
   },
   dirName: {
      1: '北',
      2: '东',
      3: '南',
      4: '西'
   },
   laneStream: {
      1: {
         text: '调头',
         icon: 'rollback'
      },
      2: {
         text: '左转',
         icon: 'arrow-left'
      },
      3: {
         text: '直行',
         icon: 'arrow-up'
      },
      4: {
         text: '右转',
         icon: 'arrow-right'
      }
   },
   laneStreamImg: [
      {
         img: 'bike'
      },
      {
         code: [1],
         img: 'turn'
      },
      {
         code: [3],
         img: 'go'
      },
      {
         code: [2],
         img: 'left'
      },
      {
         code: [4],
         img: 'right'
      },
      {
         code: [1, 3],
         img: 'goTurn'
      },
      {
         code: [2, 3],
         img: 'goLeft'
      },
      {
         code: [3, 4],
         img: 'goRight'
      },
      {
         code: [2, 3, 4],
         img: 'goLeftRight'
      },
      {
         code: [2, 4],
         img: 'leftRight'
      },
      {
         code: [1, 2],
         img: 'leftTurn'
      },
      {
         code: [1, 4],
         img: 'rightTurn'
      }
   ],
   junctionMode: {
      0: '无',
      16: '中心控制模式',
      17: '中心时间表控制',
      18: '中心优化控制',
      19: '中心协调控制',
      20: '中心自适应控制',
      21: '中心手动控制',
      33: '本地定周期控制',
      34: '本地感应控制',
      35: '本地协调控制',
      36: '本地自适应控制',
      37: '本地手动控制',
      38: '本地优先模式',
      49: '黄闪控制',
      50: '全红控制',
      51: '关灯控制'
   },
   shapeName: {
      line: '直线',
      polyline: '折线',
      rect: '矩形',
      circle: '圆',
      polygon: '多边形',
      image: '图片',
      text: '文本',
      zebra: '斑马线',
      go: '直行',
      left: '左转',
      right: '右转',
      goTurn: '直调头',
      goLeft: '直左',
      goRight: '直右',
      goLeftRight: '直左右',
      bike: '非机动车',
      arrowGroup: '车行灯组(箭头)',
      carLightGroup: '车行灯组(灯)',
      zebraLightGroup: '人行灯组',
      queue: '排队示意'
   },
   laneFeature: {
      variable_lane: {
         code: 'variable_lane',
         img: 'variableLane',
         text: '可变车道'
      },
      bus_lane: {
         code: 'bus_lane',
         img: 'busLane',
         text: '公交专用车道'
      },
      tidal_lane: {
         code: 'tidal_lane',
         img: 'tidalLane',
         text: '潮汐车道'
      },
      widened_lane: {
         code: 'widened_lane',
         img: 'widenedLane',
         text: '展宽车道'
      }
   }
};
