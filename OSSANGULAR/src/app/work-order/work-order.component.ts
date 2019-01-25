import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from './work-order.service';
import { Router } from '@angular/router';
import { ListWorkOrderService } from '../list-work-order/list-work-order.service';
import { ListWorkOrder } from 'src/model/listworkorder.model';
import { WorkOrder } from 'src/model/workorder.model';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  constructor(private router: Router,private workOrderService:WorkOrderService,private listservice:ListWorkOrderService) { }
  primary:boolean=true;
  secondary:boolean=false;
  lists:ListWorkOrder[];
  workOrder:WorkOrder = new WorkOrder();
 
  ngOnInit() {
    this.listservice.getAllLists().subscribe(data => {
      this.lists = data;
    });
    this.workOrderService.getAllWorkOrders().subscribe(data =>{
      this.workOrder = data[0];
    })
  }
  save(){
      this.primary=false;
      this.secondary=true;
     
  }
}
