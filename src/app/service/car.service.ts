import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from './../model/car';
import { CarBrand} from './../model/car-brand';
import { CarModel} from './../model/car-model';



@Injectable({
  providedIn: 'root'
})
export class CarService {

  private host = environment.apiUrl;

  constructor(private http:HttpClient) { }

 public addCar(formData :FormData):Observable<Car  | HttpErrorResponse>{
   return this.http.post<Car>(`${this.host}/backendResource/car/add`,formData);
 }

 public getCars():Observable<Car[] | HttpErrorResponse>{
   return this.http.get<Car[]>(`${this.host}/backendResource/car/list`);
 }

public deleteCar(regNumber:string):Observable<any|HttpErrorResponse>{
  return this.http.delete<any>(`${this.host}/backendResource/car/delete/${regNumber}`);
}

public updateCar( formData : FormData):Observable<Car | HttpErrorResponse>{
     return this.http.post<Car>(`${this.host}/backendResource/car/update/`,formData);
}

public createCarFormData(currentCarRegNr : string, car :Car){
  
  const formData = new FormData();
  console.log(car.carFirstReg.toString()) ;

  formData.append('currentCarRegNr',currentCarRegNr);
  formData.append('carRegNumber',car.carRegNumber);
  formData.append('carBrand',car.carBrand);
  formData.append('carModel',car.carModel);
  formData.append('carOwner',car.carOwner);
  formData.append('carFirstReg',car.carFirstReg.toString());
  formData.append('carColor',car.carColor);
  formData.append('carSold',JSON.stringify(car.carSold));
  formData.append('carIsActive',JSON.stringify(car.carIsActive));

  return formData;

}

public addCarToLocalCache(cars : Car[]): void{
  localStorage.setItem('cars',JSON.stringify(cars));
}



/*
*
*  Methodes for CarBrands and CarModel
*
*/

public getCarBrands():Observable <CarBrand[] |HttpErrorResponse>{
  return this.http.get<CarBrand[]>(`${this.host}/backendResource/car/listCarBrands`);
}

public addNewCarBrand(newBrandName : string):Observable<CarBrand | HttpErrorResponse>{
  
      const fd :FormData= new FormData();
      fd.append('nb', newBrandName);

  return this.http.post<CarBrand>(`${this.host}/backendResource/car/newCarBrand`,fd);
}

public getCarModels():Observable <CarModel[] | HttpErrorResponse>{
  return this.http.get<CarModel[]>(`${this.host}/backendResource/car/listCarModel`);
}

public addNewCarModel(newModel: string,selectedBrand : string):Observable<CarModel | HttpErrorResponse>{
  
     const fd:FormData = new FormData();
     fd.append("newModel", newModel);
     fd.append("selectedBrand",selectedBrand);

  return this.http.post<CarModel>(`${this.host}/backendResource/car/newCarModel`,fd);
}



}
