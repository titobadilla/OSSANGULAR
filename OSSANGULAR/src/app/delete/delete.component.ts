import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeComponent } from '../employee/employee.component';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  title;
  data;
  type;

  constructor(public modalRef: BsModalRef
              ) { }

  ngOnInit() {
  }

  acceptDelete(){
    if(this.type === 'employee'){
      this.modalRef.hide();
     // this.employeeParent.aceptDelete();
    }
  }

  cancelDelete(){
    this.modalRef.hide();
  }

}
