import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { CommentModel } from 'src/app/comment/comment-model';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/post/post-model';
import { PostService } from 'src/app/post/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  comment$ : Array<CommentModel> = [];
  commentForm : FormGroup;
  commentPayload : CommentPayload;
  post: PostModel;
  postId: number;
  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private toastr : ToastrService,
    private router: Router,
    private commentService : CommentService)
     {
       //getting id through params of activated route
    this.postId = this.activatedRoute.snapshot.params.id;

    //getting post with the id 
    this.postService.getPostById(this.postId).subscribe(data => {
      this.post = data;
      console.log(this.post.subredditName);
      console.log("Post==>", this.post);
    }, err => {
      throwError(err);
    });

    //getting comments 

    
   

 // initializing FormGroup
    this.commentForm = new FormGroup({

      text : new FormControl('', Validators.required)
      
    });

    //initializing CommentPayload
    this.commentPayload = { 
      postId : this.postId,
      text : ''
    }

    

  }

  ngOnInit(): void {
    this.getAllComments();
  }

  postComment(){
    this.commentPayload.text = this.commentForm.get('text').value;

    this.commentService.createComment(this.commentPayload).subscribe(data =>{
      this.commentForm.get('text').setValue('');
      this.getAllComments();
      this.toastr.success("Comment added.")
     
    }, error =>{
      this.commentForm.get('text').setValue('');
      this.toastr.error("Error Occured.");
      console.log("Error occuured while creating comments.");
    });

  }

  getAllComments(){
    this.commentService.getAllCommentsForPost(this.postId).subscribe(comments =>{
      this.comment$ = comments;
      console.log(this.comment$);
    },err=>{
      throwError(err);
    });
  }

}
