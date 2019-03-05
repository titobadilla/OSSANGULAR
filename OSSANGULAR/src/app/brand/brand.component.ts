import { Component, OnInit } from '@angular/core';
import { BrandService } from './brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private router: Router,private brandService:BrandService) { }

  ngOnInit() {
  }



}
