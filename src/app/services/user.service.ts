import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl:string="http://localhost:3000/users";

  constructor( private httpClient:HttpClient) { }
  addUser(userObj:any,upload:File){
    let fData=new  FormData();
    fData.append('firstName',userObj.firstName);
    fData.append('lastName',userObj.lastName);
    fData.append('email',userObj.email);
    fData.append('tel',userObj.tel);
    fData.append('password',userObj.password);
    fData.append('adress',userObj.adress);
    fData.append('speciality',userObj.speciality);
    fData.append('studentTel',userObj.studentTel);
    fData.append('role',userObj.role);
    fData.append('img',upload);
   return this.httpClient.post<{isAdded:boolean,msg:string}>(this.userUrl,fData);
  }  
  deleteUserById(id:any){
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.userUrl}/${id}`);
  }
  getAllUsers(){
    return this.httpClient.get<{t: any}>(this.userUrl);
  }
  editUser(newTeamObj:any){
    return this.httpClient.put<{msg:String}>(this.userUrl,newTeamObj);
  }
  getUserById(id:any){
    return this.httpClient.get<{user:any}>(`${this.userUrl}/${id}`);
  }
   // userObj={tel,pwd}
   loginUser(userObj:any){
    return this.httpClient.post<{passwordCheck:boolean,msg:string,user:any}>(this.userUrl+'/login',userObj);
  }
}
