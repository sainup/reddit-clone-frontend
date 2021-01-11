import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditRequestPayload } from './subreddit-request.payload';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm : FormGroup;
  subredditRequestPayload : SubredditRequestPayload ;
  name = new FormControl('');
  description = new FormControl('');
  constructor(private subredditService : SubredditService,
    private toastr : ToastrService,
    private router : Router) {

      this.createSubredditForm = new FormGroup({
        name : new FormControl('', Validators.required),
        description : new FormControl('',Validators.required)
      });

      this.subredditRequestPayload ={
        name : '',
        description : '',
      }
     

     }

  ngOnInit(): void {

   
  }

  createSubreddit(){
    this.subredditRequestPayload.name = this.createSubredditForm.get('name').value;
    this.subredditRequestPayload.description = this.createSubredditForm.get('description').value;

    console.log("NAME : ", this.subredditRequestPayload.name);
    console.log("Description : ", this.subredditRequestPayload.description);

    this.subredditService.createSubreddit(this.subredditRequestPayload)
    .subscribe(data=>{
      console.log("Data : " ,data);
      this.router.navigateByUrl('/list-subreddits');
      this.toastr.success("Subreddit successfully created!")
    },error=>{
      this.toastr.error("Couldn't create Subreddit. Please try again");
      this.router.navigateByUrl('/create-subreddit');
      throwError(error);

    });
  }

  discard(){
    this.router.navigateByUrl('');
  }

}
