import { User } from "./User.model";
export interface Like{

  likeId:number;
  date:string;
  userId:number;
  postId:number;
  user:User;


}
