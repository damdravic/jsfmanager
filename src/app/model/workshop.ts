import { Worker } from "./worker";
import { WorkerQualification } from "./worker-qualification";
export class Workshop {

 wsId: number;
 wsImage: string;
 wsName: string;
 wsIsActive:boolean;
 wsDescription:string;
 wsWorkers:Worker[];
 wsWorkerQualification:WorkerQualification[];


}
