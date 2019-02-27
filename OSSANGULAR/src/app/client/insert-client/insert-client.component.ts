import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/model/client.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { TelephoneClient } from 'src/model/telephoneclient.model';
import { Router } from '@angular/router';
import { GroupClientService } from 'src/app/group-client/group-client.service';
import { ClientService } from '../client.service';
import { GroupClient } from 'src/model/groupclient.model';
import { Province } from 'src/model/province.model';
import { Canton } from 'src/model/canton.model';
import { District } from 'src/model/district.model';
import { ProvinceService } from '../province.service';
import { CantonService } from '../canton.service';
import { DistrictService } from '../district.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.css']
})
export class InsertClientComponent implements OnInit {
  public dataGroups: GroupClient[] = new Array();
  public dataProvinces: Province[] = new Array();
  public dataCantons: { [key: string]: Object }[] = new Array();
  public dataDistricts: { [key: string]: Object }[] = new Array();

  public fields: Object = { text: 'nameGroup', value: 'idGroup' };
  public watermark: string = 'Seleccione un grupo*';
  public watermarkProvinces: string = 'Seleccione una provincia*';
  public fieldsProvinces: Object = { text: 'name', value: 'id' };
  public fieldsCantons: Object = { text: 'name', value: 'cantonId.id' };
  public watermarkCantons: string = 'Seleccione un cantón*';
  public fieldsDistricts: Object = { text: 'name', value: 'districtId.id' };
  public watermarkDistricts: string = 'Seleccione un distrito*';
  reactForm: FormGroup;
  client: Client;

  @ViewChild('provinceDdl')
  public provinceDdl: DropDownListComponent;
  @ViewChild('cantonDdl')
  public cantonDdl: DropDownListComponent;
  @ViewChild('districtDdl')
  public districtDdl: DropDownListComponent;

  constructor(private router: Router, private clientService: ClientService, private groupClientService: GroupClientService,
    private provinceService: ProvinceService, private cantonService: CantonService, private districtService: DistrictService) {
    this.client = new Client();
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.getGroupsClients();
    this.getProvinces();
    this.initEventSubmit();
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
    });
  }

  associateValues() {
    this.client.id = this.id.value;
    this.client.name = this.name.value;
    this.client.contactName = this.contactName.value;
    this.client.contactLastName = this.contactLastName.value;
    this.client.group.idGroup = this.groupClient.value;
    this.client.addressDescription.description = this.addressDescription.value;
    this.client.addressDescription.district.districtId.canton.cantonId.province.id = this.province.value;
    this.client.addressDescription.district.districtId.canton.cantonId.id = this.canton.value;
    this.client.addressDescription.district.districtId.id = this.district.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'id': new FormControl('', [FormValidators.required]),
      'name': new FormControl('', [FormValidators.required]),
      'contactName': new FormControl('', [FormValidators.required]),
      'contactLastName': new FormControl('', [FormValidators.required]),
      'groupClient': new FormControl('', [this.dropDownListRequired]),
      'addressDescription': new FormControl('', [FormValidators.required]),
      'mobile': new FormControl('', [FormValidators.required, this.phoneLength]),
      'home': new FormControl('', [this.phoneLength]),
      'province': new FormControl('', [this.dropDownListRequired]),
      'canton': new FormControl('', [this.dropDownListRequired]),
      'district': new FormControl('', [this.dropDownListRequired])
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

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.saveClient();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

  }


  saveClient() {

    var telephone = new TelephoneClient();
    telephone.type = "Celular";
    telephone.number = this.mobile.value;
    this.client.telephones.push(telephone);

    if (this.home.value.length === 8) {
      var telephoneHome = new TelephoneClient();
      telephoneHome.type = "Casa";
      telephoneHome.number = this.home.value;
      this.client.telephones.push(telephoneHome);
    }

    this.clientService.insertClient(this.client).subscribe(data => {
      this.reactForm.reset();
    });


  }

}
