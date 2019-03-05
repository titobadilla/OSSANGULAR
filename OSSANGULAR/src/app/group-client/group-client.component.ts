import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GroupClientService } from './group-client.service';
import { Router } from '@angular/router';
import { Client } from 'src/model/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { setCulture } from '@syncfusion/ej2-base';
import { GroupClient } from 'src/model/groupclient.model';

@Component({
  selector: 'app-group-client',
  templateUrl: './group-client.component.html',
  styleUrls: ['./group-client.component.css']
})
export class GroupClientComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.initEventSubmit();
  }

  data: GroupClient[] = new Array();
  public fields: Object = { text: 'nameGroup', value: 'idGroup' };
  public watermark: string = 'Seleccione un grupo*';

  reactForm: FormGroup;
  clientsSection: boolean = false;
  updateSection: boolean = false;
  insertSection: boolean = false;
  formSection: boolean = true;

  group: GroupClient = new GroupClient();
  clients: Client[] = new Array();

  constructor(private router: Router, private groupClientService: GroupClientService) {
    this.createReactiveForm();
    this.associateValues();
  }



  ngOnInit() {
    this.formSection = true;
    setCulture('es-CR');
    this.groupClientService.getAllGroups().subscribe(data => {
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

  search() {
    this.clientsSection = true;
  }

  edit() {
    this.formSection = false;
    this.clientsSection = false;
    this.updateSection = true;
  }

  insert() {
    this.formSection = false;
    this.clientsSection = false;
    this.insertSection = true;
  }

  onChangeDdl(value: any) {
    if (value.itemData != undefined) {
      this.group = this.findClientsByIdGroup(value.itemData.idGroup);
      this.clients = this.group.clients
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
}
