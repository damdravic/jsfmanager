import {Car} from './car'
import { User } from './user';
import { Workshop } from './workshop';


export class WorkOrder {

   id:number;
   workOrderNr:number;
   car: Car;
   workshop:Workshop;
   description: string;
   parts: string;
   createdDate: Date;
   dataIn: Date;
   dataOut: Date;
   scheduledDateIn: Date;
   scheduleddateOut: Date;
   progres: number;
   createdBy: User;
   


}
