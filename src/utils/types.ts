export interface TaskType {
  personal: string;
  work: string;
  today: string;
  week: string;
}

export interface FormType {
  _id?: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: TaskType;
  author?: string;
  completed: boolean;
  createdAt?: string;
}
