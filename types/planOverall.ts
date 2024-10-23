export type PositionDetail = [number, number];

export interface Itinerary {
  day: number;
  cost: number;
  startTime: string;
  endTime: string;
  position: string[];
  positionDetail: PositionDetail[];
}

export interface ItineraryResponse {
  day: number;
  cost: number;
  start_time: string;
  end_time: string;
  position: string[];
  position_detail: PositionDetail[];
}

export interface PlanOverall {
  peopleNumber: number;
  startCity: string;
  targetCity: string;
  start: string;
  end: string;
  itinerary: Itinerary[];
}

export interface PlanOverallResponse {
  data: {
    plan: {
      people_number: number;
      start_city: string;
      target_city: string;
      start: string;
      end: string;
      itinerary: ItineraryResponse[];
    };
  };
}
