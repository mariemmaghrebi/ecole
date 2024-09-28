import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {
usersTab:any=[];
  constructor(private userService:UserService,private router:Router) { }
  path!:any;
  
  ngOnInit(): void {
    this.path = this.router.url;
    this.userService.getAllUsers().subscribe(
      (response)=>{
        for (let i=0;i<response.t.length;i++){
          if (response.t[i].role=='student'){
            this.usersTab.push(response.t[i]);
          }
        }
        
      }
    );
  }
  deleteUser(id: number) {
    this.userService.deleteUserById(id).subscribe(
      (response)=>{
        console.log('here response after delete match',response);
        this.userService.getAllUsers().subscribe(
          (data)=>{
            this.usersTab=data.t;
          }
        )
      }
      
    );

  }
  goToInfo(id:number){
    this.router.navigate([`userInfo/${id}`]);
      }
      goToEdit(id:number){
        this.router.navigate([`editUser/${id}`]);
    
      }

}
