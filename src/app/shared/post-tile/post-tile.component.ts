import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons'
import { PostModel } from '../../post/post-model';
import { PostService } from '../../post/post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;
  posts$: Array<PostModel> = [];
  @Input() data: Array<PostModel>;
  constructor(private postService: PostService,
    private router : Router) {
    this.postService.getAllPosts().subscribe(post => {
      console.log("INSIDE HOME COMPONENT START")
      this.posts$ = post;
      console.log(post);
    });
  }

  ngOnInit(): void {
  }

  goToPost(id : number){

    this.router.navigateByUrl(`/view-post/${id}`);
  }

}
