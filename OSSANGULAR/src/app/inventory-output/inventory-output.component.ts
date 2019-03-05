import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { InventoryOutputSpecificComponent } from './inventory-output-specific/inventory-output-specific.component';
@Component({
  selector: 'app-inventory-output',
  templateUrl: './inventory-output.component.html',
  styleUrls: ['./inventory-output.component.css']
})
export class InventoryOutputComponent implements OnInit {

  ngOnInit() {
  }
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal() {
    this.modalRef = this.modalService.show(InventoryOutputSpecificComponent,  {
      initialState: {
        title: 'Modal title',
        data: {}
      }
    });
  }

}
