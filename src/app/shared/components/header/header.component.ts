import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  collapse : boolean = false;

  ngOnInit(): void {
  }

@Output() collapseEvent : EventEmitter<boolean>  = new  EventEmitter<boolean>();

  toggleSideBar(){
    this.collapse = !this.collapse;
    this.collapseEvent.emit(this.collapse);
  }

}
