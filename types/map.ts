import { PositionDetail } from "./planOverall";

export type DrivingPolicy =
  | "LEAST_TIME"
  | "LEAST_FEE"
  | "LEAST_DISTANCE"
  | "REAL_TRAFFIC";

export type Polyline = unknown;

export interface AMapInstance {
  plugin: (pluginName: string, callback: () => void) => void;
  DrivingPolicy: {
    LEAST_TIME: "LEAST_TIME";
    LEAST_FEE: "LEAST_FEE";
    LEAST_DISTANCE: "LEAST_DISTANCE";
    REAL_TRAFFIC: "REAL_TRAFFIC";
  };
  Driving: new (options: {
    map: MapInstance;
    showTraffic: boolean;
    policy: DrivingPolicy;
  }) => {
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
  Polyline: new (options: {
    path: PositionDetail[];
    borderWeight: number;
    strokeColor: string;
    lineJoin: string;
    strokeWeight: number;
    strokeOpacity: number;
    lineCap: string;
    isOutline: boolean;
    outlineColor: string;
  }) => Polyline;
}

export interface MapInstance {
  add: (polyline: Polyline) => void;
  destroy: () => void;
}
