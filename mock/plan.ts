import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/get_plan",
    method: "get",
    response: () => ({
      plan: {
        people_number: 1,
        start_city: "北京",
        target_city: "南京",
        start: "北京首都国际机场",
        end: "北京南站",
        itinerary: [
          {
            day: 1,
            start_time: "07:16",
            end_time: "18:26",
            position: [
              "南京禄口国际机场",
              "红山森林动物园",
              "鲤院(夫子庙店)",
              "南京总统府",
              "鸡鸣寺",
              "民国红公馆(老门东店)",
              "南京金陵饭店",
            ],
            position_detail: [
              [118.868682, 31.729022],
              [118.799321, 32.087151],
              [118.788606, 32.019194],
              [118.794592, 32.039616],
              [118.79245, 32.056213],
              [118.79293, 32.039572],
              [118.780089, 32.037901],
            ],
          },
          {
            day: 2,
            start_time: "07:16",
            end_time: "18:26",
            position: [
              "南京金陵饭店",
              "南京博物院",
              "新街口-地铁站",
              "玄武湖景区",
              "三品堂精致淮洋菜(玄武湖店)",
              "老门东历史街区",
              "蓋有记(老门东店)",
              "南京南站",
            ],
            position_detail: [
              [118.780089, 32.037901],
              [118.822805, 32.037354],
              [118.781286, 32.041051],
              [118.796885, 32.065269],
              [118.8056, 32.067502],
              [118.785587, 32.009223],
              [118.785555, 32.009187],
              [118.797159, 31.962088],
            ],
          },
        ],
      },
    }),
  },
  {
    url: "/get_plan_detail",
    method: "get",
    response: () => ({
      plan: {
        intercity_transport_start: {
          start_time: "07:16",
          end_time: "08:23",
          start: "北京首都国际机场",
          end: "南京禄口国际机场",
          FlightID: "FL159",
          type: "airplane",
          transports: [],
          cost: 448.38,
          tickets: 1,
        },
        activities: [
          {
            trans_time: 45,
            trans_distance: 1,
            trans_cost: 4,
            trans_type: "walk",
            trans_detail: [
              {
                start: "南京禄口国际机场",
                end: "禄口机场-地铁站",
                mode: "walk",
                start_time: "08:23",
                end_time: "08:26",
                cost: 0,
                distance: 0.27,
              },
              {
                start: "禄口机场-地铁站",
                end: "迈皋桥-地铁站",
                mode: "metro",
                start_time: "08:26",
                end_time: "09:49",
                cost: 8,
                distance: 41.74,
                tickets: 1,
              },
              {
                start: "迈皋桥-地铁站",
                end: "红山森林动物园",
                mode: "walk",
                start_time: "09:49",
                end_time: "09:55",
                cost: 0,
                distance: 0.53,
              },
            ],
            position: "红山森林动物园",
            type: "attraction",
            cost: 39.0,
            tickets: 1,
            start_time: "10:00",
            end_time: "11:30",
            food_list: [],
          },
          {
            trans_time: 45,
            trans_distance: 1,
            trans_cost: 4,
            trans_type: "walk",
            trans_detail: [
              {
                start: "南京禄口国际机场",
                end: "禄口机场-地铁站",
                mode: "walk",
                start_time: "08:23",
                end_time: "08:26",
                cost: 0,
                distance: 0.27,
              },
              {
                start: "禄口机场-地铁站",
                end: "迈皋桥-地铁站",
                mode: "metro",
                start_time: "08:26",
                end_time: "09:49",
                cost: 8,
                distance: 41.74,
                tickets: 1,
              },
              {
                start: "迈皋桥-地铁站",
                end: "红山森林动物园",
                mode: "walk",
                start_time: "09:49",
                end_time: "09:55",
                cost: 0,
                distance: 0.53,
              },
            ],
            position: "红山森林动物园",
            type: "attraction",
            cost: 39.0,
            tickets: 1,
            start_time: "10:00",
            end_time: "11:30",
            food_list: [],
          },
        ],
        position_detail: [
          [118.868682, 31.729022],
          [118.799321, 32.087151],
          [118.788606, 32.019194],
          [118.794592, 32.039616],
          [118.79245, 32.056213],
          [118.79293, 32.039572],
          [118.780089, 32.037901],
        ],
        target_city: "南京",
      },
    }),
  },
] as MockMethod[];
