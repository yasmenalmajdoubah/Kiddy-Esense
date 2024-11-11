import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Like } from '../DTOs/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private client:HttpClient) { }

  
  

  toggleLike(postId: number, userId: string):Observable<any> {
   
  
    
    
      return this.client.post(`http://localhost/YasminApp/api/Like?postId=${postId}&userId=${userId}`,{}); 

    
  }
  
  getLikes(postId: number): Observable<any> {
    return this.client.get(`http://localhost/YasminApp/api/Like/GetAllLikeOnPost?postId=${postId}`);
  }

}
