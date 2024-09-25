import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ActivityComponent } from './components/activity/activity.component';
import { ClassesComponent } from './components/classes/classes.component';
import { BlogComponent } from './components/blog/blog.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ActivityBlockComponent } from './components/activity-block/activity-block.component';
import { AboutComponent } from './components/about/about.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddCoursComponent } from './components/add-cours/add-cours.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeacherTableComponent } from './components/teacher-table/teacher-table.component';
import { CoursTableComponent } from './components/cours-table/cours-table.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import {HttpClientModule} from "@angular/common/http";
import { TeacherBlockComponent } from './components/teacher-block/teacher-block.component';
import { CoursBlockComponent } from './components/cours-block/cours-block.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ActivityComponent,
    ClassesComponent,
    BlogComponent,
    TeacherComponent,
    ActivityBlockComponent,
    AboutComponent,
    AboutPageComponent,
    LoginComponent,
    SignupComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
    AddStudentComponent,
    AddCoursComponent,
    SearchTeacherComponent,
    TeacherTableComponent,
    CoursTableComponent,
    StudentTableComponent,
    TeacherBlockComponent,
    CoursBlockComponent,
    StudentDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
