import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  userForm!: FormGroup;
  imageUser?:string;
  userAuth!:boolean;
  isRoleAdmin:boolean=false;
  regexPassword:RegExp=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/;

  constructor(private formBuilder: FormBuilder,
    private userService:UserService,
    private router:Router,
    private authService:AuthService,
    private alertService:AlertService)
     {}

  ngOnInit(): void {
    this.initForm();
    this.userAuth=this.authService.isAuth();
  }

  initForm() {

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required,Validators.minLength(2),Validators.maxLength(20)],
      lastName: ['', Validators.required,Validators.minLength(2),Validators.maxLength(20)],
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required,Validators.pattern(this.regexPassword)],
      imageUser:[null],
      role: [this.formBuilder.array([]), Validators.required],
      passwordAdmin:['']
    });
  }


  onSubmitForm() {
    const formValue=this.userForm.value;
    if(formValue['role']=='admin'){
      this.isRoleAdmin=true;

    }else{
      const newUser=JSON.stringify({

        lastName:this.userForm.get('lastName')?.value,
        firstName:this.userForm.get('firstName')?.value,
        email:this.userForm.get('email')?.value,
        password:this.userForm.get('password')?.value,
        role:this.userForm.get('role')?.value,
        passwordAdmin:this.userForm.get('passwordAdmin')?.value
        });

        const imageUser = this.userForm.get('imageUser')?.value;
        console.log(imageUser);
      this.userService.signup(newUser,imageUser);
    }

  }
  onSubmitFormAdmin(){
    const formValue=this.userForm.value;
    if(formValue['role']=='admin'){
      const newUser=JSON.stringify({

        lastName:this.userForm.get('lastName')?.value,
        firstName:this.userForm.get('firstName')?.value,
        email:this.userForm.get('email')?.value,
        password:this.userForm.get('password')?.value,
        role:this.userForm.get('role')?.value,
        passwordAdmin:this.userForm.get('passwordAdmin')?.value
        });

        const image = this.userForm.get('imageUser')?.value;

      this.userService.signup(newUser,image);
      this.alertService.success("Votre compte a bien été créé")
    }else{
      this.alertService.error('Erreur lors de la création du compte admin');
    }
  }


  showPhoto(event: any) {
    const file = event.target.files[0];

    this.userForm.patchValue({
      imagePost: file
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
