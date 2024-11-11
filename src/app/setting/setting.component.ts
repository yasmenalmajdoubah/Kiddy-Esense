import { Component, OnInit } from '@angular/core';
import { updateProfile } from '../DTOs/updateProfile';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../DTOs/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  loggedinUser!: User;
  userProfile!: updateProfile;
  updateForm!: FormGroup;

  profilePic: any = '';
  coverPic: any = '';

  constructor(
    private registerService: UserService,
    private activeRouter: ActivatedRoute,
    private formbuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserInfo = localStorage.getItem('userInfo');
    this.loggedinUser = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    console.log('User', this.loggedinUser);

    this.checkForm();
    this.putUserValues();
  }

  onFileSelected(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_event) => {
      this.profilePic = reader.result;
    };
  }

  onFileSelectedOnCoverPhoto(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    reader.onload = (_event) => {
      this.coverPic = reader.result;
      console.log('Cover image selected:', this.coverPic); 
    };
  }
  

  checkForm() {
    this.updateForm = this.formbuilder.group({
      txtfName: [''],
      txtlName: [''],
      profileImg: [''],
      coverImg: [''],
      txtOldPassword: [''],
      txtNewPassword: [''],
      txtConfirmPassword: ['']
    });
  }

  putUserValues() {
    this.updateForm.controls['txtfName'].setValue(this.loggedinUser.firstName);
    this.updateForm.controls['txtlName'].setValue(this.loggedinUser.lastName);
    this.updateForm.controls['profileImg'].setValue(this.loggedinUser.profileImage);
    this.updateForm.controls['coverImg'].setValue(this.loggedinUser.coverImage);
    this.updateForm.controls['txtOldPassword'].setValue('');
    this.updateForm.controls['txtNewPassword'].setValue('');
    this.updateForm.controls['txtConfirmPassword'].setValue('');
  }

  edit() {
    debugger;
    const newInfo = new updateProfile();
    newInfo.firstName = this.updateForm.controls['txtfName'].value;
    newInfo.lastName = this.updateForm.controls['txtlName'].value;
    newInfo.profileImage = this.profilePic || this.updateForm.controls['profileImg'].value;
    newInfo.coverImage = this.coverPic || this.updateForm.controls['coverImg'].value;
    newInfo.currentPassword = this.updateForm.controls['txtOldPassword'].value;
    newInfo.newPassword = this.updateForm.controls['txtNewPassword'].value;
    newInfo.confirmPassword = this.updateForm.controls['txtConfirmPassword'].value;

    console.log('New user info', newInfo);

    this.registerService.updateProfile(newInfo, this.loggedinUser.id).subscribe({
      next: (data) => {
        console.log('API Response:', data.message);
        if (data.message) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'User updated successfully!'
          });

          this.registerService.getUserById(this.loggedinUser.id).subscribe({
            next: (updatedUserData) => {
              console.log(updatedUserData);
              localStorage.setItem('userInfo', JSON.stringify(updatedUserData)); 
              this.router.navigate(['/dashBoard/profile']);
            },
            error: () => {
              console.log('Error fetching updated user data');
            }
          });
        }
      },
      error: (err) => {
        console.error('Error updating user profile:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating your profile. Please try again later.'
        });
      }
    });
  }
}
