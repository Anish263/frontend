import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('boxContainer')
  public boxContainer: ElementRef<HTMLElement>;

  loginForm: FormGroup;
  forgotForm: FormGroup;
  loginStaus:string = null;
  loading: boolean = false;
  resetMsg : {
    text:string,
    type: string
  };
  validityFlag: boolean = false;
  usr: string;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.resetMsg = {
      text: '',
      type: 'none'
    }
    this.loginForm = new FormGroup({
      'userName': new FormControl(),
      'password': new FormControl()
    })
    this.forgotForm = new FormGroup({
      'userName': new FormControl('',[Validators.required]),
      'password': new FormControl('',[Validators.required]),
      'confirmPassword': new FormControl('',[Validators.required])
    })

    this.loginForm.valueChanges.subscribe(
      value => {
        if(value.userName === '' || value.password === ''){
          this.validityFlag = true;
        }else{
          this.validityFlag = false;
        }
      }
    )
  }

  loginSubmit(loginForm:any){
    this.loading = true;
    this.userService.loginUser(loginForm.value).then(res =>{
      res.subscribe((r)=>{
        this.loading = false;
        console.log(r)
        if(r.jwt){
          this.router.navigate(['tweet'])
        }else if(r.status !== 200){
          this.resetMsg = {
            text: 'username or password is incorrect',
            type: 'failed'
          }
        }

      })
    })
  }

  resetPassword(forgotForm){
    this.userService.resetPassword(forgotForm).subscribe(
      (response:HttpResponse<any>)=>{
        console.log(response);
       if(response.status === 200){
        this.resetMsg = {
          text: 'Password Changed Successfully',
          type: 'success'
        }
       }
    },
    error =>{
      this.resetMsg = {
        text: 'Username not found. OR some error occured',
        type: 'failed'
      }
    })
  }

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

}
