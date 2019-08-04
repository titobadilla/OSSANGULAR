import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { GroupClientService } from '../group-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from 'src/model/client.model';
import { ClientService } from 'src/app/client/client.service';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { GroupClient } from 'src/model/groupclient.model';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { GroupClientComponent } from '../group-client.component';

@Component({
  selector: 'update-group-client',
  templateUrl: './update-group-client.component.html',
  styleUrls: ['./update-group-client.component.css']
})
export class UpdateGroupClientComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
 
  }

  @Input() groupid: number;

  @ViewChild('selectObj') public selectObj: MultiSelectComponent;

  public fields: Object = { text: 'name', value: 'id' };
  public watermarkMultiple: string = 'Seleccione los clientes*';
  clients: Client[] = new Array();
  selectedClients: Client[] = new Array();
  public filterPlaceholder: string;
  public box: string = 'Box';
  public popHeight: string = '350px';
  cont=0;

  //necessary global variables
  public watermark: string = 'Seleccione el cabecilla*';
  reactForm: FormGroup;
  group: GroupClient = new GroupClient();

  constructor(private groupClientService: GroupClientService, private clientService: ClientService, private parent: GroupClientComponent) {
    this.createReactiveForm();

  }

  select(value: any) {
    let action = value.name;
    let client = value.itemData as Client;
    let aux;
    console.log(this.cont++);
    if (action === 'select') {
      this.selectedClients.push(client);
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
     this.clientService.getClientsWithoutGroup().subscribe(data => {
      this.clients = data;
      this.loadGroup();
     });


  }

  loadGroup(){    
    this.groupClientService.getByIdGroupClient(this.groupid).subscribe(data => {
      this.group = data;
      this.loadGroupClientInReactiveFormWithValidation();      
    })

  }

  

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'nameGroup': new FormControl(),
      'contactName': new FormControl(),
      'contactLastName': new FormControl(),
      'clientsMulti': new FormControl(),
      'email': new FormControl(),
      'phone1': new FormControl(),
      'phone2': new FormControl(),
    });
  }

  
  loadGroupClientInReactiveFormWithValidation() {

    this.nameGroup.setValue(this.group.nameGroup);
    this.nameGroup.setValidators(FormValidators.required);
    
    this.contactName.setValue(this.group.contactName);
    this.contactName.setValidators(FormValidators.required);

    this.contactLastName.setValue(this.group.contactLastName);
    this.contactLastName.setValidators(FormValidators.required);

    this.loadClientInDdl();    
    this.clientsMulti.setValidators(this.clientRequired);

    this.email.setValue(this.group.email);
    this.email.setValidators(FormValidators.email);

    this.phone1.setValue(this.group.phone1);
    this.phone1.setValidators([FormValidators.required, this.phoneLength]);

    this.phone2.setValue(this.group.phone2);


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

  loadClientInDdl(){
    let array=new Array();
    //this.selectObj.selectAll(true);


    this.group.clients.forEach(e=>{
     array.push(e.id);
     this.clients.push(e);
     this.selectedClients.push(e);
    });
    this.selectObj.refresh();
    this.selectObj.value=array;
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
          console.log('valido');
          this.updateGroup();
        } else {
          console.log('no valido');
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
  get clientsMulti() { return this.reactForm.get('clientsMulti'); }
  get email() { return this.reactForm.get('email'); }
  get phone1() { return this.reactForm.get('phone1'); }
  get phone2() { return this.reactForm.get('phone2'); }

  public updateGroup() {
    /*/ this.groupClientService.updateGroupClient(this.group).subscribe(data => {
       this.reactForm.reset()
     }
     );/*/
    console.log(this.group.nameGroup)
  }
  returnView() {
    this.parent.getAllGroups();
    this.parent.updateSection = false;
    this.parent.formSection = true;
  }

}
