import { User } from "./user";

export class Comment {
  
    user?: User; 
  content!: string;
  userId!: string;
  postId!: number
}
