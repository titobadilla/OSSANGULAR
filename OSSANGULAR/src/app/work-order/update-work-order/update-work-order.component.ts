import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../work-order.service';
import { WorkOrder } from 'src/model/workorder.model';
import { ListWorkOrder } from 'src/model/listworkorder.model';
import { Client } from 'src/model/client.model';
import { Employee } from 'src/model/employee.model';
import { WorkOrderType } from 'src/model/workordertype.model';
import { Color } from 'src/model/color.model';
import { ListWorkOrderService } from 'src/app/list-work-order/list-work-order.service';
import { WorkOrderTypeService } from 'src/app/work-order-type/work-order-type.service';
import { ClientService } from 'src/app/client/client.service';
import { ColorService } from 'src/app/color/color.service';
import { EmployeeService } from 'src/app/employee/employee.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-update-work-order',
  templateUrl: './update-work-order.component.html',
  styleUrls: ['./update-work-order.component.css']
})
export class UpdateWorkOrderComponent implements OnInit {

  constructor(private serviceWorkOrder: WorkOrderService,
    private listservice: ListWorkOrderService, private serviceWorkOrderTypes: WorkOrderTypeService,
    private serviceClient: ClientService, private serviceEmployee: EmployeeService,
    private serviceColors: ColorService) { }

  workOrder: WorkOrder = new WorkOrder();
  lists: ListWorkOrder[];
  workOrdersType: WorkOrderType[];
  clients: Client[];
  employees: Employee[];
  selectedEmployees: String[];
  startHour: String;
  endHour: String;
  colors: Color[];
  flagView: boolean = false;

  ngOnInit() {
    this.serviceWorkOrder.getByIdWorkOrder(3).subscribe(data => {
      this.workOrder = data;
      this.splitDatesHours(data);
    });
    this.listservice.getAllLists().subscribe(data => {
      this.lists = data;
    });

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

  public editWorkOrder() {

    this.workOrder.startDate = "" + this.workOrder.startDate + "T" + this.startHour + "-0600"
    this.workOrder.endDate = "" + this.workOrder.endDate + "T" + this.endHour + "-0600"

    if (this.flagView) {
      this.workOrder.employees = new Array();
      let i = 0;
      for (i = 0; i < this.selectedEmployees.length; i++) {
        let employee: Employee = new Employee();
        employee.id = this.selectedEmployees[i];
        this.workOrder.employees.push(employee);
      }
    }

    this.serviceWorkOrder.updateWorkOrder(this.workOrder).subscribe();
  }


  private loadDropDownMultiple() {
    let i = 0;
    this.selectedEmployees = [];
    for (i = 0; i < this.workOrder.employees.length; i++) {
      this.selectedEmployees.push(this.workOrder.employees[i].id);
    }
  }
  private viewEmployees() {
    this.loadDropDownMultiple();
    this.flagView = true;
  }

  private splitDatesHours(data: WorkOrder) {
    let start = data.startDate.split(" ");
    let end = data.endDate.split(" ");
    this.workOrder.startDate = start[0];
    this.workOrder.endDate = end[0];
    this.startHour = start[1]
    this.endHour = end[1];
  }



}
