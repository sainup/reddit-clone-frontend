import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean = false;
  username : string ;
  constructor(private authService : AuthService,
    private router : Router) { 
    
   
  }

  ngOnInit(): void {

    this.authService.loggedIn.subscribe((data : boolean)=> this.isLoggedIn = data);
    this.authService.username.subscribe((data:string) => this.username = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    console.log("Is logged in : " , this.isLoggedIn);
  }

  goToUserProfile(){
    this.router.navigateByUrl('/user-profile/'+this.username);
  }

  logout(){
    this.authService.logOut();
    this.router.navigateByUrl('').then(()=>{
      window.location.reload();
    })
    
  }
}
