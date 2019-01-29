import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from 'src/model/workorder.model';

@Component({
  selector: 'app-update-work-order',
  templateUrl: './update-work-order.component.html',
  styleUrls: ['./update-work-order.component.css']
})
export class UpdateWorkOrderComponent implements OnInit {

  constructor(private serviceWorkOrder:WorkOrderService) { }

  workOrder:WorkOrder = new WorkOrder();

  ngOnInit() {
    this.serviceWorkOrder.getByIdWorkOrder(3).subscribe(data =>{
        this.workOrder = data;
    });
  }

}
