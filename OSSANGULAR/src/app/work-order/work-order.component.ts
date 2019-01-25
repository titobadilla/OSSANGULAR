import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from './work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  constructor(private router: Router,private workOrderService:WorkOrderService) { }
  primario:boolean=true;
  secundario:boolean=false;
  terciario:boolean=false;
  ngOnInit() {
  }
  save(){
      this.primario=false;
      this.secundario=true;
      this.terciario=true;
     
  }
}
