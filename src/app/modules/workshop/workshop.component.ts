import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit {
  

  workshops = [
    {wsId : 1,
    wsName:'koko'
    },
    {wsId :2,
    wsName:'kiki'
    }

  ]


  constructor() { }

  ngOnInit(): void {
  }

}
