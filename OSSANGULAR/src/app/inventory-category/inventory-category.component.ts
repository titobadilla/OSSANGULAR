import { Component, OnInit } from '@angular/core';
import { InventoryCategoryService } from './inventory-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.css']
})
export class InventoryCategoryComponent implements OnInit {

  constructor(private router: Router,private inventoryCategoryService:InventoryCategoryService) { }

  ngOnInit() {
  }

}
