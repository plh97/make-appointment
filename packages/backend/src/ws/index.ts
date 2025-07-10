import { IOnMsgReceive, IWsData, WS_EVENT } from "core";
import { IScheduleEvent } from "@/interface";

export const onMsgReceive: IOnMsgReceive = async (
  objMsg: IWsData<IScheduleEvent>,
  ws,
  socket
) => {
  const { event } = objMsg;
  let broadcastData: Partial<IWsData<unknown>> = {};
  if (event === WS_EVENT.SEND_MSG) {
    broadcastData = objMsg;
  }
  if (broadcastData.code !== 0) {
    // error
    socket?.send(
      JSON.stringify({
        event,
        requestId: objMsg.requestId,
        ...broadcastData,
      })
    );
    return;
  }
  ws.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        code: 0,
        event,
        requestId: objMsg.requestId,
        ...broadcastData,
      })
    );
  });
};
