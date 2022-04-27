import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCarModalComponent } from 'src/app/modal/add-car-modal/add-car-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private modalService : NgbModal) { }

  openModal(){
    this.modalService.open(AddCarModalComponent,{ size: 'lg' });
  }

  ngOnInit(): void {
  }

}
