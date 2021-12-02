import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  userAuth!: boolean;
  imageUser?:string;
  isRoleAdmin: boolean = false;
  submitted = false;
  isFocus:any={
    'firstName':false,
    'lastName':false,
    'email':false,
    'password':false,
    'passwordValidation':false
  }
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.userAuth = this.authService.isAuth();
  }
  get f() {
    return this.userForm.controls;
  }

  initForm() {
    this.userForm = new FormGroup({
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
      imageUser: new FormControl('',[Validators.required]),
      role:new FormControl('',[
        Validators.required
      ]),
      passwordAdmin:new FormControl('',[])
    });
  }





  onSubmitForm() {
    this.submitted = true;
    const formValue = this.userForm.value;
    const lastName=this.userForm.get('lastName')?.value;
    const firstName=this.userForm.get('firstName')?.value;
    const email=this.userForm.get('email')?.value;
    const password=this.userForm.get('password')?.value;
    const role=this.userForm.get('role')?.value;


    if (this.userForm.invalid) {
      this.alertService.error('Formulaire invalide');
      return;
    }

    if (formValue['role'] == 'admin') {
      this.isRoleAdmin = true;
    } else {
      const newUser = JSON.stringify({
        lastName: lastName,
        firstName: firstName,
        email: email,
        password: password,
        role: role
      });

      const image = this.userForm.get('imageUser')?.value;

      this.userService.signup(newUser, image);
    }
  }
  onSubmitFormAdmin() {
    const formValue = this.userForm.value;
    if (formValue['role'] == 'admin') {
      const newUser = JSON.stringify({
        lastName: this.userForm.get('lastName')?.value,
        firstName: this.userForm.get('firstName')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        role: this.userForm.get('role')?.value,
        passwordAdmin: this.userForm.get('passwordAdmin')?.value,
      });

      const image = this.userForm.get('imageUser')?.value;
      this.userService.signup(newUser, image);
      this.alertService.success('Votre compte a bien été créé');
    } else {
      this.alertService.error('Erreur lors de la création du compte admin');
    }
  }



  onReset() {
    this.submitted = false;
    this.userForm.reset();
  }



  get firstName(){return this.userForm.get('firstName')}
  get lastName(){return this.userForm.get('lastName')}
  get email(){return this.userForm.get('email')}
  get password(){return this.userForm.get('password')}
  get passwordValidation(){return this.userForm.get('passwordValidation')}

  inputFocus(field:string){

    this.isFocus[field]=true;

  }
  inputBlur(field:string){
    this.isFocus[field]=false;
  }






  showImage(event: any) {
    const file = event.target.files[0];

    this.userForm.patchValue({
      imageUser: file
    });
    this.userForm.get('imageUser')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUser = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
