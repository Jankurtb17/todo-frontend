export interface TaskType {
  personal: string;
  work: string;
  today: string;
  week: string;
}

export interface FormType {
  title: string;
  description: string;
  start: string;
  type: TaskType;
  author?: string;
  completed: boolean;
}
