import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUel:string="http://localhost:3000/users";

  constructor( private httpClient:HttpClient) { }
  addUser(teamObj:any,file:any){
    return this.httpClient.post<{isAdded:boolean,msg:string}>(this.userUel,teamObj);
  }
  deleteUserById(id:any){
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.userUel}/${id}`);
  }
  getAllUsers(){
    return this.httpClient.get<{t: any}>(this.userUel);
  }
  editUser(newTeamObj:any){
    return this.httpClient.put<{msg:String}>(this.userUel,newTeamObj);
  }
  getUserById(id:any){
    return this.httpClient.get<{user:any}>(`${this.userUel}/${id}`);
  }
}
