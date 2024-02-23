import { makeEnum } from "./Composables/MakeEnum";

const Status = {
   无: 0,
   有: 1
};

export const YesOrNoStatus = makeEnum(Status);
