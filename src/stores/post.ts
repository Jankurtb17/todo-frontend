import { defineStore } from "pinia";
import useTask from "@/composables/task";
import type { FormType, TaskType } from "@/utils/types"
const { getTasks } = useTask();
const usePost = defineStore('post', {
  state: () => ({
    post: [] as FormType[]
  }),
  actions: {
    async getTask(type: string) {
      const data: any = await getTasks(type)
      this.post.push(...data)
      return this.post;
    },
  },
  getters: {
    task(type): Array<any> {
      return this.post.filter((item: any) => item.completed !== true).filter((val: any) => val.type === type)
    },
    taskDone(type): Array<any> {
      return this.post.filter((item: any) => item.completed === true).filter((val: any) => val.type === type)
    },
  }
})

export default usePost;