import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  file!:any;
  path!:any;
  msg:string='';
  constructor(private formBuilder:FormBuilder,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.path = this.router.url;
    console.log('path',this.path);
    
    this.signupForm = this.formBuilder.group({
      tel: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      speciality: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }
  signup(){
    if (this.path == '/signupTeacher') { 
      this.signupForm.value.role = 'teacher'
    } else if(this.path == '/signupStudent') {
      this.signupForm.value.role = 'student'
    }
    else{
      this.signupForm.value.role = 'parent'

    }
    this.userService.addUser(this.signupForm.value,this.file).subscribe(
      (response) => {
        console.log('obj',this.signupForm.value);
        
        console.log('here response after adding user', response);
        if (response.isAdded == true) {
          this.router.navigate(['/']);
        } else {
          this.msg = 'Email exist';
        }



      }
    )
  }
  selectFile(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      
    }
  }

}
