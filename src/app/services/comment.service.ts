import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../DTOs/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private client:HttpClient) { }

  createComment(comment: any): Observable<any> {
    debugger
    return this.client.post('http://localhost/YasminApp/api/Comment/createComment', comment);
  }

}
