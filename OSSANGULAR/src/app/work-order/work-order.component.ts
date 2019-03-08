import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from './work-order.service';
import { Router } from '@angular/router';
import { WorkOrder } from 'src/model/workorder.model';
import { WorkOrderTypeService } from '../work-order-type/work-order-type.service';
import { ClientService } from '../client/client.service';
import { EmployeeService } from '../employee/employee.service';
import { Client } from 'src/model/client.model';
import { Employee } from 'src/model/employee.model';
import { WorkOrderType } from 'src/model/workordertype.model';
import { ColorService } from '../color/color.service';
import { Color } from 'src/model/color.model';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  constructor(private router: Router, private workOrderService: WorkOrderService,
 private serviceWorkOrderTypes: WorkOrderTypeService,
    private serviceClient: ClientService, private serviceEmployee: EmployeeService,
    private serviceWorkOrder: WorkOrderService,
    private serviceColors: ColorService) { }

  workOrder: WorkOrder = new WorkOrder();
  workOrdersType: WorkOrderType[];
  clients: Client[];
  employees: Employee[];
  selectedEmployees: String[];
  startHour: String;
  endHour: String;
  colors: Color[];

  ngOnInit() {
   // this.listservice.getAllLists().subscribe(data => {
   //   this.lists = data;
   // });

    this.serviceWorkOrderTypes.getAllWorkOrdersType().subscribe(data => {
      this.workOrdersType = data;
    });

    this.serviceClient.getAllClients().subscribe(data => {
      this.clients = data;
    });

    this.serviceEmployee.getAllEmployees().subscribe(data => {
      this.employees = data;
    })

    this.serviceColors.getAllColors().subscribe(data => {
      this.colors = data;
    })
  }

  public createWorkOrder() {

    this.workOrder.startDate = "" + this.workOrder.startDate + "T" + this.startHour + "-0600"
    this.workOrder.endDate = "" + this.workOrder.endDate + "T" + this.endHour + "-0600"

    let i = 0;
    for (i = 0; i < this.selectedEmployees.length; i++) {
      let employee: Employee = new Employee();
      employee.id = this.selectedEmployees[i];
      this.workOrder.employees.push(employee);
    }
    this.serviceWorkOrder.insertWorkOrder(this.workOrder).subscribe();
    this.workOrder = new WorkOrder();
    this.selectedEmployees = [];
  }

}

