import { Component, OnInit } from '@angular/core';
import { PostModel } from '../post/post-model';
import { PostService } from '../post/post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post$ : Array<PostModel> = [];


  constructor(private postService : PostService) {

    this.getAllPosts();
   
   }

  ngOnInit(): void {
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe(posts =>{
      this.post$ = posts;
    });
  }

}
