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
  updatePostForm!: FormGroup;
  updateCommentForm!: FormGroup;

  posts: any[] = [];
  postSubscription!: Subscription;

  userIsAuthor: boolean = false;
  idPostToUpdate:number=0;
  idPostToDelete:number=0;
  idCommentToUpdate:number=0;
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
    this.initForm();
  }

  likeSubmit(id: number) {
    this.postsService.postLike(id);
    location.reload();
  }

  initForm() {


    this.updatePostForm = this.formBuilder.group({
      title: [, Validators.required],
      content: [, Validators.required],
    });

    this.updateCommentForm = this.formBuilder.group({
      content: [, Validators.required],
    });
  }


  //Gestion des bouton de suppression et de modification des publications
  loadButton(userId: string) {
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

  updatePost(postId:number) {
    if(this.idPostToUpdate===postId){
      this.idPostToUpdate=0;
    }else{
    this.idPostToUpdate=postId;
    }
  }

  displayUpdatePostButton(postId:number){

    if (this.idPostToUpdate===postId){
      return true;
    }else{
      return false;
    }
  }

  onSubmitUpdatePostForm(postId: number) {
    const formValue = this.updatePostForm.value;
    const postUpdate = {
      title: formValue.title,
      content: formValue.content,
    };

    this.postsService.updatePost(postId, postUpdate);
    location.reload();
  }

  //Gestion des bouton de suppression et de modification des commentaires

  onSubmitUpdateCommentForm(commentId:number){
    const formValue = this.updateCommentForm.value;

      const content= formValue.content;

    this.postsService.updateComment(commentId, content);
    location.reload();
  }


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

  updateComment(commentId:number) {
    if(this.idCommentToUpdate===commentId){
      this.idCommentToUpdate=0;
    }else{
    this.idCommentToUpdate=commentId;
    }
  }

  displayUpdateCommentButton(commentId:number){

    if (this.idCommentToUpdate===commentId){
      return true;
    }else{
      return false;
    }
  }



}
