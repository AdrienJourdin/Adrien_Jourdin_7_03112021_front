import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-update-comment-form',
  templateUrl: './update-comment-form.component.html',
  styleUrls: ['./update-comment-form.component.sass'],
})
export class UpdateCommentFormComponent implements OnInit {
  idCommentToUpdate: number = 0;
  updateCommentForm!: FormGroup;
  @Input() postId!:number;
  @Input() commentId!: number;
  @Input() commentUserId!: number;

  ngOnInit(): void {
    this.updateCommentForm = this.formBuilder.group({
      content: [, Validators.required],
    });
  }
  constructor(
    private postsService: PostsService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  loadButton(userId: number) {
    if (this.authService.currentUserValue.role === 'admin') {
      return true;
    } else if (userId == this.authService.currentUserValue.userId) {
      return true;
    } else {
      return false;
    }
  }

  onSubmitUpdateCommentForm(commentId: number) {
    const formValue = this.updateCommentForm.value;

    const content = formValue.content;

    this.postsService.updateComment(commentId, content);
    location.reload();
  }

  updateComment(commentId: number) {
    if (this.idCommentToUpdate === commentId) {
      this.idCommentToUpdate = 0;
    } else {
      this.idCommentToUpdate = commentId;
    }
  }

  displayUpdateCommentButton(commentId: number) {
    if (this.idCommentToUpdate === commentId) {
      return true;
    } else {
      return false;
    }
  }
}
