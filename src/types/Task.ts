export interface Task {
  id: number;
  title: string;
  description: string;
  userId: number;
  taskStatus: string;
  createdDate:Date;
}
