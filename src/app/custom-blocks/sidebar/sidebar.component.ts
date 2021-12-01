import { CssSelector } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, Renderer2, ViewChildren } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private renderer : Renderer2) { }

  @ViewChildren('navigation') myElement :HTMLElement;

  public isExpanded : boolean = false;
  public isOpen : boolean = false;
  @Output() sidebarStatus : EventEmitter<boolean> = new EventEmitter<boolean>();

  public openClose(){
    this.isOpen = !this.isOpen;
    this.sidebarStatus.emit(this.isOpen);
    
  }


  public changeStatus(){
    console.log(this.myElement.tagName)
    if(this.isExpanded){
      this.renderer.setProperty(this.myElement,"width","300px") ;
      console.log(this.myElement)
    this.isExpanded = !this.isExpanded;
    console.log(this.myElement)
   

    
     


  }}

  ngOnInit(): void {
  }

}
