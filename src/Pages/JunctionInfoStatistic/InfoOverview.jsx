import { useContext } from 'react';
import { Card } from 'antd';
import { VCard } from '@/Components';
import { useCommonContext } from '@/Hooks/Context';

export default function InfoOverview() {
   const { Context } = useCommonContext();
   const data = useContext(Context);

   return (
      <VCard title="路口信息总览" className="!rounded-1.5">
         <Card.Grid hoverable={false} className="!w-1/2 h-43.75 flex flex-col justify-center items-center !shadow-none">
            <span className="text-extra-xl font-bold">{data.cross_num}</span>
            <span>路口总数</span>
         </Card.Grid>
         <Card.Grid
            hoverable={false}
            className="!w-1/2 h-43.75 flex flex-col justify-center items-center !shadow-[0_1px_0_0_#3B4557,1px_0_0_0_#3B4557_inset]"
         >
            <span className="text-extra-xl font-bold">{data.signal_num}</span>
            <span>信号机总数</span>
         </Card.Grid>
         <Card.Grid
            hoverable={false}
            className="!w-1/2 h-43.75 flex flex-col justify-center items-center !rounded-bl-1.5 !shadow-[1px_0_0_0_#3B4557,0_1px_0_0_#3B4557_inset]"
         >
            <span className="text-extra-xl font-bold">{data.light_group_num}</span>
            <span>信号灯组</span>
         </Card.Grid>
         <Card.Grid hoverable={false} className="!w-1/2 h-43.75 flex flex-col justify-center items-center !rounded-br-1.5 !shadow-none">
            <span className="text-extra-xl font-bold">{data.elec_police_num}</span>
            <span>电子警察</span>
         </Card.Grid>
      </VCard>
   );
}
