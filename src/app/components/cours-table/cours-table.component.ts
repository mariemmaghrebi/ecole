import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
  path!:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.path = this.router.url;
  }

}
