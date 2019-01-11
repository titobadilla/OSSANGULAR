import { Component, OnInit } from '@angular/core';
import { TelephoneEmployeeService } from './telephone-employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telephone-employee',
  templateUrl: './telephone-employee.component.html',
  styleUrls: ['./telephone-employee.component.css']
})
export class TelephoneEmployeeComponent implements OnInit {

  constructor(private router: Router,private telephoneEmployee:TelephoneEmployeeService) { }

  ngOnInit() {
  }

}
