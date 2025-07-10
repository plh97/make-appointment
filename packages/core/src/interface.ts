import type {
  ScheduleEvent
} from "db";
import { WebSocket, WebSocketServer } from "ws";
import { WS_EVENT } from "./constants";

export type CB = (...arg: unknown[]) => void;

export type IOnMsgReceive = (
  msg: IWsData,
  ws: WebSocketServer,
  socket?: WebSocket,
) => Promise<void>;

export type CHANNEL_TYPE = `room:${string}` | `userinfo:${string}`;

export interface ITextMessage {
  text: string;
  mention: string[];
}

export interface IWsData<T = any> {
  event: WS_EVENT;
  data: T;
  requestId: string;
  message: string;
  code: number;
}
