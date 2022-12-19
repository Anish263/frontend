import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { off } from 'process';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Register } from './login/register';
import {loginResponse} from './response';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  header: any
  currentUser: loginResponse;
  constructor(private http: HttpClient, public router: Router) {
  }
  // Sign-up
  registerUser(user: User): Observable<any> {
    let api = environment.baseUrl+'/register';
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  // Sign-in
  // loginUser(user: User) {
  //   this.http
  //     .post<any>(environment.baseUrl + '/login', user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.jwt);
  //       localStorage.setItem('loggedInUser', JSON.stringify(res));
  //       this.currentUser = res;
  //       this.router.navigate(['tweet'])
  //     }, error =>{
  //       this.handleError(error);
  //     });
  // }


  getToken() {
    return localStorage.getItem('access_token');
  }

  async loginUser(user:User): Promise<Observable<any>>{
    try {
      let response: any = await this.http.post(environment.baseUrl + '/login', user).toPromise()
      localStorage.setItem('access_token', response.jwt);
      localStorage.setItem('loggedInUser', JSON.stringify(response));
      this.currentUser = response;
    return of(response);
    } catch (error) {
      return of(error);
    }


  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  get currentUserInfo(): string {
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    if(user){
      return user.firstName+' '+user.lastName;
    }
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    let removeUser = localStorage.removeItem('loggedInUser');
    if (removeToken == null && removeUser == null) {
      this.router.navigate(['login']);
    }
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg)
    return throwError(msg);
  }

  resetPassword(resetForm:any){
    let body = {
   userName : resetForm.value.userName,
   newPassword : resetForm.value.password
    }
      return this.http.put(environment.baseUrl+ '/'+resetForm.value.userName+'/forgot',body,{observe: 'response'})

  }

  getAllUsers(){
    this.header= {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.getToken()}`)
    }
    return this.http.get(environment.baseUrl+'/users/all', this.header);
  }
}
