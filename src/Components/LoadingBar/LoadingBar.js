import LoadingBar from "./LoadingBar.jsx";
import ReactDOM from 'react-dom/client';

LoadingBar.newInstance = (properties) => {
   const _props = () => properties || {};
   const container = document.createElement("div");
   const Instance = ReactDOM.createRoot(container)
   Instance.render(<LoadingBar {..._props}/>)
   document.body.appendChild(container.firstElementChild);

   const loading_bar = Instance.component;

   return {
      update(options) {
         if ("percent" in options) {
            loading_bar.proxy.percent = options.percent;
         }
         if (options.status) {
            loading_bar.proxy.status = options.status;
         }
         if ("show" in options) {
            loading_bar.proxy.show = options.show;
         }
      },
      component: LoadingBar,
      destroy() {
         Instance.unmount()
         document.body.removeChild(
            document.getElementsByClassName("loading-bar")[0]
         );
      }
   };
};

export default LoadingBar;
