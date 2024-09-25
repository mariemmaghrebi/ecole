import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  coursUrel:string="http://localhost:3000/courses";

  constructor(private httpClient:HttpClient) { }
  addCours(coursObj:any){
    return this.httpClient.post<{isAdded:boolean}>(this.coursUrel,coursObj);
  }
  deleteCoursById(id:any){
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.coursUrel}/${id}`);
  }
  getAllCourses(){
    return this.httpClient.get<{ t: any }>(this.coursUrel);
  }
  editCours(newCours:any){
    return this.httpClient.put<{msg:string}>(this.coursUrel,newCours);
  }
  getCoursById(id:any){
    return this.httpClient.get<{course:any}>(`${this.coursUrel}/${id}`);
  }
}
