import TaskService from "@/services/Task";
import { reactive } from "vue";
import type { FormType } from "@/utils/types";
import useUserStore from "@/stores/user";
import { storeToRefs } from "pinia";
interface Status {
  isLoading: boolean;
  message: string;
  code: number;
}

export const status = reactive({} as Status);

const useTask = () => {
  const taskApi = TaskService;
  const data = JSON.parse(localStorage.getItem("creds") as any)
  // const store = useUserStore();
  // const { getEmail } = storeToRefs(store);
  const getTasks = async (type?: string) => {
    status.isLoading = true;
    const task = await taskApi
      .getTasksApi()
      .then((response) => {
        const result = [];
        if (type === "Today") {
          const item = response.data
            .filter((item: any) => item.type === type)
            .filter((item: any) => item.author === data.email);
          result.push(...item);
          return result;
        } else if (type === "Work") {
          const item = response.data
            .filter((item: any) => item.type === type)
            .filter((item: any) => item.author === data.email);
          result.push(...item);
          return result;
        } else if (type === "Personal") {
          const item = response.data
            .filter((item: any) => item.type === type)
            .filter((item: any) => item.author === data.email);
          result.push(...item);
          return result;
        } else if (type === "all") {
            const item = response.data
            .filter((item: any) => item.completed === true)
            .filter((item: any) => item.author === data.email);
          result.push(...item);
          return result;
        } else {
          const item = response.data
            .filter((item: any) => item.author === data.email);
          result.push(...item);
          return result;
        }
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        status.isLoading = false;
      });
    return task;
  };

  const getTask = async (id: string) => {
    status.isLoading = true;
    const task = await taskApi
      .getTaskApi(id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        status.isLoading = false;
      });
    return task;
  };

  const postTask = async (formType: FormType) => {
    status.isLoading = true;
    const task = await taskApi
      .postTaskApi(formType)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        status.isLoading = false;
      });
    return task;
  };

  const putTask = async (id: string, formType: FormType) => {
    status.isLoading = true;
    const task = await taskApi
      .putTaskApi(id, formType)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        status.isLoading = false;
      });
    return task;
  };

  const delTask = async (id: string) => {
    status.isLoading = true;
    const task = await taskApi
      .delTaskApi(id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        status.isLoading = false;
      });
    return task;
  };

  return {
    getTask,
    getTasks,
    postTask,
    putTask,
    delTask,
    status,
  };
};

export default useTask;
