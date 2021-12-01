import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor() { }
  extended: boolean = false;
  collapsed : boolean = false;


  toggleSideBar(s:boolean){
    this.collapsed = !this.collapsed;


  }

  ngOnInit(): void {
  }

  changeSidebarStatus(extended:boolean){
     this.extended = extended;
  }

}
