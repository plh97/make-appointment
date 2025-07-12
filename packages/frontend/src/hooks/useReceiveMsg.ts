import { IWsData, WS_EVENT } from "core";
import { IMessage } from "@/interfaces";

export const useReceiveMsg = (cb: Function) => {
  const onReceiveMsg = async (data?: IWsData<IMessage>) => {
    const msg = data?.data;
    if (!msg) return;
    cb(msg);
  };
  useEventListener(WS_EVENT.SEND_MSG, onReceiveMsg);
};
