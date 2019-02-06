import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  

  constructor(private router: Router,private employeeService:EmployeeService) { 

  }


 


  ngOnInit() {
  }

}
