import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  userAuth!:Boolean;
  messageErreur!:any;

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private authService:AuthService,
    private router:Router,
    private alertService:AlertService) {


    }

  ngOnInit(): void {
    this.initForm();
    this.userAuth=false;
    if(this.authService.isAuth()){
      this.userAuth=true;
    }
  }

initForm(){
  this.loginForm=this.formBuilder.group({
    email:['',Validators.required],
    password:['',Validators.required]
  });
}

onSubmitForm(){
  const formValue=this.loginForm.value;

  const  email=formValue['email'];
    const password=formValue['password'];

    this.authService.login(email,password).subscribe(
      infos=>{

        this.router.navigate(['/posts']);

        location.reload();
      }
    ,
    (error)=>{
      console.log(error);
      this.alertService.error(error.error.error);
    }

    )
}

}
