import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass'],
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  imagePost?:string;

  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.postForm = this.formBuilder.group({
      content: [null],
      imagePost: [null],
    });
  }

  onSubmitPostForm() {
    const content=this.postForm.get('content')?.value;
    const imagePost = this.postForm.get('imagePost')?.value;

    this.postsService.postToAPI(content,imagePost);
    location.reload();
  }

  showImage(event: any) {
    const file = event.target.files[0];

    this.postForm.patchValue({
      imagePost: file
    });
    this.postForm.get('imagePost')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePost = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
