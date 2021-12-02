import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';
import { CoreModule } from './core/core.module';
import { ProfilComponent } from './auth/profil/profil.component';
import { AlertComponent } from './alert/alert.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { CommentFormComponent } from './posts/comment-form/comment-form.component';
import { UpdatePostFormComponent } from './posts/update-post-form/update-post-form.component';
import { UpdateCommentFormComponent } from './posts/update-comment-form/update-comment-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

const appRoutes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', canActivate: [AuthGuard],component: PostsComponent },
  { path: 'users',canActivate: [AuthGuard],  component: UserListComponent },
  { path: 'not-found', component: FourOhFourComponent },
  {path:"profil", canActivate: [AuthGuard],component:ProfilComponent},
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    PostsComponent,
    SinglePostComponent,
    HeaderComponent,
    FourOhFourComponent,
    UserListComponent,
    ProfilComponent,
    AlertComponent,
    PostFormComponent,
    CommentFormComponent,
    UpdatePostFormComponent,
    UpdateCommentFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule

  ],
  providers: [AuthService, PostsService, UserService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
