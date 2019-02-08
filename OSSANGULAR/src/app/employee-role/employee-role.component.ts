import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employee-role',
  templateUrl: './employee-role.component.html',
  styleUrls: ['./employee-role.component.css']
})
export class EmployeeRoleComponent implements OnInit {
 
 
  ngOnInit(): void {
   
    $(document).ready(function () {
      $('#example').DataTable();
    });
  }



}
