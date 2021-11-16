import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  posts:any;
  loaded!: boolean;
  constructor(private postsService:PostsService)
  {
    this.loaded=false;
   }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts():void{
    this.loaded=false;
    this.postsService.getPosts('http://localhost:3000/api/post')
    .subscribe(
      posts=>{
        this.posts=posts;
        this.loaded=true;

      }

    )
  }
  resetPosts(): void {
    this.posts = null;
    this.loaded = true;
  }
}
