import type { PositionDetail } from "./planOverall";

export type DrivingPolicy =
  | "LEAST_TIME"
  | "LEAST_FEE"
  | "LEAST_DISTANCE"
  | "REAL_TRAFFIC";

export type Polyline = unknown;

export declare class InfoWindow {
  constructor(options: { content: string; offset: Pixel });
  open: (map: MapInstance, position: PositionDetail) => void;
}

export declare class Marker {
  constructor(options: {
    position: PositionDetail;
    icon: string;
    map: MapInstance;
  });
  on: (event: string, callback: () => void) => void;
  getPosition: () => PositionDetail;
}
export interface Route {
  steps: { path: [number, number][] }[];
}

export type Pixel = unknown;
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
  InfoWindow: typeof InfoWindow;
  Map: new (
    container: string,
    options: { zoom: number; center: PositionDetail },
  ) => MapInstance;
  Marker: typeof Marker;
  Pixel: new (x: number, y: number) => Pixel;
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
  setCenter: (position: PositionDetail) => void;
  setZoomAndCenter: (zoom: number, position: PositionDetail) => void;
  setFitView: (args: unknown[]) => void;
}
