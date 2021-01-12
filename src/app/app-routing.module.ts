import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';

const routes: Routes = [
  {path : '' , component : HomeComponent},
  {path :'view-post/:id', component : ViewPostComponent},
  {path : 'list-subreddits', component : ListSubredditsComponent},
  {path : 'create-subreddit', component :  CreateSubredditComponent},
  {path : 'create-post', component : CreatePostComponent},
  { path: 'sign-up', component: SignUpComponent },
  {path : 'user-profile/:username', component : UserProfileComponent},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
