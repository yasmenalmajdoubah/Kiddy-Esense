import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from '../DTOs/signIn';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';     

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  constructor(private router: Router, private userService: UserService) { }

  user!: any;

  @ViewChild('name') name!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  goToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    var logInUser = new SignIn();
    logInUser.userName = this.name.nativeElement.value;
    logInUser.password = this.password.nativeElement.value;

    this.userService.logIn(logInUser).subscribe({
      next: response => {
        console.log(response);
        localStorage.setItem('yasminAppSecurityKey', response.token);

        this.userService.getActiveUser(this.name.nativeElement.value).subscribe({
          next: data => {
            this.user = data;
            localStorage.setItem('userInfo', JSON.stringify(this.user));
          },
          error: err => {
            console.error('Error loading user:', err);
          }
        });

        this.router.navigate(['/dashBoard/home'], { queryParams: { user: this.name.nativeElement.value } });
      },
      error: err => {
        console.error('Error login user:', err);
        
        Swal.fire({
          icon: 'error',
          title: 'error in logIn',
          text: 'Username Or Email is Wrong .. try again',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['/dashBoard/login'])
      }
    });
  }
}
