import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GroupClientService } from './group-client.service';
import { Client } from 'src/model/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { setCulture } from '@syncfusion/ej2-base';
import { GroupClient } from 'src/model/groupclient.model';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DeleteComponent } from '../delete/delete.component';
import { DeleteEmitterService } from '../delete/delete.emitter.service';

@Component({
  selector: 'app-group-client',
  templateUrl: './group-client.component.html',
  styleUrls: ['./group-client.component.css']
})
export class GroupClientComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.initEventSubmit();
  }
  modalRef: BsModalRef;
  data: GroupClient[] = new Array();
  public fields: Object = { text: 'nameGroup', value: 'idGroup' };
  public watermark: string = 'Seleccione un grupo*';

  reactForm: FormGroup;
  updateSection: boolean = false;
  insertSection: boolean = false;
  formSection: boolean = true;
  groupid: number;
  group: GroupClient = new GroupClient();
  clients: Client[] = new Array();
  groupDelete: GroupClient = new GroupClient();

  constructor(private groupClientService: GroupClientService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.formSection = true;
    setCulture('es-CR');
    this.getAllGroups();
    this.deleteService.deleteGroupClient$.subscribe(data => {
      this.aceptDelete();
    });
  }

  aceptDelete() {
    this.groupClientService.deleteGroupClient(this.groupDelete.idGroup).subscribe(data => {
      this.getAllGroups();
    });
  }

  getAllGroups() {
    this.groupClientService.getAllGroupsClients().subscribe(data => {
      this.data = data;
    })
  }

  associateValues() {
    this.group.idGroup = this.client.value
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'client': new FormControl('', [this.clientRequired]),
    });
  }

  clientRequired(control: FormControl) {

    let value = control.value;
    if ((value === null || value === "" || value === undefined)) {
      return {
        errorD: {
          parsed: value
        }
      }
    }
    return null;
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {

        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  get client() { return this.reactForm.get('client'); }

  edit() {
    this.formSection = false;
    this.updateSection = true;
  }

  insert() {
    this.formSection = false;
    this.insertSection = true;
  }

  seeMore(client: Client) {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Ver Mas',
        data: client,
        type: 'seeMore'
      }
    });
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      this.group = this.findClientsByIdGroup(value.itemData.idGroup);
      this.groupid = this.group.idGroup;
      this.clients = this.group.clients
      this.groupDelete = this.group;
    }
  }

  findClientsByIdGroup(id: number): any {
    let elementReturn;
    this.data.forEach(element => {
      if (element.idGroup == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  openModal() {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar Grupo',
        data: 'el grupo con el nombre: ' + this.group.nameGroup,
        type: 'groupClient'
      }
    });
  }
}
