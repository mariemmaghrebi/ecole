import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  searchForm!:FormGroup;
  searchTeacher:any={};
  constructor() { }

  ngOnInit(): void {
  }
  search(){}

}
