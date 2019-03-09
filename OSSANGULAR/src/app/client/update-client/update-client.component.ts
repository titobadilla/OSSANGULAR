import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DropDownListComponent, FilteringEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { GroupClient } from 'src/model/groupclient.model';
import { Province } from 'src/model/province.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Client } from 'src/model/client.model';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { TelephoneClient } from 'src/model/telephoneclient.model';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';
import { ClientComponent } from '../client.component';
import { ProvinceService } from '../province.service';
import { GroupClientService } from 'src/app/group-client/group-client.service';
import { DistrictService } from '../district.service';
import { CantonService } from '../canton.service';

@Component({
  selector: 'update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  @Input() clientId: String;

  @ViewChild('provinceDdl')
  public provinceDdl: DropDownListComponent;
  @ViewChild('cantonDdl')
  public cantonDdl: DropDownListComponent;
  @ViewChild('districtDdl')
  public districtDdl: DropDownListComponent;
  
  public dataGroups: GroupClient[] = new Array();
  public dataProvinces: Province[] = new Array();
  public dataCantons: { [key: string]: Object }[] = new Array();
  public dataDistricts: { [key: string]: Object }[] = new Array();
  public valueGroup: number;
  public valueProvince: any;
  public valueCanton: any;
  public valueDistrict: any;
  
  public fields: Object = { text: 'nameGroup', value: 'idGroup' };
  public watermark: string = 'Seleccione un grupo*';
  public watermarkProvinces: string = 'Seleccione una provincia*';
  public fieldsProvinces: Object = { text: 'name', value: 'id' };
  public fieldsCantons: Object = { text: 'name', value: 'cantonId.id' };
  public watermarkCantons: string = 'Seleccione un cantón*';
  public fieldsDistricts: Object = { text: 'name', value: 'districtId.id' };
  public watermarkDistricts: string = 'Seleccione un distrito*';
  public height: string = '220px';
  viewTelephones:boolean=false;
  

reactForm: FormGroup;
client:Client=new Client();

constructor(private router: Router,private clientService: ClientService, private groupClientService: GroupClientService,
    private provinceService: ProvinceService, private cantonService: CantonService, private districtService: DistrictService,
    private fb: FormBuilder,private parent: ClientComponent) {    

  this.createReactiveForm();
  

  }

  activeCanton(event: any) {
    if (event.itemData != undefined) {
      this.districtDdl.enabled = false;
      this.getCantons(event.itemData.id);      
      this.client.addressDescription.district.districtId.id=undefined;
      this.district.setValue(undefined);
    }
  }

  activeDistrict(event: any) {
    if (event.itemData != undefined) {
      this.getDistricts(event.itemData.cantonId.id,event.itemData.cantonId.province.id);     
    }
  }

  getProvinces() {
    this.provinceService.getAllProvinces().subscribe(data => {
      this.dataProvinces = data
    });
  }

  getCantons(idProvince: String) {

    this.cantonService.getAllCantonsByProvince(idProvince).subscribe(data => {
      this.dataCantons = Object.assign(data);
      this.cantonDdl.dataBind();
      this.cantonDdl.enabled = true;
    });
  }

  getDistricts(idCanton:String,idProvince:String) {
    this.districtService.getAllDistrictsByProvinceAndCanton(idProvince,idCanton).subscribe(data => {
      this.dataDistricts = Object.assign(data);
      this.districtDdl.dataBind();
      this.districtDdl.enabled = true;      
    });
  }

  getGroupsClients() {
    this.groupClientService.getAllGroupsClients().subscribe(data => {
      this.dataGroups = data
      this.loadClientInReactiveFormWithValidation();
    });
  }  
  

  loadClient(){
    this.clientService.getByIdClient(this.clientId).subscribe(
      data => {
        this.client = data;        
        this.getGroupsClients();
        this.getProvinces();
        this.getCantons(this.client.addressDescription.district.districtId.canton.cantonId.province.id);
        this.getDistricts(this.client.addressDescription.district.districtId.canton.cantonId.id,
          this.client.addressDescription.district.districtId.canton.cantonId.province.id);         
              
              }
    );
  }

 
  createReactiveForm() {
    this.reactForm = new FormGroup({
      'id': new FormControl(),
      'name': new FormControl(),
      'contactName': new FormControl(),
      'contactLastName': new FormControl(),
      'groupClient': new FormControl(),
      'addressDescription': new FormControl(),
      'mobile': new FormControl(),
      'home': new FormControl(),
      'province': new FormControl(),
      'canton': new FormControl(),
      'district': new FormControl()
    });
  }

  dropDownListRequired(control: FormControl) {

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

  loadClientInReactiveFormWithValidation(){
    this.id.setValue(this.client.id);
    this.id.setValidators(FormValidators.required);
    this.id.disable();

    this.name.setValue(this.client.name);
    this.name.setValidators(FormValidators.required);

    this.contactName.setValue(this.client.contactName);
    this.contactName.setValidators(FormValidators.required);

    this.contactLastName.setValue(this.client.contactLastName);
    this.contactLastName.setValidators(FormValidators.required);

    this.groupClient.setValue(this.client.group.nameGroup);
    this.groupClient.setValidators(this.dropDownListRequired);
    this.valueGroup=this.client.group.idGroup;    

    this.province.setValue(this.client.addressDescription.district.districtId.canton.cantonId.province.name);
    this.province.setValidators(this.dropDownListRequired);
    this.valueProvince=this.client.addressDescription.district.districtId.canton.cantonId.province.id;

    this.canton.setValue(this.client.addressDescription.district.districtId.canton.name);
    this.canton.setValidators(this.dropDownListRequired);
    this.valueCanton=this.client.addressDescription.district.districtId.canton.cantonId.id;

    this.district.setValue(this.client.addressDescription.district.name);
    this.district.setValidators(this.dropDownListRequired);
    this.valueDistrict=this.client.addressDescription.district.districtId.id;

    this.addressDescription.setValue(this.client.addressDescription.description);
    this.addressDescription.setValidators(FormValidators.required);

    this.mobile.setValue(this.client.telephones[0]!=undefined?this.client.telephones[0].number:"");
    this.mobile.setValidators([FormValidators.required,this.phoneLength]);

    this.home.setValue(this.client.telephones[1]!=undefined?this.client.telephones[1].number:"");
    this.home.setValidators([this.phoneLength]);
  }

  button(){
    console.log(this.client);
  }


  onChangeDdlGroup(value:any){
    if(value.itemData!=undefined){     
    this.client.group= value.itemData;
     }
  }

  onChangeDdlProvince(value:any){
    if(value.itemData!=undefined){     
    this.client.addressDescription.district.districtId.canton.cantonId.province= value.itemData;
     }
     this.activeCanton(value);
  }

  onChangeDdlCanton(value:any){
    if(value.itemData!=undefined){     
    this.client.addressDescription.district.districtId.canton=value.itemData;
     }
     this.activeDistrict(value);
  }

  onChangeDdlDistrict(value:any){
    if(value.itemData!=undefined){     
    this.client.addressDescription.district=value.itemData;
     }
  }

  
  phoneLength(control: FormControl) {   
    let value = control.value; 
    if(value!=null){
    if (value.length<8 && value.length>=1|| value.length>8) {  
        return {
          phoneError: {
            parsed: value
          }
        }
   
    }}
    return null;
  }




  ngOnInit() {
    this.loadClient();    
    this.initEventSubmit();
  }

  initEventSubmit(){
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.editClient();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }

  get id() { return this.reactForm.get('id'); }
  get name() { return this.reactForm.get('name'); }
  get contactName() { return this.reactForm.get('contactName'); }
  get contactLastName() { return this.reactForm.get('contactLastName'); }
  get groupClient() { return this.reactForm.get('groupClient'); }
  get addressDescription() { return this.reactForm.get('addressDescription'); }
  get mobile() { return this.reactForm.get('mobile'); }
  get home() { return this.reactForm.get('home'); }
  get province() { return this.reactForm.get('province') }
  get canton() { return this.reactForm.get('canton') }
  get district() { return this.reactForm.get('district') }

  get formValid() { return this.reactForm.valid }

    public editClient() {   

    if(this.client.telephones[1]===undefined && this.home.value!=""){      
        var telephoneHome=new TelephoneClient();      
        telephoneHome.type="Casa";
        telephoneHome.number=this.home.value;
       this.client.telephones.push(telephoneHome);  
    }else if(this.home.value==="" && this.client.telephones[1]!=undefined){
      this.client.telephones[1].number='';
    } 
    
    this.clientService.updateClient(this.client).subscribe(data=>{
      this.returnView();
    });

  }

  returnView(){
    this.parent.getAllClients();
    this.parent.clientsSection=false;
    this.parent.principalSection=true;
  }

  viewTelephonesHtml(){
    this.viewTelephones=true;
  }

}
