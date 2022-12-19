import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { loginResponse } from '../response';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  closeResult = '';
  status:boolean = false;
  userList='';
  resetForm:FormGroup;
  passwordError: boolean;
  twtflag='';
  resetMsg : {
    text:string,
    type: string
  };
  user = new Subject<loginResponse>();
  logoutEmitter = new EventEmitter();
  constructor(private router:Router,private modalService: NgbModal,public userService:UserService) {
   }

  ngOnInit(): void {
    this.resetMsg = {
      text: '',
      type: 'none'
    }
    this.twtflag = sessionStorage.getItem('twtflag');

    this.resetForm = new FormGroup({
      'userName' : new FormControl(''),
      'password' : new FormControl('',[Validators.required]),
      'confirmPassword' : new FormControl('',[Validators.required])
    })
  }

  logout(){
    this.userService.doLogout();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  resetPassword(resetForm:any){
    this.passwordError=false;
    this.resetForm.get('userName').setValue(JSON.parse(localStorage.getItem('loggedInUser'))?.email);
    console.log(resetForm);
    if (resetForm.value.password != resetForm.value.confirmPassword) {
      this.passwordError = true;
    }
    else{
      this.userService.resetPassword(resetForm).subscribe(
        (response:any)=>{
          this.resetMsg = {
            text: 'password reset successfull',
            type: 'success'
          }

      })
    }
  }
}
