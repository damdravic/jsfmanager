import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationType } from '../enum/notification-type.enum';
import { Car } from '../model/car';
import { CarBrand } from '../model/car-brand';
import { CarModel } from '../model/car-model';
import { CustomHttpResponse } from '../model/custom-http-response';
import { NotificationService } from '../service/notification.service';
import { CarService } from './../service/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {


  public cars: Car[];
  public editCar: Car = new Car;
  public carString: string = "";

  public carBrands: CarBrand[];
  public selectedBrand :string= "";

  public carModels : CarModel[];
  public selectedModel : string = "";

  constructor(private carService: CarService,
    private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.getCars();
    this.getCarBrands();
  }

  addNewCar(carForm: NgForm): void {

    const formData = this.carService.createCarFormData(null,carForm.value);
    this.carService.addCar(formData).subscribe(
      (response: Car) => {
        document.getElementById('new-car-close').click();
        this.sendNotification(NotificationType.SUCCESS, `${response.carRegNumber} car was successfully created`);
        
      },
      (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message)
      }
    );
  }


  public getCarBrands():any{
    this.carService.getCarBrands().subscribe(
      (response : CarBrand[]) => {
        this.carBrands = response;

        for(let cb of this.carBrands){
             console.log(cb);
        }
        

      },(error : HttpErrorResponse) =>{
        this.sendNotification(NotificationType.ERROR,`CarBrands not loaded !!!`);
      }
      
    )
  }


  public getCars(): any {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
       
        this.cars = response;

        this.carService.addCarToLocalCache(response);
      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);

      })
  }


  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.mynotify(notificationType, message);
    } else {
      this.notificationService.mynotify(notificationType, 'AN ERROR OCCURED.PLEASE TRY AGAIN')

    }
  }


  public onDeleteCar(carRegNumber: string): void {
    console.log("onDeleteCar");
    this.carService.deleteCar(carRegNumber).subscribe(
      (response: CustomHttpResponse) => {
        this.sendNotification(NotificationType.SUCCESS, response.message);

        this.getCars();

      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      })

  }

  public onEditCar(car: Car) {
    this.editCar = car;
    document.getElementById('openEditCar').click();
  }



  public onUpdateCar(carEditForm: NgForm): void {

    let currentCarRegNr : string = this.editCar.carRegNumber;
    let formData = this.carService.createCarFormData(currentCarRegNr , carEditForm.value);

    this.carService.updateCar(formData).subscribe(
      (response: Car) => {
        document.getElementById("closeEditCar").click();
        location.reload();
        this.sendNotification(NotificationType.SUCCESS, `${response.carRegNumber} car was updated`)

      }, (error: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, error.error.message);
      })

  }






  //open modal section to add new brand when option newBrand is selected
  public carBrandChange(value: string){  
    
    if(value == "newBrand"){
      document.getElementById("openNewCarBrand").click();
    }
    this.getModelsForBrand(value);
  }

  //methode to send new brand to backend to store in database
  public onNewCarBrand(newCarBrandForm : NgForm){
    var carBrandName :string =  newCarBrandForm.controls['carBrandName'].value;
    carBrandName = carBrandName.toUpperCase();
    this.carService.addNewCarBrand(carBrandName).subscribe(
      (response : CarBrand)=>{
            document.getElementById("closeAddNewCarBrand").click();
            this.sendNotification(NotificationType.SUCCESS,`New Brand Added Successifully`);
            this.getCarBrands();

            //choosing the option with the new brand
            this.selectedBrand = response.carBrandName;
            document.getElementById("openNewCarModel").click();
       },(error:HttpErrorResponse) =>{
             this.sendNotification(NotificationType.ERROR,error.error.message);
      }
    )
  }





  //open modal section to add new model when option newmodel is selected
  public carModelChange(value : String){
    if(value == "newModel"){
      document.getElementById("openNewCarModel").click();
    }
  }

  //methode to send new model to backend to store in database
  public onNewCarModel(newCarModelForm : NgForm){

    let newModel:string = newCarModelForm.controls['carModelName'].value;
    newModel = newModel.toUpperCase();
    this.selectedModel = newModel;
    this.carService.addNewCarModel(newModel,this.selectedBrand).subscribe(
      (response: CarModel) =>{
        document.getElementById("closeAddNewCarModel").click();
        this.sendNotification(NotificationType.SUCCESS,`Brand ${this.selectedBrand} was updated and added ${this.selectedModel} model`);
        
        this.getModelsForBrand(this.selectedBrand);
        //but for now the new model is not in modelArray
        //we add here

        const ncm = new CarModel(null,null,newModel);
        this.carModels.push(ncm);
      

        
       

        console.log("selectedBrand in new model -->" + this.selectedBrand);
        this.selectedModel = response.modelName;

      },(error:HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR,error.error.message);
      }
    )

  }







  public getModelsForBrand(carBrandName : string) : void{
     const carBrand  = this.carBrands.find(x => x.carBrandName === carBrandName);
     console.log("in getModelsForBrand   CarBrand.name -->" + carBrandName);
     console.log("in getModelsForBrand   CarBrand -->" + carBrand.carBrandName);
     this.carModels = carBrand.carModels;
     console.log("in getModelsForBrand   carModels fof carbrand length -->" + this.carModels.length);
  }



}
