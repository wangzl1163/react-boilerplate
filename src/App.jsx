import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "@/Routes";
import { getUserInfo } from "@/Store/Auth";

export default function App() {
   const dispatch = useDispatch();

   useLayoutEffect(() => {
      dispatch(getUserInfo());
   });

   return <Routes />;
}
