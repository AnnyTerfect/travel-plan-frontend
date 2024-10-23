import { PositionDetail } from "./planOverall";

export type DrivingPolicy =
  | "LEAST_TIME"
  | "LEAST_FEE"
  | "LEAST_DISTANCE"
  | "REAL_TRAFFIC";

export type Polyline = unknown;

export interface Route {
  steps: { path: [number, number][] }[];
}

export interface AMapInstance {
  plugin: (pluginName: string, callback: () => void) => void;
  DrivingPolicy: {
    LEAST_TIME: "LEAST_TIME";
    LEAST_FEE: "LEAST_FEE";
    LEAST_DISTANCE: "LEAST_DISTANCE";
    REAL_TRAFFIC: "REAL_TRAFFIC";
  };
  Driving: new (options: { showTraffic: boolean; policy: DrivingPolicy }) => {
    search: (
      start: PositionDetail,
      end: PositionDetail,
      options: {
        waypoints: PositionDetail[];
        showTraffic: boolean;
        extensions: string;
      },
      callback: (
        status: string,
        result: { routes: { steps: { path: PositionDetail[] }[] }[] },
      ) => void,
    ) => void;
  };
  Geocoder: new () => {
    getLocation: (
      city: string,
      callback: (
        status: string,
        result: { geocodes: { location: { lng: number; lat: number } }[] },
      ) => void,
    ) => void;
  };
  Map: new (
    container: string,
    options: { zoom: number; center: PositionDetail },
  ) => MapInstance;
  Marker: new (options: {
    position: PositionDetail;
    icon: string;
    map: MapInstance;
  }) => unknown;
  Polyline: new (options: {
    path: PositionDetail[];
    isOutline: boolean;
    outlineColor: string;
    borderWeight: number;
    strokeWeight: number;
    strokeOpacity: number;
    strokeColor: string;
    lineJoin: string;
    lineCap: string;
  }) => Polyline;
}

export interface MapInstance {
  add: (polyline: Polyline) => void;
  remove: (polyline: Polyline) => void;
  clearMap: () => void;
  destroy: () => void;
  setFitView: (args: unknown[]) => void;
}
