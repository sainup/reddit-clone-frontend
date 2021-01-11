import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayLoad } from '../sign-up/signup-request.payload';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayLoad } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 @Output() loggedIn :EventEmitter<boolean> = new EventEmitter();
 @Output() username: EventEmitter<string> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayLoad): Observable<any> {
    const authUrl = 'http://localhost:8080/api/auth/'
    return this.httpClient.post(`${authUrl}signup`, signupRequestPayload, {
      responseType: 'text'
    });
  }


  login(loginRequestPayload: LoginRequestPayLoad): Observable<boolean> {
    const authUrl = 'http://localhost:8080/api/auth/';
    return this.httpClient.post<LoginResponse>(`${authUrl}login`, loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }

  isLoggedIn() : boolean {
   return this.getJwtToken() !== null;
  }

  refreshToken() {
    const authUrl = 'http://localhost:8080/api/auth/';
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }

    return this.httpClient.post<LoginResponse>(`${authUrl}refresh/token`,
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }))
  }


  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName(){
    return this.localStorage.retrieve('username');
  }

  getExpirationTime(){
    return this.localStorage.retrieve('expiresAt');
  }
}
