import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GroupClientService } from '../group-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from 'src/model/client.model';
import { ClientService } from 'src/app/client/client.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { GroupClient } from 'src/model/groupclient.model';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  selector: 'update-group-client',
  templateUrl: './update-group-client.component.html',
  styleUrls: ['./update-group-client.component.css']
})
export class UpdateGroupClientComponent implements OnInit {

  @Input() groupid: number;

  //multiple dropdown
  @ViewChild('checkbox') public mulObj: MultiSelectComponent;
  @ViewChild('selectall') public checkboxObj: CheckBoxComponent;

  public fields: Object = { text: 'name', value: 'id' };
  public watermarkMultiple: string = 'Seleccione los clientes*';
  clients: Client[] = new Array();
  selectedClients: Client[] = new Array();
  public filterPlaceholder: string;
  public box: string = 'Box';
  public popHeight: string = '350px';

  //necessary global variables
  public watermark: string = 'Seleccione el cabecilla*';
  reactForm: FormGroup;
  group: GroupClient = new GroupClient();

  constructor(private groupClientService: GroupClientService, private clientService: ClientService) {
    this.createReactiveForm();
    this.associateValues();
  }

  select(value: any) {
    let action = value.name;
    let client = value.itemData as Client;
    let aux;
    if (action === 'select') {
      this.selectedClients.push(client);
      console.log(this.selectedClients);
    } else if (action = 'removing') {
      this.selectedClients.forEach((element, index) => {
        if (element.id === client.id) {
          aux = this.arrayRemove(this.selectedClients, index);
        }
      });
      this.selectedClients = aux;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  ngOnInit() {
    this.initEventSubmit();
   // this.clientService.getClientsWithoutGroup().subscribe(data => {
   //  this.clients = data;
   // });

    this.groupClientService.getByIdGroupClient(this.groupid).subscribe(data=>{
      this.group= data;
      this.setValuesMultiples();
    })

  }

  setValuesMultiples(){
    this.selectedClients = this.group.clients;
    this.clientsMulti.setValue(this.group.clients);
  }

  associateValues() {
    this.group.nameGroup = this.nameGroup.value
    this.group.contactName = this.contactName.value
    this.group.contactLastName = this.contactLastName.value
    this.group.email = this.email.value
    this.group.phone1 = this.phone1.value
    this.group.phone2 = this.phone2.value
    this.group.clients = this.selectedClients;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'nameGroup': new FormControl('', [FormValidators.required]),
      'contactName': new FormControl('', [FormValidators.required]),
      'contactLastName': new FormControl('', [FormValidators.required]),
      'clientsMulti': new FormControl('', [this.clientRequired]),
      'email': new FormControl('', [FormValidators.email]),
      'phone1': new FormControl('', [FormValidators.required, this.phoneLength]),
      'phone2': new FormControl('', [FormValidators.required, this.phoneLength]),
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
  phoneLength(control: FormControl) {
    let value = control.value;
    if (value != null) {
      if (value.length < 8 && value.length >= 1 || value.length > 8) {
        return {
          phoneError: {
            parsed: value
          }
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
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  get nameGroup() { return this.reactForm.get('nameGroup'); }
  get clientsSelected() { return this.reactForm.get('clientsMulti'); }
  get contactName() { return this.reactForm.get('contactName'); }
  get contactLastName() { return this.reactForm.get('contactLastName'); }
  get clientsMulti() { return this.reactForm.get('clients'); }
  get email() { return this.reactForm.get('email'); }
  get phone1() { return this.reactForm.get('phone1'); }
  get phone2() { return this.reactForm.get('phone2'); }

  public updateGroup() {
   /*/ this.groupClientService.updateGroupClient(this.group).subscribe(data => {
      this.reactForm.reset()
    }
    );/*/
      console.log(this.group)
  }


}
