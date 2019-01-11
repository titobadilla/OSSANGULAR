import { Component, OnInit } from '@angular/core';
import { MeasurementUnitService } from './measurement-unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-measurement-unit',
  templateUrl: './measurement-unit.component.html',
  styleUrls: ['./measurement-unit.component.css']
})
export class MeasurementUnitComponent implements OnInit {

  constructor(private router: Router,private measurementUnitService:MeasurementUnitService) { }

  ngOnInit() {
  }

}
