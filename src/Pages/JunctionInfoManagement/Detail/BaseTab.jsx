import { Flex } from 'antd';
import Canalization from './Canalization';

export default function BaseTab({ children }) {
   return (
      <Flex gap={20} className="w-full">
         <Canalization></Canalization>
         <div className="flex-1">{children}</div>
      </Flex>
   );
}
