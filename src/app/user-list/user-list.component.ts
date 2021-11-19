import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit, OnDestroy {
  users:User[]=[];
  userSubscription!:Subscription;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userSubscription=this.userService.userSubject.subscribe(
      (users:any[])=>{
        this.users=users;
      }
    );
    this.userService.getAllUsers();
    this.userService.emitUsers();

  }

  ngOnDestroy():void{
    this.userSubscription.unsubscribe();
  }


}