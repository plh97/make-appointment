import { Context } from "koa";
import { ScheduleEventModel } from "@/model/scheduleEvent";
import { IScheduleEvent } from "@/interface";
import { WS_EVENT } from "core";
import { onMsgReceive } from "@/ws";

/**
 * get list
 * @param {*} ctx
 */
export async function GetScheduleEvents(ctx: Context) {
  const scheduleEvent = await ScheduleEventModel.findMany();
  ctx.body = {
    code: 0,
    data: scheduleEvent,
  };
}
/**
 * add
 *
 * @param {*} ctx
 */
export async function AddScheduleEvent(ctx: Context) {
  const info = ctx.request.body as IScheduleEvent;
  const res = await ScheduleEventModel.create({
    data: info,
  });
  onMsgReceive(
    {
      event: WS_EVENT.SEND_MSG,
      data: res,
      requestId: "",
      message: "",
      code: 0,
    },
    ctx.ws,
  );
  ctx.body = {
    code: 0,
    data: res,
  };
}

/**
 * delete
 *
 * @param {*} ctx
 */
export async function DeleteScheduleEvent(ctx: Context) {
  const info = ctx.request.query as { id: string };

  const res = await ScheduleEventModel.delete({
    where: { id: info.id },
  });
  onMsgReceive(
    {
      event: WS_EVENT.SEND_MSG,
      data: res,
      requestId: "",
      message: "",
      code: 0,
    },
    ctx.ws,
  );
  ctx.body = {
    code: 0,
    data: res,
  };
}

/**
 * patch
 *
 * @param {*} ctx
 */
export async function PatchScheduleEvent(ctx: Context) {
  const info = ctx.request.body;
  const res = await ScheduleEventModel.update({
    where: { id: info.id },
    data: info,
  });
  onMsgReceive(
    {
      event: WS_EVENT.SEND_MSG,
      data: res,
      requestId: "",
      message: "",
      code: 0,
    },
    ctx.ws,
  );
  ctx.body = {
    code: 0,
    data: res,
  };
}

// export async function Login(ctx: Context) {
//   if (!ctx.request.body) {
//     ctx.body = {
//       data: null,
//       code: 1,
//       message: "must provide username or password!",
//     };
//     return;
//   }
//   const { username, password } = ctx.request.body;
//   const userinfo = await UserModel.findUnique({
//     where: { username, password },
//   });
//   if (userinfo) {
//     const token = jwt.sign(String(userinfo.id), privateKey);
//     ctx.cookies.set("token", token, CookieConfig);
//     userinfo.password = "";
//     ctx.body = {
//       data: userinfo,
//       code: 0,
//       message: "login success",
//     };
//   } else {
//     ctx.body = {
//       code: 1,
//       message: "password or username wrong",
//     };
//   }
// }

// export async function Register(ctx: Context) {
//   if (!ctx.request.body) {
//     ctx.body = {
//       code: 1,
//       message: "must provide username or password!",
//     };
//     return;
//   }
//   const { username, password } = ctx.request.body;
//   const userInfo = await UserModel.findUnique({ where: { username } });
//   if (userInfo) {
//     ctx.body = {
//       code: 1,
//       message: "This account is already occupied!",
//     };
//   } else {
//     const userinfo = await UserModel.create({
//       data: {
//         username,
//         password,
//       },
//     });
//     const token = jwt.sign(String(userinfo.id), privateKey);
//     ctx.cookies.set("token", token, CookieConfig);
//     userinfo.password = "";
//     ctx.body = {
//       code: 0,
//       message: "Register account success",
//       data: userinfo,
//     };
//   }
// }

// export async function Logout(ctx: Context) {
//   ctx.cookies.set("token", null);
//   ctx.body = {
//     code: 0,
//     message: "Logout success",
//   };
// }

export default {
  // Login,
  // Logout,
  // Register,
  GetScheduleEvents,
  AddScheduleEvent,
};
