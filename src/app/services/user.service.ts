import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../DTOs/user';
import { SignIn } from '../DTOs/signIn';
import { updateProfile } from '../DTOs/updateProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private client:HttpClient) {

   }
   getActiveUser(username: string): Observable<any> {
    
    return this.client.get('http://localhost/YasminApp/api/Account/finduser', { params: { username } });
}
register(newUser: any): Observable<any> {
  debugger
  return this.client.post('http://localhost/YasminApp/api/Account/SignUp', newUser);
}
getUserById(userId: string): Observable<any> {
  return this.client.get(`http://localhost/YasminApp/api/Account/${userId}`);
}

logIn (signIn:SignIn):Observable<any>{
  debugger
  return this.client.post('http://localhost/YasminApp/api/Account/Login',signIn)
}
updateProfile(newInfo:updateProfile ,userId:string):Observable<any>{
  debugger
  return this.client.put(`http://localhost/YasminApp/api/Account/updateProfile?id=${userId}`,
    newInfo
  )


  
}

updateVerficateUser(username:string):Observable<any>{
  debugger
return this.client.put(`http://localhost/YasminApp/api/Account/updateVerficate?username=${username}`,{});
}
}
