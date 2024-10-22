import AMapLoader from "@amap/amap-jsapi-loader";

declare global {
  interface Window {
    _AMapSecurityConfig: {
      serviceHost: string;
      securityJsCode: string;
    };
  }
}

window._AMapSecurityConfig = {
  serviceHost: "http://114.212.22.109:7890/_AMapService",
  securityJsCode: "49f66ab58a645fab0c230902012a7459",
};

const AMap = await AMapLoader.load({
  key: "d475ffcb9753c4295c21aa816a0f2d7b", // 申请好的Web端开发者Key，首次调用 load 时必填
  version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: {
    // 是否加载 AMapUI，缺省不加载
    version: "1.1", // AMapUI 缺省 1.1
    plugins: [], // 需要加载的 AMapUI ui插件
  },
  Loca: {
    // 是否加载 Loca， 缺省不加载
    version: "2.0", // Loca 版本，缺省 1.3.2
  },
});

export default AMap;
