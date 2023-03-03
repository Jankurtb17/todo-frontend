import useTask from "@/composables/task";
import { ref } from "vue";

const task = () => {
  const { getTasks } = useTask();

  const todayTask = async () => {
    const today = await getTasks("today")
    const getCompleted = today.filter((item) => item.completed === true).length
    const notCompleted = today.filter((item) => item.completed !== true).length
    
  }

  return {
    
  }
}

export default task();