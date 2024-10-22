export interface Itinerary {
  day: number;
  startTime: string;
  endTime: string;
  position: string[];
  positionDetail: number[][];
}

export interface ItineraryResponse {
  day: number;
  start_time: string;
  end_time: string;
  position: string[];
  position_detail: number[][];
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
