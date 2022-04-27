import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarModel } from 'src/app/model/car-model';
import { CarService } from 'src/app/service/car.service';

@Component({
  selector: 'app-add-model-modal',
  templateUrl: './add-model-modal.component.html',
  styleUrls: ['./add-model-modal.component.css']
})
export class AddModelModalComponent implements OnInit {


  @Input() public selectedBrand;


  constructor(public activeModal:NgbActiveModal,
              public carService:CarService,
              ) { }

  ngOnInit(): void {
    console.log(this.selectedBrand);

  }

  onNewCarModel(carModelForm : NgForm){
    let carModelName = carModelForm.controls['carModelName'].value;

    this.carService.addNewCarModel(carModelName,this.selectedBrand).subscribe(
       (response:CarModel) => {
         this.carService.changeModel(carModelName);
         this.activeModal.close();
 
       },(error: HttpErrorResponse) =>{ 
         
       })
 }

  closeModal(){
    this.activeModal.close();
  }


}
