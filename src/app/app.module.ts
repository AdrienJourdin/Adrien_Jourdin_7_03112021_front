import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { PostComponent } from './posts/post/post.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';
const appRoutes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent},
  { path: '', component: PostsComponent },
  {path:'not-found',component:FourOhFourComponent},
  {path:'**',redirectTo:'/not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PostsComponent,
    SinglePostComponent,
    PostFormComponent,
    HeaderComponent,
    PostComponent,
    FourOhFourComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    PostsService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
