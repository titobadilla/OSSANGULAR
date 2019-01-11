import { Component, OnInit } from '@angular/core';
import { ListMaterialWorkOrderService } from './list-material-work-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-material-work-order',
  templateUrl: './list-material-work-order.component.html',
  styleUrls: ['./list-material-work-order.component.css']
})
export class ListMaterialWorkOrderComponent implements OnInit {

  constructor(private router: Router,private listMaterialWorkOrderService:ListMaterialWorkOrderService) { }

  ngOnInit() {
  }

}
