import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;

  userAuth!:boolean;

  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router,
    private authService:AuthService)
     {}

  ngOnInit(): void {
    this.initForm();
    this.userAuth=this.authService.isAuth();
  }

  initForm() {

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: [this.formBuilder.array([]), Validators.required],
      passwordAdmin:['']
    });
  }

  onSubmitForm() {
    const formValue=this.userForm.value;
    if(formValue['role']=='admin'){


    }else{
      const newUser={
        lastName:formValue['lastName'],
        firstName:formValue['firstName'],
        email:formValue['email'],
        password:formValue['password'],
        role:formValue['role'],

      }

      this.userService.signup(newUser);

    }

  }
}
