import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MyTweetComponent } from './my-tweet/my-tweet.component';
import { SignupComponent } from './signup/signup.component';
import { SingleUserTweetsComponent } from './single-user-tweets/single-user-tweets.component';
import { TweetComponent } from './tweet/tweet.component';
import { UsersComponent } from './users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:WelcomeComponent},
  {path:"header",component:HeaderComponent},
  {path:"tweet",component:TweetComponent,canActivate: [AuthGuard]},
  {path:"mytweet",component:MyTweetComponent, canActivate: [AuthGuard]},
  {path:"users",component:UsersComponent, canActivate: [AuthGuard]},
  {path:"usertweet/:userid",component:SingleUserTweetsComponent, canActivate: [AuthGuard]},
  {path:"signup",component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
