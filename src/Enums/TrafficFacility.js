import { makeEnum } from "./Composables/MakeEnum";

const Light = {
   1: "掉头灯",
   2: "左转箭头灯",
   3: "圆灯",
   4: "直行箭头灯",
   5: "右转箭头灯",
   6: "非机动车灯",
   7: "行人灯"
};

export const SignalLight = makeEnum(Light, "light");
