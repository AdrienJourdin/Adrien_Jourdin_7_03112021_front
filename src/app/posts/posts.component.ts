import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post.model';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
})
export class PostsComponent implements OnInit {



  posts: any[] = [];
  postSubscription!: Subscription;

  userIsAuthor: boolean = false;

  idPostToDelete:number=0;

  idCommentToDelete:number=0;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.postsService.postSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
    this.postsService.getLatestPosts();
    this.postsService.emitPosts();

  }

  likeSubmit(id: number) {
    this.postsService.postLike(id);
    location.reload();
  }




  //Gestion des bouton de suppression et de modification des publications
  loadButton(userId: number) {
    if(this.authService.currentUserValue.role==="admin"){
      return true;
    }
    else if (userId == this.authService.currentUserValue.userId) {
      return true;
    } else {
      return false;
    }
  }

  deletePost(postId:number) {
    if(this.idPostToDelete===postId){
      this.idPostToDelete=0;
    }else{
    this.idPostToDelete=postId;
    }
  }

  displayDeletePostButton(postId:number){

    if (this.idPostToDelete===postId){
      return true;
    }else{
      return false;
    }
  }

  deletePostConfirmation(postId: number) {
    this.postsService.deletePost(postId);
    location.reload();
  }



  //Gestion des bouton de suppression et de modification des commentaires



  deleteComment(commentId:number) {
    if(this.idCommentToDelete===commentId){
      this.idCommentToDelete=0;
    }else{
    this.idCommentToDelete=commentId;
    }
  }

  displayDeleteCommentButton(commentId:number){

    if (this.idCommentToDelete===commentId){
      return true;
    }else{
      return false;
    }
  }

  deleteCommentConfirmation(commentId: number) {
    this.postsService.deleteComment(commentId);
    location.reload();
  }





}
