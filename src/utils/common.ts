import { ElMessage } from "element-plus";

export const message = (message: string, type: string) => {
  switch (type) {
    case "success":
      ElMessage({
        message: message,
        type: "success",
        duration: 3000,
      });
      break;
    case "warning":
      ElMessage({ 
        message: message,
        type: "warning",
        duration: 3000,
      });
      break;
    case "info":
      ElMessage({
        message: message,
        type: "info",
        duration: 3000,
      });
      break;
    case "error":
      ElMessage({
        message: message,
        type: "error",
        duration: 3000,
      });
      break;
    default:
      break;
  }
};

export const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
