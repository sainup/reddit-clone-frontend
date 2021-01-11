import { Component, Input, OnInit } from '@angular/core';
import { SubredditModel } from '../../subreddit/subreddit-model';
import { SubredditService } from '../../subreddit/subreddit.service';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddit$ : Array<SubredditModel>  =  [];
  displayViewAll : boolean = false;
  @Input() data: Array<SubredditModel>;
  constructor(private subredditService : SubredditService) {
    this.getSubbredditData();
   
   
   }

  ngOnInit(): void {
  }

  async getSubbredditData(){
    const tempArray : Array<SubredditModel> = await this.subredditService.getAllSubreddits().toPromise();
    if(tempArray.length>2){
      this.displayViewAll = true;
      this.subreddit$ = tempArray.slice(0,3);
    }else{
      this.subreddit$ = tempArray;
    }
  }

  // handleSubreddit(){
  //   this.subredditService.getAllSubreddits().subscribe(subreddit =>{
      
  //     if(subreddit.length > 2){
  //       this.subreddit$ = subreddit.slice(0,3);
  //       this.displayViewAll = true;
       
  //     }else{
  //       this.subreddit$ = subreddit;
  //     }
  //     console.log(this.displayViewAll);
  //     console.log("Subreddit" , subreddit);

  //   });

  // }
  
}
