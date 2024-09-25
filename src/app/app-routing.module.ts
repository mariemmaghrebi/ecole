import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ClassesComponent } from './components/classes/classes.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signupTeacher',component:SignupComponent},
  {path:'signupParent',component:SignupComponent},
  {path:'signupStudent',component:SignupComponent},
  {path:'dashboardTeacher',component:DashboardTeacherComponent},
  {path:'dashboardAdmin',component:DashboardTeacherComponent},
  {path:'dashboardStudent',component:StudentDashboardComponent},
  {path:'addStudent',component:AddStudentComponent},
  {path:'addCours',component:AddCoursComponent},
  {path:'searchTeacher',component:SearchTeacherComponent},
  {path:'teachers',component:TeacherComponent},
  {path:'courses',component:ClassesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
