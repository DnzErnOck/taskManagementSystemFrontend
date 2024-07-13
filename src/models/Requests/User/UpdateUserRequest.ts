export interface UpdateUserRequest {
    id: number;
    name: string;
    surname:string;
    email: string;
    password?: string;
  }