export interface TaskType {
  personal: "personal";
  work: "work";
  today: "today";
}

export interface FormType {
  _id?: string;
  title: string;
  description: string;
  start: string;
  end: string;
  type: string;
  author: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
