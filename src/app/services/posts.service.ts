import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post.model';
import { Subject } from 'rxjs';
import { AlertService } from './alert.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  postSubject = new Subject<Post[]>();
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) {}
  private posts: Post[] = [];
  urlAPI: string = 'http://localhost:3000/api/';
  emitPosts() {
    this.postSubject.next(this.posts.slice());
  }

  getLatestPosts() {
    this.httpClient.get<Post[]>(this.urlAPI + 'post/getLatest').subscribe(
      (posts) => {
        this.posts = posts;
        this.emitPosts();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  postToAPI(post: string, imagePost: File) {

    if (post == null && imagePost == null) {
      return this.alertService.error('Publication vide');
    }
    const postFormData = new FormData();

      postFormData.append('post', post);
      postFormData.append('image', imagePost);
      console.log(postFormData.get('image'));
    this.httpClient.post(this.urlAPI + 'post', postFormData).subscribe(
      () => {
        this.alertService.success('Le post a bien été publié');
      },
      (error) => {
        this.alertService.error(error.message);
      }
    );
  }

  postLike(postId: number) {
    const body = {};
    this.httpClient
      .post(this.urlAPI + 'post/' + postId + '/like', body)
      .subscribe(
        () => {
          this.alertService.success('Le post a bien été liké');
        },
        (error) => {
          this.alertService.error(error.message);
        }
      );
  }

  postComment(postId: number, content: Object) {
    this.httpClient
      .post(this.urlAPI + 'post/' + postId + '/comment', content)
      .subscribe(
        () => {
          this.alertService.success('Le commentaire a bien été publié');
        },
        (error) => {
          this.alertService.error(error.message);
        }
      );
  }

  updatePost(postId: number, content: Post) {
    this.httpClient.put(this.urlAPI + 'post/' + postId, content).subscribe({
      next: (data) => {
        this.alertService.success('La publication a bien été modifiée');
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

  deletePost(postId: number) {
    this.httpClient.delete(this.urlAPI + 'post/' + postId).subscribe({
      next: (data) => {
        this.alertService.success('La publication a bien été supprimée');
      },
      error: (error) => {
        this.alertService.error(error.message);
      },
    });
  }

  updateComment(commentId: number, content: string) {
    this.httpClient
      .put(this.urlAPI + 'post/comment/' + commentId, { content: content })
      .subscribe({
        next: (data) => {
          this.alertService.success('Le commentaire a bien été modifié');
        },
        error: (error) => {
          this.alertService.error(error.message);
        },
      });
  }

  deleteComment(commentId: number) {
    this.httpClient
      .delete(this.urlAPI + 'post/comment/' + commentId)
      .subscribe({
        next: (data) => {
          this.alertService.success('Le commentaire a bien été supprimé');
        },
        error: (error) => {
          this.alertService.error(error.message);
        },
      });
  }
}
