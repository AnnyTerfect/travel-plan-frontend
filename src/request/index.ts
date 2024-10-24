import axios from "axios";
import type {
  Activity,
  PlanDaily,
  PlanDailyResponse,
  PlanOverall,
  PlanOverallResponse,
} from "types";

export async function fetchPlanOverall(taskId: string): Promise<PlanOverall> {
  try {
    const response: PlanOverallResponse = await axios.get(
      import.meta.env.VITE_MOCK === "true"
        ? "/get_plan"
        : "http://210.28.135.197:8081/get_plan",
      {
        params: { task_id: taskId },
      },
    );

    const planOverallResponse = response.data.plan;
    const planOverall: PlanOverall = {
      peopleNumber: planOverallResponse.people_number,
      startCity: planOverallResponse.start_city,
      targetCity: planOverallResponse.target_city,
      start: planOverallResponse.start,
      end: planOverallResponse.end,
      itinerary: planOverallResponse.itinerary.map(it => ({
        day: it.day,
        cost: it.cost,
        startTime: it.start_time,
        endTime: it.end_time,
        position: it.position,
        positionDetail: it.position_detail,
      })),
    };

    return planOverall;
  } catch (error) {
    throw new Error(`Error fetching itinerary data: ${error}`);
  }
}

export async function fetchPlanDaily(
  taskId: string,
  day: number,
): Promise<PlanDaily> {
  try {
    const response: PlanDailyResponse = await axios.get(
      import.meta.env.VITE_MOCK === "true"
        ? "/get_plan_detail"
        : "http://210.28.135.197:8081/get_plan",
      {
        params: { task_id: taskId, day: day },
      },
    );

    const plan = response.data.plan;

    const intercityTransportStart = plan.intercity_transport_start
      ? {
          type: plan.intercity_transport_start.type,
          start: plan.intercity_transport_start.start,
          end: plan.intercity_transport_start.end,
          trainId: plan.intercity_transport_start.TrainID,
          flightId: plan.intercity_transport_start.FlightID,
          startTime: plan.intercity_transport_start.start_time,
          endTime: plan.intercity_transport_start.end_time,
          tickets: plan.intercity_transport_start.tickets,
          cost: plan.intercity_transport_start.cost,
        }
      : undefined;
    const intercityTransportEnd = plan.intercity_transport_end
      ? {
          type: plan.intercity_transport_end.type,
          start: plan.intercity_transport_end.start,
          end: plan.intercity_transport_end.end,
          trainId: plan.intercity_transport_end.TrainID,
          flightId: plan.intercity_transport_end.FlightID,
          startTime: plan.intercity_transport_end.start_time,
          endTime: plan.intercity_transport_end.end_time,
          tickets: plan.intercity_transport_end.tickets,
          cost: plan.intercity_transport_end.cost,
        }
      : undefined;
    const activities = plan.activities.map<Activity>(
      ({
        trans_time,
        trans_distance,
        trans_cost,
        trans_type,
        trans_detail,
        position,
        picture,
        type,
        cost,
        tickets,
        start_time,
        end_time,
        food_list,
      }) => ({
        transTime: trans_time,
        transDistance: trans_distance,
        transCost: trans_cost,
        transType: trans_type,
        transDetail: trans_detail?.map(
          ({
            start,
            end,
            mode,
            start_time,
            end_time,
            cost,
            distance,
            tickets,
          }) => ({
            start,
            end,
            mode,
            startTime: start_time,
            endTime: end_time,
            cost,
            distance,
            tickets,
          }),
        ),
        position,
        picture,
        type,
        cost,
        tickets,
        startTime: start_time,
        endTime: end_time,
        foodList: food_list,
      }),
    );
    const positionDetail = plan.position_detail;
    const targetCity = plan.target_city;

    return {
      intercityTransportStart,
      intercityTransportEnd,
      activities,
      positionDetail,
      targetCity,
    };
  } catch (error) {
    throw new Error(`Failed to load activities: ${error}`);
  }
}
