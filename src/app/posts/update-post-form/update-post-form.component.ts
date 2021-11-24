import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-update-post-form',
  templateUrl: './update-post-form.component.html',
  styleUrls: ['./update-post-form.component.sass']
})
export class UpdatePostFormComponent implements OnInit {

  @Input() postContent!:string;
  @Input() postId!:number;
  @Input() postUserId!:number;
  @Input() imagePost!:string;
  updatePostForm!: FormGroup;
  imageUpdatePost!:string;
  idPostToUpdate:number=0;
  constructor(    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.updatePostForm = this.formBuilder.group({
      content: [this.postContent, Validators.required],
      imageUpdatePost:[this.imagePost]
    });
  }
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

    const content=this.updatePostForm.get('content')?.value;
    const imageUpdatePost = this.updatePostForm.get('imageUpdatePost')?.value;


    this.postsService.updatePost(postId, content,imageUpdatePost);
    location.reload();
  }


  showUpdateImage(event: any) {
    const file = event.target.files[0];

    this.updatePostForm.patchValue({
      imageUpdatePost: file
    });
    this.updatePostForm.get('imageUpdatePost')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUpdatePost = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
