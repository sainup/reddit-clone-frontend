import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostRequestPayLoad } from '../post/create-post/post-request-payload';
import { PostModel } from './post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  private postUrl = 'http://localhost:8080/api/posts/';

  constructor(private http:HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>>{
    console.log("INSIDE getAllPosts")
    return this.http.get<Array<PostModel>>(this.postUrl);
  }

  createPost(postRequestPayload: PostRequestPayLoad) :Observable<PostRequestPayLoad> {

    return this.http.post<PostRequestPayLoad>(
      this.postUrl,
      postRequestPayload).pipe(catchError(this.handleError));
    
  }
}
