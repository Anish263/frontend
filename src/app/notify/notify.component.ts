import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit, OnChanges {

  @Input() msg:{
    text: string,
    type: string
  };

  paraClass: string[] = [];
  divClass: string[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.msg.type === 'failed'){
      this.paraClass = ['alert-danger','text-danger']
    }else if(this.msg.type === 'success'){
      this.paraClass = ['alert-success', 'text-success']
    }
    this.divClass = ['show'];
    this.changeColor();
  }

  ngOnInit(): void {
    this.divClass = ['hide'];
  }

  changeColor(){
    setTimeout(() =>{
      this.divClass = ['hide'];
    },3500)
  }


}
