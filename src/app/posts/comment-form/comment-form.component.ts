import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.sass']
})
export class CommentFormComponent implements OnInit {
  commentForm!: FormGroup;
  @Input() postId!:number;

  constructor(    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }
  onSubmitCommentForm(id: number) {
    const formValue = this.commentForm.value;
    const newComment = {
      content: formValue['content'],
    };
    this.postsService.postComment(id, newComment);
    location.reload();
    this.alertService.success('Votre commentaire a bien été publié');
  }


}
