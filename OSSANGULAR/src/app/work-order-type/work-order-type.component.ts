import { Component, OnInit } from '@angular/core';
import { WorkOrderTypeService } from './work-order-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-order-type',
  templateUrl: './work-order-type.component.html',
  styleUrls: ['./work-order-type.component.css']
})
export class WorkOrderTypeComponent implements OnInit {

  constructor(private router: Router,private workOrderTypeService:WorkOrderTypeService) { }

  ngOnInit() {
  }

}
