import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Login } from '../models/login.model';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  private users: User[] = [];
  private oneUser!:User;
  userSubject = new Subject<User[]>();
  oneUserSubject= new Subject<User>();




  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private alertService:AlertService,
    private router:Router
  ) {}


    emitOneUser(){
      this.oneUserSubject.next(this.oneUser);
    }

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  getAllUsers() {
    this.httpClient.get<any[]>('http://localhost:3000/api/user').subscribe(
      (users) => {
        this.users = users;
        this.emitUsers();
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }
  getUserById(id:number){
      const user=this.users.find(
        (userObject:User)=>{
          return userObject.userId===id;
        }

      );
      return user;
  }

  getOneUser(){
    const currentUser=JSON.parse(localStorage.getItem('currentUser')||"");
    const userId=currentUser.userId;
    this.httpClient.get<User>('http://localhost:3000/api/user/'+userId).subscribe({
      next:(data)=>{
        this.oneUser=data;
        this.emitOneUser();
      },
      error:(error)=>{
        this.alertService.error(error);
      }
    }
    )
  }

  signup(user: string, imageUser:File) {

    const userFormData = new FormData();


      userFormData.append('user', user);

      userFormData.append('image',imageUser);
    this.httpClient
      .post('http://localhost:3000/api/user/signup', userFormData)
      .subscribe(
        () => {
          console.log('Enregistrement terminé !');
          this.router.navigate(['/login']);
          this.alertService.success("Votre compte a bien été créé")
        },
        (error) => {
          this.alertService.error(error.message);
        }
      );
  }


  deleteUser(){
    const currentUser=JSON.parse(localStorage.getItem('currentUser')||"");
    const userId=currentUser.userId;
    this.httpClient.delete('http://localhost:3000/api/user/'+userId).subscribe(
      {next:(data)=>{
        console.log("Profil supprimé")
        this.router.navigate(['/login']);
      },
    error:(error)=>{
      this.alertService.error(error.message);
    }}
    )
  }

  updateUser(user:User){
    const currentUser=JSON.parse(localStorage.getItem('currentUser')||"");
    const userId=currentUser.userId;
    console.log(userId);
    this.httpClient.put('http://localhost:3000/api/user/'+userId,user).subscribe(
      {next:(data)=>{
        console.log("Profil modifié")
      },
    error:(error)=>{
      this.alertService.error(error.message);
    }}
    )
  }

}
