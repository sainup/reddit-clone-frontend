import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { SubredditRequestPayload } from './create-subreddit/subreddit-request.payload';
import { PostModel } from '../post/post-model';
import { SubredditModel } from './subreddit-model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private subredditUrl = 'http://localhost:8080/api/subreddit';


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

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(this.subredditUrl);
  }


  createSubreddit(subredditRequestPayLoad: SubredditRequestPayload): Observable<SubredditRequestPayload> {
    return this.http.post<SubredditRequestPayload>(
      this.subredditUrl,
      subredditRequestPayLoad)
      .pipe(
        catchError(this.handleError));
  }

}
