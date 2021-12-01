import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

 

  public extended : boolean = false;
  
  @Output() sidebarStatus : EventEmitter<boolean> = new EventEmitter<boolean>();

  public openClose(){
    this.extended = !this.extended;
    this.sidebarStatus.emit(this.extended);
  }

  ngOnInit(): void {
  }


}
