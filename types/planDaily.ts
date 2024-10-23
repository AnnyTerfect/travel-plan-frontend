export interface TransDetail {
  start: string;
  end: string;
  mode: string;
  startTime: string;
  endTime: string;
  cost: number;
  distance: number;
  tickets?: number;
}

export interface TransDetailResponse {
  start: string;
  end: string;
  mode: string;
  start_time: string;
  end_time: string;
  cost: number;
  distance: number;
  tickets?: number;
}

export type ActivityType =
  | "attraction"
  | "accommodation"
  | "breakfast"
  | "lunch"
  | "dinner";

export interface Activity {
  transTime: number;
  transDistance: number;
  transCost: number;
  transType: string;
  transDetail: TransDetail[];
  position: string;
  picture: string;
  type: ActivityType;
  cost: number;
  tickets: number;
  startTime: string;
  endTime: string;
  foodList: string[];
}

export interface ActivityResponse {
  trans_time: number;
  trans_distance: number;
  trans_cost: number;
  trans_type: string;
  trans_detail: TransDetailResponse[];
  position: string;
  picture: string;
  type: ActivityType;
  cost: number;
  tickets: number;
  start_time: string;
  end_time: string;
  food_list: string[];
}

export interface IntercityTransport {
  type: string;
  start: string;
  end: string;
  trainId?: string;
  flightId?: string;
  startTime: string;
  endTime: string;
  tickets: number;
  cost: number;
}

export interface IntercityTransportResponse {
  type: string;
  start: string;
  end: string;
  TrainID?: string;
  FlightID?: string;
  start_time: string;
  end_time: string;
  tickets: number;
  cost: number;
}

export interface PlanDaily {
  intercityTransportStart?: IntercityTransport;
  intercityTransportEnd?: IntercityTransport;
  activities: Activity[];
  positionDetail: [number, number][];
  targetCity: string;
}

export interface PlanDailyResponse {
  data: {
    plan: {
      intercity_transport_start?: IntercityTransportResponse;
      intercity_transport_end?: IntercityTransportResponse;
      activities: ActivityResponse[];
      position_detail: [number, number][];
      target_city: string;
    };
  };
}
