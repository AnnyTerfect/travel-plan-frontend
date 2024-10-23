import { STROKE_COLOR_LIST } from "@/constants";
import AMapLoader from "@amap/amap-jsapi-loader";
import type { AMapInstance, MapInstance, PositionDetail } from "types";

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

const aMap: AMapInstance = await AMapLoader.load({
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

export function planRoute(
  map: MapInstance,
  locations: PositionDetail[],
  index: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    aMap.plugin("AMap.Driving", () => {
      const driving = new aMap.Driving({
        map,
        showTraffic: false,
        policy: aMap.DrivingPolicy.LEAST_TIME,
      });

      driving.search(
        locations[0],
        locations[locations.length - 1],
        {
          waypoints: locations.slice(1, locations.length - 1),
          showTraffic: false,
          extensions: "base",
        },
        (
          status: string,
          result: { routes: { steps: { path: [number, number][] }[] }[] },
        ) => {
          if (status === "complete") {
            const path = result.routes[0].steps.flatMap(step => step.path);
            const polyline = new aMap.Polyline({
              path: path,
              borderWeight: 1,
              strokeColor: STROKE_COLOR_LIST[index % STROKE_COLOR_LIST.length],
              lineJoin: "round",
              strokeWeight: 3,
              strokeOpacity: 0.8,
              lineCap: "round",
              isOutline: true,
              outlineColor: "#ffffff",
            });
            map.add(polyline);
            resolve();
          } else {
            reject(
              new Error(`路线规划失败\nstatus: ${status}\nresult: ${result}`),
            );
          }
        },
      );
    });
  });
}

export function getCityPosition(city: string): Promise<PositionDetail> {
  return new Promise((resolve, reject) => {
    aMap.plugin("AMap.Geocoder", () => {
      const geocoder = new aMap.Geocoder();

      geocoder.getLocation(
        city,
        (
          status: string,
          result: {
            geocodes: { location: { lng: number; lat: number } }[];
          },
        ) => {
          if (status === "complete" && result.geocodes.length) {
            const location = result.geocodes[0].location;
            resolve([location.lng, location.lat]);
          } else {
            reject(new Error("获取城市坐标失败"));
          }
        },
      );
    });
  });
}

export default aMap;
