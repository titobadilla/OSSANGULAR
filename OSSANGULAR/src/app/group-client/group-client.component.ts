import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupClientService } from './group-client.service';
import { Router } from '@angular/router';
import { Client } from 'src/model/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-group-client',
  templateUrl: './group-client.component.html',
  styleUrls: ['./group-client.component.css']
})
export class GroupClientComponent implements OnInit {

  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un cliente*';
  reactForm: FormGroup;
  headClient: String;
  clientsSection = false;
  updateSection = false;
  formSection = true;
  clientsOfHeadClient: Client[] = new Array();
  displayedColumns: string[] = ['name', 'contactName'];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private groupClientService: GroupClientService) {
    this.createReactiveForm();
    this.associateValues();
  }

  clients: Client[] = new Array();

  ngOnInit() {
    this.initEventSubmit();
    this.groupClientService.getAllHeadClients().subscribe(data => {
      this.clients = data;
    });
  }

  associateValues() {
    this.headClient = this.client.value;
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
          // this.saveEmployee();
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
    this.groupClientService.getClientsOfHeadClient(this.headClient).subscribe(data => {
      this.dataSource = new MatTableDataSource<Client>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  edit() {
    this.formSection = false;
    this.clientsSection=false;
  this.updateSection = true;
  
  alert('hola')
  }
}
