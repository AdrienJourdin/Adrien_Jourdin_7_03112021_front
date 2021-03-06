import { User } from '../models/User.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Login } from '../models/login.model';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { Userdto } from '../models/dto/userdto.model';

@Injectable()
export class UserService {
  private users: User[] = [];
  private oneUser!: User;
  userSubject = new Subject<User[]>();
  oneUserSubject = new Subject<User>();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  emitOneUser() {
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
        this.alertService.error(error.error.message);
      }
    );
  }
  getUserById(id: number) {
    const user = this.users.find((userObject: User) => {
      return userObject.userId === id;
    });
    return user;
  }

  getOneUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    const userId = currentUser.userId;
    this.httpClient
      .get<Userdto>('http://localhost:3000/api/user/' + userId)
      .subscribe({
        next: (data) => {
          this.oneUser = data.user;
          this.emitOneUser();
        },
        error: (error) => {
          this.alertService.error(error.error.message);
        },
      });
  }

  signup(user: string, imageUser: File) {
    const userFormData = new FormData();
    userFormData.append('user', user);
    userFormData.append('image', imageUser);
    this.httpClient
      .post('http://localhost:3000/api/user/signup', userFormData)
      .subscribe(
        () => {
          console.log('Enregistrement termin?? !');
          this.router.navigate(['/login']);
          this.alertService.success('Votre compte a bien ??t?? cr????');
        },
        (error) => {
          console.log(error);
          this.alertService.error(error.error.message);
        }
      );
  }

  deleteUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    const userId = currentUser.userId;
    this.httpClient
      .delete('http://localhost:3000/api/user/' + userId)
      .subscribe({
        next: (data) => {
          console.log('Profil supprim??');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.alertService.error(error.error.message);
        },
      });
  }

  updateUser(user: User) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    const userId = currentUser.userId;

    this.httpClient
      .put('http://localhost:3000/api/user/' + userId, user)
      .subscribe({
        next: (data) => {
          console.log('Profil modifi??');
        },
        error: (error) => {
          this.alertService.error(error.error.message);
        },
      });
  }
}
