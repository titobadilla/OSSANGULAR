import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { GroupClientService } from '../group-client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from 'src/model/client.model';
import { ClientService } from 'src/app/client/client.service';
import { MultiSelectComponent, SelectEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxComponent } from '@syncfusion/ej2-angular-buttons';
import { GroupClient } from 'src/model/groupclient.model';
import { RemoveEventArgs } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'update-group-client',
  templateUrl: './update-group-client.component.html',
  styleUrls: ['./update-group-client.component.css']
})
export class UpdateGroupClientComponent implements OnInit {

  @Input() groupid: number;
  public fields: Object = { text: 'name', value: 'id' };
  public watermark: string = 'Seleccione un cliente*';
  reactForm: FormGroup;
  clients: Client[] = new Array();
  headClient: String;
  group:GroupClient = new GroupClient();
  selectedClients:Client[]=new Array();
  @ViewChild('checkbox') public mulObj: MultiSelectComponent;
  @ViewChild('selectall') public checkboxObj: CheckBoxComponent;
  public mode: string;
  public filterPlaceholder: string;

  constructor(private groupClientService: GroupClientService, private clientService: ClientService) {
    this.createReactiveForm();
    this.associateValues();
  }

  select(value:any){
    let action=value.name;
    let client=value.itemData as Client;
    let aux;
    if(action==='select'){
      this.selectedClients.push(client);
      console.log(this.selectedClients);
    }else if(action='removing'){
      this.selectedClients.forEach((element,index)=>{        
        if(element.id===client.id){
          aux=this.arrayRemove(this.selectedClients,index);
        }
      });
      this.selectedClients=aux;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele,index){
        return index != value;
    });
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
        } else {
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

 

}
