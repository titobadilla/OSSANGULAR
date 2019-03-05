import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'inventory-output-specific',
  templateUrl: './inventory-output-specific.component.html',
  styleUrls: ['./inventory-output-specific.component.css']
})
export class InventoryOutputSpecificComponent implements OnInit {

  title;
  constructor(
    public modalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

}
