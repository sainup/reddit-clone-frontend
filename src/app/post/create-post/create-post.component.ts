import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/post/post.service';
import { PostRequestPayLoad } from '../view-post/post-request-payload';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  subreddit$ : Array<SubredditModel> = [];
  createPostForm : FormGroup;
  postRequestPayload : PostRequestPayLoad;
  TinyMce :string = 'iwd2sh0okxs49vcykicqzmv1wohvzro51u4psnfrs0ca7xj6';

  constructor(private postService : PostService,
    private subredditService : SubredditService,
    private toastr : ToastrService,
    private router : Router) { 
      
      this.subredditService.getAllSubreddits().subscribe(subreddit=>{
        this.subreddit$ = subreddit;
      })

      this.createPostForm = new FormGroup({
        postName : new FormControl('',Validators.required),
        subredditName  : new  FormControl('',Validators.required),
        url : new FormControl('', Validators.required),
        description : new FormControl ('', Validators.required)
      });

      this.postRequestPayload = {
        postName : '',
        subredditName : '',
        description : '',
        url : ''
      }
    }

  ngOnInit(): void {
  }

  createPost(){

    this.postRequestPayload.postName = this.createPostForm.get('postName').value;
    this.postRequestPayload.description = this.createPostForm.get('description').value;
    this.postRequestPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postRequestPayload.url = this.createPostForm.get('url').value;

    this.postService.createPost(this.postRequestPayload).subscribe(data=>{
      console.log("Data : " , data);
      this.router.navigateByUrl('/');
      this.toastr.success("Post has been successfully created.");
    },error =>{
      this.toastr.error("Couldn't create a post. Please try again later.");
      this.router.navigateByUrl('/create-post');
      throwError(error);
    })

  }

  discardPost(){
    this.router.navigateByUrl('/');
  }

}
