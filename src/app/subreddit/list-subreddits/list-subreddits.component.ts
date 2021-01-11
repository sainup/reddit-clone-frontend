import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/subreddit/subreddit-model';
import { SubredditService } from 'src/app/subreddit/subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subreddit$ : Array<SubredditModel> = [];

  constructor(private subredditService : SubredditService) { 

    this.subredditService.getAllSubreddits().subscribe(subreddit=>{
      this.subreddit$ = subreddit;
    })
  }

  ngOnInit(): void {
  }

}
