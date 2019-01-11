import { Component, OnInit } from '@angular/core';
import { ListToolWorkOrderService } from './list-tool-work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tool-work-order',
  templateUrl: './list-tool-work-order.component.html',
  styleUrls: ['./list-tool-work-order.component.css']
})
export class ListToolWorkOrderComponent implements OnInit {

  constructor(private router: Router,private listToolWorkOrderService:ListToolWorkOrderService) { }

  ngOnInit() {
  }

}
