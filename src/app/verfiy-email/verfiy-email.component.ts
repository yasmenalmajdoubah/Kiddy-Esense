import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-verfiy-email',
  templateUrl: './verfiy-email.component.html',
  styleUrls: ['./verfiy-email.component.css']
})
export class VerfiyEmailComponent implements OnInit {

  @ViewChild('code') code!: ElementRef;
  vervicationCode!: string;
  emailUser!: any;
  activeUser!: any;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activeUser = this.activeRouter.snapshot.queryParams['user'];
  }

  verfiyUser(): void {
    this.vervicationCode = this.code.nativeElement.value;

    this.userService.getActiveUser(this.activeUser).subscribe({
      next: data => {
        this.emailUser = data;

        if (this.emailUser.confirmationCode == this.vervicationCode) {
          this.userService.updateVerficateUser(this.activeUser).subscribe({
            next: data => {
              this.router.navigate(['/login']);
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Wrong Verification Code',
            text: 'please, enter correct verfication code',
            confirmButtonText: 'Ok'
          });
        }
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'error happened when verfiy please try again >>',
          confirmButtonText: 'ok'
        });
      }
    });
  }
}
