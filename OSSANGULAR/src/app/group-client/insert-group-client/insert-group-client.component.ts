import { Component, OnInit, ViewChild  } from '@angular/core';
import { GroupClientService } from '../group-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from 'src/model/client.model';
import { ClientService } from 'src/app/client/client.service';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { GroupClient } from 'src/model/groupclient.model';

@Component({
  selector: 'insert-group-client',
  templateUrl: './insert-group-client.component.html',
  styleUrls: ['./insert-group-client.component.css']
})
export class InsertGroupClientComponent implements OnInit {

  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione el cabecilla*';
  public watermarkMultiple: string = 'Seleccione los clientes*';
  reactForm: FormGroup;
  clients: Client[] = new Array();
  headClient: String;
  group:GroupClient = new GroupClient();
  selectedClients:String[];
  @ViewChild('checkbox') public mulObj: MultiSelectComponent;
  @ViewChild('selectall') public checkboxObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;

  constructor(private groupClientService: GroupClientService, private clientService: ClientService) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.initEventSubmit();
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data;
    });
    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Buscar Clientes';
  }

  associateValues() {
    this.group.idHeadClient = this.client.value;
   // this.group.clients = this.clientsSelected.value;
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
  get clientsSelected() { return this.reactForm.get('clients'); }

  public popHeight: string = '350px';

  public insertGroupClient() {
    let i = 0;
    for (i = 0; i < this.selectedClients.length; i++) {
      let client:Client = new Client();
      client.id = this.selectedClients[i];
      this.group.clients.push(client);
      console.log(client.id);
    }
    console.log('head: '+this.group.idHeadClient)
  //  this.groupClientService.insertGroupClient(this.group);
    this.group = new GroupClient();
    this.selectedClients = [];
}

}
