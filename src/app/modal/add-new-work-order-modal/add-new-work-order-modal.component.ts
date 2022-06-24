import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/service/car.service';
import { CarBrand } from 'src/app/model/car-brand';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Car } from 'src/app/model/car';

@Component({
  selector: 'app-add-new-work-order-modal',
  templateUrl: './add-new-work-order-modal.component.html',
  styleUrls: ['./add-new-work-order-modal.component.css']
})
export class AddNewWorkOrderModalComponent implements OnInit {
 
  carBrands: CarBrand[];
  loading :boolean = true;
  foundCars: Car[] ;
  selectedCar:Car = new Car();


  constructor( private carService:CarService) { }

  searchCar($event: any){
      const lp :string = $event.target.value;
      this.getCar(lp);
  }


  getCar(lp: string) {
    this.carService.searchCar(lp).subscribe(
      (response)=>{
        this.foundCars = response;
        console.log(this.foundCars);
      }
    )
   
  }


  ngOnInit(): void {
    this.getBarnds();
  }

   private getBarnds():any {
    this.carService.getCarBrands().subscribe(
      (response:CarBrand[])=>{
        if(response != null){
        this.carBrands = response}
      },(error:HttpErrorResponse)=>{
        console.log("erroareeeeeeeeeeeeeeee");
      }
    
    )
   }

   selectCarFromSearch(carRegNumber:string){

     
    this.selectedCar = this.foundCars.find(car => car.carRegNumber === carRegNumber);
    this.foundCars=[];


   }


}
