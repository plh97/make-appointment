import Router from "koa-router";

import {
  AddScheduleEvent,
  DeleteScheduleEvent,
  GetScheduleEvents,
  PatchScheduleEvent,
} from "./scheduleEvent";

const router = new Router({ prefix: "/api" });

export default router
  // user
  .get("/schedule-event", GetScheduleEvents)
  .post("/schedule-event", AddScheduleEvent)
  .delete("/schedule-event", DeleteScheduleEvent)
  .patch("/schedule-event", PatchScheduleEvent)
