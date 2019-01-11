import { Component, OnInit } from '@angular/core';
import { ListDeviceWorkOrderService } from './list-device-work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-device-work-order',
  templateUrl: './list-device-work-order.component.html',
  styleUrls: ['./list-device-work-order.component.css']
})
export class ListDeviceWorkOrderComponent implements OnInit {

  constructor(private router: Router,private listDeviceWorkOrderService:ListDeviceWorkOrderService) { }

  ngOnInit() {
  }

}
