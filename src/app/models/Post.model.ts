import { Like } from "./like.model";
import { Comment } from "./comment.model";
import { User } from "./User.model";

export interface Post{

title:string;
content:string;
postId?:number;
user?:User;
comments?:Array<Comment>;
likes?:Array<Like>;

}
