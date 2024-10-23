import AMapLoader from "@amap/amap-jsapi-loader";
import type { AMapInstance, MapInstance, PositionDetail, Route } from "types";

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
): Promise<void> {
  return new Promise((resolve, reject) => {
    map.clearMap();

    aMap.plugin("AMap.Driving", () => {
      const drivingOption = {
        showTraffic: false,
        policy: aMap.DrivingPolicy.LEAST_TIME,
      };

      // 构造路线导航类
      const driving = new aMap.Driving(drivingOption);

      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        locations[0],
        locations[locations.length - 1],
        {
          waypoints: locations.slice(1, locations.length - 1),
          showTraffic: false,
          extensions: "base",
        },
        function (status, result) {
          // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              drawRoute(result.routes[0]);
              resolve();
            }
          } else {
            reject(new Error("获取驾车数据失败：" + result));
          }
        },
      );

      function drawRoute(route: Route) {
        const path = parseRouteToPath(route);

        const startMarker = new aMap.Marker({
          position: path[0],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          map,
        });

        const centerMarkers = locations.slice(1, locations.length - 1).map(
          position =>
            new aMap.Marker({
              position,
              icon: "https://webapi.amap.com/theme/v1.3/markers/n/mid.png",
              map,
            }),
        );

        const endMarker = new aMap.Marker({
          position: path[path.length - 1],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          map,
        });

        const routeLine = new aMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeOpacity: 0.9,
          strokeColor: "#0091ff",
          lineJoin: "round",
          lineCap: "round",
        });

        map.add(routeLine);

        // 调整视野达到最佳显示区域
        map.setFitView([startMarker, ...centerMarkers, endMarker, routeLine]);
      }

      // 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
      function parseRouteToPath(route: Route) {
        const path = [];

        for (let i = 0, l = route.steps.length; i < l; i++) {
          const step = route.steps[i];

          for (let j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j]);
          }
        }

        return path;
      }
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
