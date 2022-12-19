import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  loading: boolean = false;
  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe((response)=>{
      this.users = response;
      this.loading = false;
    })
  }

}
