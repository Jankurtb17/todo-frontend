import http from "@/http-common"
import type { FormType } from "@/utils/types"

class TaskService{
  getTasksApi = (): Promise<any> => {
    return http.get('/');
  }

  getTaskApi = (_id: string): Promise<any> => {
    return http.get(`/${_id}`)
  }

  postTaskApi = (FormType: FormType): Promise<any> => {
    return http.post(`/`, FormType)
  }

  putTaskApi = (_id: string, FormType: FormType): Promise<any> => {
    return http.put(`/${_id}`, FormType)
  }

  delTaskApi = (_id: string): Promise<any> => {
    return http.delete(`/${_id}`)
  }

}

export default new TaskService();