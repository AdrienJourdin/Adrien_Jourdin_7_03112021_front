import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  oneUser!: User;
  user!: User;
  oneUserSubscription!: Subscription;
  updateUserForm!: FormGroup;
  updateisActive: boolean = false;
  deleteConfirmation: boolean = false;
  imageUpdateUser?: string;

  isFocus: any = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    passwordValidation: false,
  };

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.oneUserSubscription = this.userService.oneUserSubject.subscribe(
      (user: User) => {
        this.oneUser = user;
        console.log(user);
      }
    );

    this.userService.getOneUser();
    this.onInitForm();
  }

  onInitForm() {
    this.updateUserForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9])(?=.*[!@#$%^&*]).{8,20}$/
        ),
      ]),
      passwordValidation: new FormControl('', [Validators.required]),
      imageUser: new FormControl(null),
      role: new FormControl('', Validators.required),
      passwordAdmin: new FormControl(''),
    });
  }

  activeUpdate() {
    if (this.updateisActive) {
      this.updateisActive = false;
    } else {
      this.updateisActive = true;
    }
  }

  deleteUserConfirmation() {
    if (this.deleteConfirmation) {
      this.deleteConfirmation = false;
    } else {
      this.deleteConfirmation = true;
    }
  }

  deleteUser() {
    this.userService.deleteUser();
    this.authService.logout();
  }
  initForm() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitForm() {
    const formValue = this.updateUserForm.value;
    if (formValue['role'] == 'admin') {
    } else {
      const newInfos = {
        lastName: formValue['lastName'],
        firstName: formValue['firstName'],
        email: formValue['email'],
        password: formValue['password'],
      };
      this.userService.updateUser(newInfos);
    }
  }

  showPhotoUpdate(event: any) {
    const file = event.target.files[0];

    this.updateUserForm.patchValue({
      imageUser: file,
    });
    this.updateUserForm.get('imageUserUpdate')?.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUpdateUser = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  ngOnDestroy(): void {
    this.updateisActive = false;
  }

  logout() {
    this.authService.logout();
  }

  get firstName() {
    return this.updateUserForm.get('firstName');
  }
  get lastName() {
    return this.updateUserForm.get('lastName');
  }
  get email() {
    return this.updateUserForm.get('email');
  }
  get password() {
    return this.updateUserForm.get('password');
  }
  get passwordValidation() {
    return this.updateUserForm.get('passwordValidation');
  }

  inputFocus(field: string) {
    this.isFocus[field] = true;
  }
  inputBlur(field: string) {
    this.isFocus[field] = false;
  }
}
