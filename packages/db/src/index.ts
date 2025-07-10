import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

export type {
  ScheduleEvent,
  ScheduleEventStatus,
} from "@prisma/client";

export let prisma: PrismaClient;




if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    console.log("[PROD][DB] init success");
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
  prisma.scheduleEvent.findFirst().then((user) => {
    console.log(`[DB] User count: ${user}`);
  }).catch((err) => {
    console.log("[DEV][DB] init fail", err);
  })
}
