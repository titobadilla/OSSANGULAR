import { Component, OnInit } from '@angular/core';
import { WorkOrderType } from 'src/model/workordertype.model';
import { WorkOrderTypeService } from 'src/app/work-order-type/work-order-type.service';
import { WorkOrder } from 'src/model/workorder.model';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/model/client.model';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Employee } from 'src/model/employee.model';

@Component({
  selector: 'insert-work-order',
  templateUrl: './insert-work-order.component.html',
  styleUrls: ['./insert-work-order.component.css']
})
export class InsertWorkOrderComponent implements OnInit {

  workOrdersType: WorkOrderType[];
  workOrder:WorkOrder = new WorkOrder();
  clients:Client[];
  employees:Employee[];
  constructor(private serviceWorkOrderTypes:WorkOrderTypeService, private serviceClient:ClientService,private serviceEmployee:EmployeeService) { }

  ngOnInit() {

    this.serviceWorkOrderTypes.getAllWorkOrdersType().subscribe(data => {
      this.workOrdersType = data;
    });

    this.serviceClient.getAllClients().subscribe(data =>{
      this.clients = data;
    });

    this.serviceEmployee.getAllEmployees().subscribe(data=>{
      this.employees = data;
    })
  }

  check(){
    console.log(this.workOrder.client);
    console.log(this.workOrder.employees);
    console.log(this.workOrder.description);
    console.log(this.workOrder.workOrderType.name);
  }

}
