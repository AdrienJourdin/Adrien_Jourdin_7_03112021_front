import { Injectable } from '@angular/core';
import { Subject,Observable,BehaviorSubject,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private currentUserSubject!:BehaviorSubject<Login>;
  public currentUser!:Observable<Login>;



  constructor(private http:HttpClient,
    private router:Router){
    this.currentUserSubject= new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
    this.currentUser=this.currentUserSubject.asObservable();
  }

  public get currentUserValue():Login{
    return this.currentUserSubject.value;
  }

  public isAuth():boolean{
    if (this.currentUserValue.token==null || this.currentUserValue.token.length<5){
      return false;
    }else{
      return true;
    }
  }




  login(email:string,password:string) {

    return this.http.post<any>('http://localhost:3000/api/user/login',{email,password})
    .pipe(map(user=>{
      localStorage.setItem('currentUser',JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));

  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({token:'',userId:0});
    location.reload();
    this.router.navigate(['/login']);
  }
}
