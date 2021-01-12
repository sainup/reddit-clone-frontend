import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommentModel } from './comment-model';
import { CommentPayload } from './comment-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl = 'http://localhost:8080/api/comments/';

  constructor(private http: HttpClient) { }
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

  getAllCommentsForPost(id: number): Observable<Array<CommentModel>> {

    return this.http.get<Array<CommentModel>>
      (`${this.commentUrl}by-post/${id}`)
      .pipe(catchError(this.handleError));

  }

  getAllCommentsForUser(username : string ) : Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>
    (`${this.commentUrl}by-user/${username}`);
  }

  createComment(commentPayload: CommentPayload): Observable<CommentPayload> {
    return this.http.post<CommentPayload>(this.commentUrl, commentPayload)
      .pipe(catchError(this.handleError));
  }

}
