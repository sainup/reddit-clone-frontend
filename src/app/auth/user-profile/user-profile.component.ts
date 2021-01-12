import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentModel } from 'src/app/comment/comment-model';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  post$: Array<PostModel> = [];
  postLength: number;
  username: string;
  comment$: Array<CommentModel> = [];
  commentLength: number;

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService) {
    this.username = this.activatedRoute.snapshot.params.username;
  }


  ngOnInit(): void {
    this.getPostsByUser();
    this.getCommentsByUser();
  }

  getPostsByUser() {
    this.postService.getPostByUsername(this.username).subscribe(posts => {
      this.post$ = posts;
      this.postLength = posts.length;
    });
  }

  getCommentsByUser() {
    this.commentService.getAllCommentsForUser(this.username).subscribe(comments => {
      this.comment$ = comments;
      this.commentLength = comments.length;
    });
  }

}
