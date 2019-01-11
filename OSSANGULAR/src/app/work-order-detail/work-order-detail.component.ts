import { Component, OnInit } from '@angular/core';
import { WorkOrderDetailService } from './work-order-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-order-detail',
  templateUrl: './work-order-detail.component.html',
  styleUrls: ['./work-order-detail.component.css']
})
export class WorkOrderDetailComponent implements OnInit {

  constructor(private router: Router,private workOrderDetail:WorkOrderDetailService) { }

  ngOnInit() {
  }

}
