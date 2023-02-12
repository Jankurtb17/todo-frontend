export interface TaskType {
  personal: string;
  work: string;
  today: string;
  week: string;
}

export interface FormType {
  title: string;
  description: string;
  startTime: string;
  author?: string;
  completed: boolean;
  type: TaskType;
}
