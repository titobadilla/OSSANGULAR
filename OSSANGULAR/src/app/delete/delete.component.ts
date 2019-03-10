import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { EmployeeComponent } from '../employee/employee.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { viewParentEl } from '@angular/core/src/view/util';
import { DeleteEmitterService } from './delete.emitter.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  title;
  data;
  type;

  constructor(public modalRef: BsModalRef, private deleteService: DeleteEmitterService
  ) { }

  ngOnInit() {
  }

  acceptDelete() {
    if (this.type === 'employee') {
      this.deleteService.setDeleteEmployee(true);
      this.modalRef.hide();
    }

    if (this.type === 'role') {
      this.deleteService.setDeleteEmployeeRole(true);
      this.modalRef.hide();
    }
  }

  cancelDelete() {
    this.modalRef.hide();
  }

}
