import { Component, OnInit } from '@angular/core';
import { ListWorkOrderService } from './list-work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-work-order',
  templateUrl: './list-work-order.component.html',
  styleUrls: ['./list-work-order.component.css']
})
export class ListWorkOrderComponent implements OnInit {

  constructor(private router: Router,private listWorkOrderService:ListWorkOrderService) { }

  ngOnInit() {
  }

}
