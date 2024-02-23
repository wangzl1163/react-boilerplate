class Constant {
   static dictionary = {
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
            img: 'variableLane'
         },
         bus_lane: {
            code: 'bus_lane',
            img: 'busLane'
         }
      }
   };
   static defaultValues = {
      defaultCanalization:
         '{"canalization":{"roadData":[{"code":1,"name":"未定义","dir":1,"dirName":"北","zebra":{"code":0,"show":1,"stream":[1],"bindPhase":"8","bindPhaseName":"东向西行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":18,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[2],"bindPhase":"1","bindPhaseName":"北向东左转","index":0,"irn":"1_1","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":2,"type":1,"stream":[3],"bindPhase":"2","bindPhaseName":"北向南直行","index":1,"irn":"1_2","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":3,"type":1,"stream":[3],"bindPhase":"2","bindPhaseName":"北向南直行","index":2,"irn":"1_3","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"}],"basePos":{"x":300,"y":220},"height":170,"angle":-180},{"code":2,"name":"未定义","dir":1,"dirName":"东","zebra":{"code":0,"show":1,"stream":[1],"bindPhase":"4","bindPhaseName":"北向南行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":18,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[2],"bindPhase":"5","index":3,"irn":"2_1","bindPhaseName":"东向南左转","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":2,"type":1,"stream":[3],"bindPhase":"6","index":4,"irn":"2_2","bindPhaseName":"东向西直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":3,"type":1,"stream":[3],"bindPhase":"6","index":5,"irn":"2_3","bindPhaseName":"东向西直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"}],"basePos":{"x":380,"y":300},"height":170,"angle":-90},{"code":3,"name":"未定义","dir":1,"dirName":"南","zebra":{"code":0,"show":1,"stream":[1],"bindPhase":"16","bindPhaseName":"西向东行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":18,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[2],"bindPhase":"9","index":6,"irn":"3_1","bindPhaseName":"南向西左转","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":2,"type":1,"stream":[3],"bindPhase":"10","index":7,"irn":"3_2","bindPhaseName":"南向北直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":3,"type":1,"stream":[3],"bindPhase":"10","index":8,"irn":"3_3","bindPhaseName":"南向北直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"}],"basePos":{"x":300,"y":380},"height":170,"angle":0},{"code":4,"name":"未定义","dir":1,"dirName":"西","zebra":{"code":0,"show":1,"stream":[1],"bindPhase":"12","bindPhaseName":"南向北行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":18,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[2],"bindPhase":"13","index":9,"irn":"4_1","bindPhaseName":"西向北左转","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":2,"type":1,"stream":[3],"bindPhase":"14","index":10,"irn":"4_2","bindPhaseName":"西向东直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"},{"code":3,"type":1,"stream":[3],"bindPhase":"14","index":11,"irn":"4_3","bindPhaseName":"西向东直行","bindDetector1":"0","bindDetector2":"0","bindDetector3":"0"}],"basePos":{"x":220,"y":300},"height":170,"angle":90}],"customShapes":[]}}',
      defaultRoundCanalization4:
         '{"roadData":[{"code":1,"name":"未定义","dir":1,"dirName":"北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"1","bindPhaseName":"北向东左转"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"1","bindPhaseName":"北向东左转","index":0,"irn":"1_1","bindDetector1":"1"},{"code":2,"type":1,"stream":[3],"bindPhase":"2","bindPhaseName":"北向南直行","index":1,"irn":"1_2","bindDetector1":"2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":2,"irn":"1_3"}],"basePos":{"x":295,"y":218},"height":170,"angle":-180,"round":false},{"code":2,"name":"未定义","dir":1,"dirName":"东","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"8","bindPhaseName":"东向西行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"5","bindPhaseName":"东向南左转","index":3,"irn":"2_1","bindDetector1":"3"},{"code":2,"type":1,"stream":[3],"bindPhase":"6","bindPhaseName":"东向西直行","index":4,"irn":"2_2","bindDetector1":"4"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":5,"irn":"2_3"}],"basePos":{"x":380,"y":299},"height":170,"angle":-90},{"code":3,"name":"未定义","dir":1,"dirName":"南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"12","bindPhaseName":"南向北行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"9","bindPhaseName":"南向西左转","index":6,"irn":"3_1","bindDetector1":"5"},{"code":2,"type":1,"stream":[3],"bindPhase":"10","bindPhaseName":"南向北直行","index":7,"irn":"3_2","bindDetector1":"6"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":8,"irn":"3_3"}],"basePos":{"x":309,"y":384},"height":170,"angle":0},{"code":4,"name":"未定义","dir":1,"dirName":"西","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"16","bindPhaseName":"西向东行人"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"13","bindPhaseName":"西向北左转","index":9,"irn":"4_1","bindDetector1":"7"},{"code":2,"type":1,"stream":[3],"bindPhase":"14","bindPhaseName":"西向东直行","index":10,"irn":"4_2","bindDetector1":"8"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":11,"irn":"4_3"}],"basePos":{"x":216,"y":311},"height":170,"angle":90},{"code":5,"name":"未定义","round":true,"dir":1,"dirName":"环岛东","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":12,"irn":"5_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":13,"irn":"5_2"},{"code":3,"type":1,"stream":[],"bindPhase":0,"index":14,"irn":"5_3"}],"basePos":{"x":362.4175193240387,"y":329.9854982057768},"height":170,"angle":33.475042276002824},{"code":6,"name":"未定义","round":true,"dir":1,"dirName":"环岛西","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":15,"irn":"6_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":16,"irn":"6_2"},{"code":3,"type":1,"stream":[],"bindPhase":0,"index":17,"irn":"6_3"}],"basePos":{"x":234.0040337195859,"y":276.9852792827842},"height":170,"angle":-148.50119227704067},{"code":7,"name":"未定义","round":true,"dir":1,"dirName":"环岛南","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":18,"irn":"7_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":19,"irn":"7_2"},{"code":3,"type":1,"stream":[],"bindPhase":0,"index":20,"irn":"7_3"}],"basePos":{"x":275.5744549217958,"y":365.5254864001371},"height":170,"angle":-236.23046832476263},{"code":8,"name":"未定义","round":true,"dir":1,"dirName":"环岛北","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":21,"irn":"8_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":22,"irn":"8_2"},{"code":3,"type":1,"stream":[],"bindPhase":0,"index":23,"irn":"8_3"}],"basePos":{"x":325.2090775805341,"y":238.35119986955107},"height":170,"angle":-62.39182025649529}],"customShapes":[],"alien":false,"round":true}',
      defaultRoundCanalization5:
         '{"roadData":[{"code":1,"name":"未定义","dir":1,"dirName":"北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"1","bindPhaseName":"北向东左转"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"1","bindPhaseName":"北向东左转","index":0,"irn":"1_1","bindDetector1":"1"},{"code":2,"type":1,"stream":[3],"bindPhase":"2","bindPhaseName":"北向南直行","index":1,"irn":"1_2","bindDetector1":"2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":2,"irn":"1_3"}],"basePos":{"x":293,"y":210},"height":170,"angle":-180,"round":false},{"code":2,"name":"未定义","round":false,"dir":1,"dirName":"东北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":3,"irn":"2_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":4,"irn":"2_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":5,"irn":"2_3"}],"basePos":{"x":374.3838075096987,"y":257.38304859115226},"height":170,"angle":-122.76756591658292},{"code":3,"name":"未定义","round":false,"dir":1,"dirName":"东南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":6,"irn":"3_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":7,"irn":"3_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":8,"irn":"3_3"}],"basePos":{"x":369.97230495868314,"y":357.3787186512043},"height":170,"angle":-55.458328170258596},{"code":4,"name":"未定义","round":false,"dir":1,"dirName":"西南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":9,"irn":"4_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":10,"irn":"4_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":11,"irn":"4_3"}],"basePos":{"x":241.43706011111874,"y":372.8834996010954},"height":170,"angle":39.198876958430105},{"code":5,"name":"未定义","round":false,"dir":1,"dirName":"西北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":12,"irn":"5_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":13,"irn":"5_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":14,"irn":"5_3"}],"basePos":{"x":219.57325097909927,"y":267.24599634221903},"height":170,"angle":113.69059526097317},{"code":6,"name":"未定义","round":true,"dir":1,"dirName":"北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":15,"irn":"6_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":16,"irn":"6_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":17,"irn":"6_3"}],"basePos":{"x":245.37831196999082,"y":258.56429929869137},"height":170,"angle":-138.52891722765517},{"code":7,"name":"未定义","round":true,"dir":1,"dirName":"东北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":18,"irn":"7_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":19,"irn":"7_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":20,"irn":"7_3"}],"basePos":{"x":322.50010979286384,"y":235.58736808071046},"height":170,"angle":-56.40807164134466},{"code":8,"name":"未定义","round":true,"dir":1,"dirName":"东南环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":21,"irn":"8_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":22,"irn":"8_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":23,"irn":"8_3"}],"basePos":{"x":367.37983001566033,"y":295.3245760722094},"height":170,"angle":7.243022942436369},{"code":9,"name":"未定义","round":true,"dir":1,"dirName":"西南环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":24,"irn":"9_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":25,"irn":"9_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":26,"irn":"9_3"}],"basePos":{"x":321.79573402476603,"y":363.0710009031301},"height":170,"angle":71.74211023911081},{"code":10,"name":"未定义","round":true,"dir":1,"dirName":"西北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":27,"irn":"10_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":28,"irn":"10_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":29,"irn":"10_3"}],"basePos":{"x":237.8176696200756,"y":332.6229206576343},"height":170,"angle":152.0331538758955}],"customShapes":[],"alien":false,"round":true}',
      defaultRoundCanalization6:
         '{"roadData":[{"code":1,"name":"未定义","dir":1,"dirName":"北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":"1","bindPhaseName":"北向东左转"},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":"1","bindPhaseName":"北向东左转","index":0,"irn":"1_1","bindDetector1":"1"},{"code":2,"type":1,"stream":[3],"bindPhase":"2","bindPhaseName":"北向南直行","index":1,"irn":"1_2","bindDetector1":"2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":2,"irn":"1_3"}],"basePos":{"x":304,"y":211},"height":170,"angle":-180,"round":false},{"code":2,"name":"未定义","round":false,"dir":1,"dirName":"东北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":3,"irn":"2_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":4,"irn":"2_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":5,"irn":"2_3"}],"basePos":{"x":387.71123332014486,"y":263.12038910555515},"height":170,"angle":-121.3225185739578},{"code":3,"name":"未定义","round":false,"dir":1,"dirName":"东南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":6,"irn":"3_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":7,"irn":"3_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":8,"irn":"3_3"}],"basePos":{"x":370.6456330353278,"y":357.32759073846046},"height":170,"angle":-53.445743629323914},{"code":4,"name":"未定义","round":false,"dir":1,"dirName":"南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":9,"irn":"4_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":10,"irn":"4_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":11,"irn":"4_3"}],"basePos":{"x":291.37298894998355,"y":389.50009433810374},"height":170,"angle":-0.08511344788243491},{"code":5,"name":"未定义","round":false,"dir":1,"dirName":"西南","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":12,"irn":"5_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":13,"irn":"5_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":14,"irn":"5_3"}],"basePos":{"x":217.6926411938091,"y":340.55957692191066},"height":170,"angle":60.432061349881906},{"code":6,"name":"未定义","round":false,"dir":1,"dirName":"西北","zebra":{"code":0,"show":0,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":3,"laneData":[{"code":1,"type":1,"stream":[3],"bindPhase":0,"index":15,"irn":"6_1"},{"code":2,"type":1,"stream":[3],"bindPhase":0,"index":16,"irn":"6_2"},{"code":3,"type":1,"stream":[3],"bindPhase":0,"index":17,"irn":"6_3"}],"basePos":{"x":225.09176493645515,"y":245.82234628838725},"height":170,"angle":124.63691790685527},{"code":7,"name":"未定义","round":true,"dir":1,"dirName":"北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":18,"irn":"7_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":19,"irn":"7_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":20,"irn":"7_3"}],"basePos":{"x":265.07316241097567,"y":243.42489513859724},"height":170,"angle":-127.39515890701844},{"code":8,"name":"未定义","round":true,"dir":1,"dirName":"东北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":21,"irn":"8_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":22,"irn":"8_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":23,"irn":"8_3"}],"basePos":{"x":339.5099410639311,"y":241.15887662322575},"height":170,"angle":-52.39922507418294},{"code":9,"name":"未定义","round":true,"dir":1,"dirName":"东南环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":24,"irn":"9_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":25,"irn":"9_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":26,"irn":"9_3"}],"basePos":{"x":370.4409127698383,"y":302.5482887672549},"height":170,"angle":18.244786709723485},{"code":10,"name":"未定义","round":true,"dir":1,"dirName":"南环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":27,"irn":"10_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":28,"irn":"10_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":29,"irn":"10_3"}],"basePos":{"x":328.0154877251122,"y":359.07516143038055},"height":170,"angle":60.63647780336666},{"code":11,"name":"未定义","round":true,"dir":1,"dirName":"西南环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":30,"irn":"11_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":31,"irn":"11_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":32,"irn":"11_3"}],"basePos":{"x":264.71796769724494,"y":357},"height":170,"angle":120},{"code":12,"name":"未定义","round":true,"dir":1,"dirName":"西北环岛","zebra":{"code":0,"show":false,"stream":[1],"bindPhase":0},"secondZebra":{"code":100,"show":0,"stream":[1],"bindPhase":0},"laneWidth":15,"laneCount":3,"reverseLaneCount":0,"laneData":[{"code":1,"type":1,"stream":[4],"bindPhase":0,"index":33,"irn":"12_1"},{"code":2,"type":1,"stream":[4],"bindPhase":0,"index":34,"irn":"12_2"},{"code":3,"type":1,"stream":[4],"bindPhase":0,"index":35,"irn":"12_3"}],"basePos":{"x":231.66501656952133,"y":299.058729109405},"height":170,"angle":177.0400658584863}],"customShapes":[],"alien":false,"round":true}',
      // 用到了roadData
      roadData: {
         code: 1,
         name: '未定义',
         round: false,
         dir: 1,
         dirName: '北',
         travelTime: '15',
         zebra: {
            code: 0, // 作为 rowkey
            show: 1,
            stream: [1],
            bindPhase: 0
         },
         secondZebra: {
            code: 100,
            show: 0,
            stream: [1],
            bindPhase: 0
         },
         laneWidth: 20,
         laneCount: 4,
         reverseLaneCount: 4,
         laneData: [
            {
               code: 1,
               type: 1,
               stream: [2],
               bindPhase: 0
            },
            {
               code: 2,
               type: 1,
               stream: [3],
               bindPhase: 0
            },
            {
               code: 3,
               type: 1,
               stream: [3],
               bindPhase: 0
            },
            {
               code: 4,
               type: 1,
               stream: [4],
               bindPhase: 0
            }
         ]
      },
      controllerSketch: {
         customShapes: [
            {
               type: 'image',
               objectType: null,
               objectPreId: null,
               objectId: null,
               objectAttr: null,
               data: {
                  top: 1,
                  left: 2,
                  strokeColor: null,
                  strokeWidth: 0,
                  angle: 0,
                  width: 897.6979166666669,
                  height: 448.8489583333334,
                  base64: './static/img/controller_bg.png'
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '1',
               objectAttr: 'color',
               data: {
                  top: 208.53125,
                  left: 135.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '2',
               objectAttr: 'color',
               data: {
                  top: 265.53125,
                  left: 135.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '3',
               objectAttr: 'color',
               data: {
                  top: 317.53125,
                  left: 136.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '4',
               objectAttr: 'color',
               data: {
                  top: 371.53125,
                  left: 135.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '5',
               objectAttr: 'color',
               data: {
                  top: 209.53125,
                  left: 204.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '6',
               objectAttr: 'color',
               data: {
                  top: 265.53125,
                  left: 204.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '7',
               objectAttr: 'color',
               data: {
                  top: 318.53125,
                  left: 203.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '8',
               objectAttr: 'color',
               data: {
                  top: 372.53125,
                  left: 203.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '9',
               objectAttr: 'color',
               data: {
                  top: 210.53125,
                  left: 274.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '10',
               objectAttr: 'color',
               data: {
                  top: 264.53125,
                  left: 274.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '11',
               objectAttr: 'color',
               data: {
                  top: 319.53125,
                  left: 273.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '12',
               objectAttr: 'color',
               data: {
                  top: 371.53125,
                  left: 273.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '13',
               objectAttr: 'color',
               data: {
                  top: 210.53125,
                  left: 343.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '14',
               objectAttr: 'color',
               data: {
                  top: 265.53125,
                  left: 344.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '15',
               objectAttr: 'color',
               data: {
                  top: 318.53125,
                  left: 344.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            },
            {
               type: 'circle',
               objectType: 'phase',
               objectPreId: null,
               objectId: '16',
               objectAttr: 'color',
               data: {
                  top: 373.53125,
                  left: 345.015625,
                  strokeColor: '#c0c0c0',
                  strokeWidth: 0,
                  angle: 0,
                  fillColor: '#c0c0c0',
                  radius: 14
               }
            }
         ]
      }
   };

   // 道路等级
   static ROAD_LEVEL_OPTION = [
      { id: '快-快', name: '快-快' },
      { id: '快-主', name: '快-主' },
      { id: '快-次', name: '快-次' },
      { id: '主-主', name: '主-主' },
      { id: '主-次', name: '主-次' },
      { id: '主-支', name: '主-支' },
      { id: '次-次', name: '次-次' },
      { id: '次-支', name: '次-支' },
      { id: '支-支', name: '支-支' }
   ];
}

export default Constant;
