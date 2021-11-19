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
  styleUrls: ['./profil.component.sass'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  oneUser!: User;
  oneUserSubscription!: Subscription;

  updateUserForm!: FormGroup;
  updateisActive: boolean = false;
  deleteConfirmation: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.oneUserSubscription = this.userService.oneUserSubject.subscribe(
      (user: User) => {
        this.oneUser = user;
      }
    );

    this.userService.getOneUser();
    this.userService.emitOneUser();

    this.updateUserForm = new FormGroup({
      firstName: new FormControl(),
      lastName:new FormControl(),
      email:new FormControl(),
      password:new FormControl(),
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

  ngOnDestroy(): void {
    this.oneUserSubscription.unsubscribe();
    this.updateisActive = false;
  }

  logout(){
    this.authService.logout();
  }
}
