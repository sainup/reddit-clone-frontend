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
  @Input() post$: Array<PostModel> = [];

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  goToPost(id: number) {

    this.router.navigateByUrl(`/view-post/${id}`);
  }

}
