import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddNewWorkOrderModalComponent } from '../../../modal/add-new-work-order-modal/add-new-work-order-modal.component';


@Component({
  selector: 'app-sheader',
  templateUrl: './sheader.component.html',
  styleUrls: ['./sheader.component.css']
})
export class SheaderComponent implements OnInit {

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

 openNewOrder(){
   this.modalService.open(AddNewWorkOrderModalComponent,{size:'lg'});
 }






}


