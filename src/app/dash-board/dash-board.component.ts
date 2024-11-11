import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  ngOnInit(): void {
    const storedUserInfo = localStorage.getItem('userInfo');
    this.user = storedUserInfo ? JSON.parse(storedUserInfo) : null; 
  }
  constructor(private router:Router){}
user!:any
logout(){
  localStorage.removeItem('userInfo')
  localStorage.removeItem('yasminAppSecurityKey')
  this.router.navigate(['/'])
}
}
