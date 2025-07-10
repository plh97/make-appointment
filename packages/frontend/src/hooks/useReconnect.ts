import { SocketClient, WS_EVENT } from "core";

export const useReconnect = (ws: SocketClient, disconnect, reconnect) => {
    const toast = useToast();
    const onReconnect = (data) => {
        toast.closeAll();
        toast({
            duration: 1000,
            title: "WS ReConnect",
            status: "success",
            position: "top",
        });
        disconnect(data);
    };
    const onError = (data) => {
        toast.closeAll();
        toast({
            isClosable: true,
            status: "error",
            duration: 99999999999,
            position: "top",
            title: "WS Disconnect",
        });
        reconnect(data);
    };
    useEventListener(WS_EVENT.RECONNECT, onReconnect);
    useEventListener(WS_EVENT.DISCONNECT, onError);
};
