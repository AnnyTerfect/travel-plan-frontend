export interface IntercityTransport {
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

export interface Itinerary {
  day: number;
  start_time: string;
  end_time: string;
  position: string[];
  position_detail: number[][];
}

export interface Trans {
  start: string;
  end: string;
  mode: string;
  start_time: string;
  end_time: string;
  cost: number;
  distance: number;
  tickets?: number;
}

export interface Activity {
  trans_time: number;
  trans_distance: number;
  trans_cost: number;
  trans_type: string;
  trans_detail: Trans[];
  position: string;
  picture: string;
  type: "attraction" | "accommodation" | "breakfast" | "lunch" | "dinner";
  cost: number;
  tickets: number;
  start_time: string;
  end_time: string;
  food_list: string[];
}

export interface Plan {
  people_number: number;
  start_city: string;
  target_city: string;
  start: string;
  end: string;
  itinerary: Itinerary[];
}

export interface PlanResponse {
  data: { plan: Plan };
}

export interface PlanDetail {
  intercity_transport_start?: IntercityTransport;
  intercity_transport_end?: IntercityTransport;
  activities: Activity[];
  position_detail: [number, number][];
  target_city: string;
}

export interface PlanDetailResponse {
  data: { plan: PlanDetail };
}
