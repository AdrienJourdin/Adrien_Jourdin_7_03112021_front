import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-groupomania';
  isAuth:boolean=true;
  imagePath:string="http://localhost:3000/images/icon-left-font-monochrome-white.png";
  constructor(private authService:AuthService){

  }

  ngOnInit():void{
    this.isAuth=this.authService.isAuth();
  }



}
