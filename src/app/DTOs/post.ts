import { Like } from "./like";
import { User } from "./user";
import { Comment } from "./comment";

export class Post {
    postId!: number;
    contentText!: string;
    contentImage!: string | null;
    createdAt!: Date;
    userId!: string;
    user!: User; 
    comments!: Comment[]; 
    like!: Like[]; 
  }
  