import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  
  private voteUrl = 'http://localhost:8080/api/votes/';
  constructor(private http : HttpClient) { }

  vote(votePayload: VotePayload) : Observable<VotePayload> {
    return this.http.post<VotePayload>(this.voteUrl,votePayload);
    
  }
}
