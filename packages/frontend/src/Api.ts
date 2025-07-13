import { AxiosError, AxiosRequestConfig } from "axios";
import { ScheduleEvent } from "backend";

const { toast } = createStandaloneToast();

export const axios = Axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true,
});

export interface IResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code === 1) {
      if (response.config?.fetchOptions?.alert !== false) {
        toast({
          description: res.message ?? "Backend throw unexpected error.",
          status: "error",
          position: "top",
          duration: 1000,
        });
      }
    } else if (res.code === 0) {
      res.message &&
        toast({
          description: res.message,
          status: "success",
          position: "top",
          duration: 1000,
        });
    }
    return res;
  },
  async (error: AxiosError) => {
    if (error.config?.fetchOptions?.alert !== false) {
      toast({
        description: error.message ?? "Unexpected network error.",
        status: "error",
        position: "top",
        duration: 1000,
      });
    }
    return Promise.reject(error);
  }
);

export async function request<RESPONSE>(
  config: AxiosRequestConfig
): Promise<RESPONSE> {
  const res = await axios.request<RESPONSE>(config);

  return res.data;
}

const Api = {
  getScheduleEvents: () =>
    request<ScheduleEvent[]>({
      url: "/schedule-event",
      method: "get",
    }),
  addScheduleEvents: (data: Omit<ScheduleEvent, "id">) =>
    request<ScheduleEvent>({
      url: "/schedule-event",
      method: "post",
      data,
    }),
  deleteScheduleEvents: (id: string) =>
    request<ScheduleEvent>({
      url: "/schedule-event",
      method: "delete",
      params: {
        id,
      },
    }),
  updateScheduleEvents: (data: Partial<ScheduleEvent> & { id: string }) =>
    request<ScheduleEvent>({
      url: "/schedule-event",
      method: "patch",
      data,
    }),
};

export default Api;
