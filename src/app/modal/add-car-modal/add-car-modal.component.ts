import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Car } from 'src/app/model/car';
import { CarService } from 'src/app/service/car.service';
import { NotificationService } from 'src/app/service/notification.service';
import { CarBrand } from '../../model/car-brand';
import { CarModel } from '../../model/car-model';
import { AddBrandModalComponent } from '../add-brand-modal/add-brand-modal.component';
import { AddModelModalComponent } from '../add-model-modal/add-model-modal.component';

@Component({
  selector: 'app-add-car-modal',
  templateUrl: './add-car-modal.component.html',
  styleUrls: ['./add-car-modal.component.css']
})
export class AddCarModalComponent implements OnInit {


  public subscription: Subscription;
  public subscriptionx:Subscription;
  public carBrands:CarBrand[];
  public selectedBrand: string = "";

  public carModels: CarModel[];
  public selectedModel: string = "";

  constructor(public activeModal: NgbActiveModal,
    private carService: CarService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    
  }
  
  ngOnInit(): void {
   
    this.getCarBrands();

    this.subscription = this.carService.getNewBrandToCarForm().subscribe(
     (response) => {
      if(response != ""){
      console.log("aici comp brand" + response);
        this.setNewBrandInForm(response);
      }
      })

   this.subscriptionx = this.carService.getNewModelToCarForm().subscribe(
      (response) => {
        if(response != ""){
          this.setNewModelInForm(response);
        
        }
     },(error:any) =>{} );
    
  
  }


  addNewCar(carForm: NgForm): void {

    const formData = this.carService.createCarFormData(null, carForm.value);
    this.carService.addCar(formData).subscribe(
      (response: Car) => {
        this.carService.changeBrand("");
        this.carService.changeModel("");
        this.activeModal.close();
        
        this.sendNotification(NotificationType.SUCCESS, `${response.carRegNumber} car was successfully created`);
      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message)
      }
    );
  }



  //open modal section to add new brand when option newBrand is selected
  //if brand exist call method to get all modelds foe selected brand
  public carBrandChange(value) {
    if (value == "newBrand") {
      this.modalService.open(AddBrandModalComponent, { size: 'lg' });
    }else{
    this.getModelsForBrand(value);}
  }


  //open modal section to add new model when option newModel is selected
  public carModelChange(value) {
    if (value == "newModel") {
      this.modalService.open(AddModelModalComponent, { size: 'lg' }).componentInstance.selectedBrand = this.selectedBrand;
    }
  }


  public getModelsForBrand(carBrandName: string): void {
   
    let carBrand = this.carBrands.find(x => x.carBrandName === carBrandName);
    this.carModels = carBrand.carModels;
    

  }

  public getCarBrands(): any {
    this.carService.getCarBrands().subscribe(
      (response: CarBrand[]) => {
        this.carBrands = response;
      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, `CarBrands not loaded !!!`);
      }
    )
  }


  public setNewBrandInForm(newBrand: string) {
    this.getCarBrands();
    this.selectedBrand = newBrand;
  }

 public  setNewModelInForm(newModel: string) {
    this.carService.getCarBrands().subscribe(
      (response:CarBrand[])=>{
        this.carBrands = response;
        this.getModelsForBrand(this.selectedBrand);
        this.selectedModel = newModel;
 
      }, (error) => {
        this.sendNotification(NotificationType.ERROR, `CarBrands not loaded !!!`);
      }

    )
  }



  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.mynotify(notificationType, message);
    } else {
      this.notificationService.mynotify(notificationType, 'AN ERROR OCCURED.PLEASE TRY AGAIN')

    }
  }


  getCarsInConsole(){
    console.log(this.carBrands);
  }


}




