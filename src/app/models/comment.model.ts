import { User } from "./User.model";

export interface Comment{

  commentId:number;
  content:string;
  user:User;
}
