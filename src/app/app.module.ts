import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { TweetComponent } from './tweet/tweet.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MyTweetComponent } from './my-tweet/my-tweet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { interceptor } from 'src/interceptor';
import { SignupComponent } from './signup/signup.component';
import { NotifyComponent } from './notify/notify.component';
import { UsersComponent } from './users/users.component';
import { SingleUserTweetsComponent } from './single-user-tweets/single-user-tweets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    WelcomeComponent,
    TweetComponent,
    MyTweetComponent,
    SignupComponent,
    NotifyComponent,
    UsersComponent,
    SingleUserTweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: interceptor,
    //   multi: true
    // }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
