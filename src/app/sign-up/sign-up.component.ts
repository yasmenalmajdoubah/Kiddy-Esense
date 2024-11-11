import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      dob: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });  
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all required fields correctly.',
      });
      return;
    }

    const newUser = {
      userName: this.registerForm.value.userName,  
      FirstName: this.registerForm.value.firstName,
      LastName: this.registerForm.value.lastName,
      Gender: this.registerForm.value.gender,
      Password: this.registerForm.value.password,
      ConfirmPassword: this.registerForm.value.confirmPassword,
      DOB: this.registerForm.value.dob,
    };

    this.userService.register(newUser).subscribe({
      next: data => {
        console.log('API Response:', data);
        if (data.message === 'User created successfully') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User registered successfully!',
          });
          this.router.navigate(['/verfiyEmail'], { queryParams: { user: newUser.userName } });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User registration failed!',
          });
        }
      },
      error: err => {
        console.error('Error Response:', err);
      }
    });
  }
}
