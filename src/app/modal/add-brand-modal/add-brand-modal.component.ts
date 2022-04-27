import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CarBrand } from 'src/app/model/car-brand';
import { CarService } from 'src/app/service/car.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-brand-modal',
  templateUrl: './add-brand-modal.component.html',
  styleUrls: ['./add-brand-modal.component.css']
})
export class AddBrandModalComponent implements OnInit {

 

  constructor(public activeModal: NgbActiveModal,
    public ngbModal: NgbModal,
    private carService: CarService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }


  onNewCarBrand(carBrandForm: NgForm) {
    let carBrandName = carBrandForm.controls['carBrandName'].value;
    this.carService.addNewCarBrand(carBrandName).subscribe(
      (response: CarBrand) => {
        this.carService.changeBrand(carBrandName);
        this.activeModal.close();

      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      }
    )
  }

  closeModal() {
    this.carService.changeBrand("");
    this.activeModal.close();
  }
  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.mynotify(notificationType, message);
    } else {
      this.notificationService.mynotify(notificationType, 'AN ERROR OCCURED.PLEASE TRY AGAIN')

    }
  }




}
