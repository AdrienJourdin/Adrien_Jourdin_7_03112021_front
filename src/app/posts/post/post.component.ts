import { Component,Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  @Input() postName!: string;
  @Input() postContent!: string;
  @Input() postLike!: number;
  @Input() postDate!: Date;
  @Input() index!:number;
  @Input() id!: number;
  constructor(private postService: PostsService) { }

  ngOnInit(): void {
  }

}
