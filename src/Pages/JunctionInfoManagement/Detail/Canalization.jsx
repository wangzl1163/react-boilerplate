import { useRef, useEffect, useContext } from 'react';
import { CanalizationRenderer } from '@/Components';
import Context from './Context';

export default function Canalization() {
   const canalizationRenderer = useRef(null);
   const detail = useContext(Context);

   useEffect(() => {
      const { current } = canalizationRenderer;
      if (current) {
         current.initRoadData(detail.canalization_info.roadData);
      }
   }, []);

   return <CanalizationRenderer ref={canalizationRenderer} backgroundColor="#1C2233"></CanalizationRenderer>;
}
