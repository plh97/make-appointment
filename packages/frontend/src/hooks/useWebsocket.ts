import { SocketClient } from "core";
import { wsUrl } from "@/config";
import { ScheduleEvent } from "db";

export let ws: SocketClient;

export default function useWebsocket(cb = (data: ScheduleEvent) => { }, disconnect = () => { }, reconnect = () => { }) {
  if (
    !ws?.socket ||
    ws?.socket?.readyState === WebSocket.CLOSED ||
    ws?.socket?.readyState === WebSocket.CLOSING
  ) {
    ws = new SocketClient({ url: wsUrl });
  }
  useReceiveMsg(cb);
  useReconnect(ws, disconnect, reconnect);
}
