import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from '../DTOs/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private client:HttpClient) { }

  loadAllPost():Observable <any>{
   debugger
    return this.client.get('http://localhost/YasminApp/api/Post/GetAllPost')
   }
   

   createPost(post: Post): Observable<any> {
    debugger
   return this.client.post('http://localhost/YasminApp/api/Post',post)

  }

  loadPostByUserId(userId:string):Observable<any>{
    return this.client.get(`http://localhost/YasminApp/api/Post/GetAllPostByUserId?userId=${userId}`)
  }
}

