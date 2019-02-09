import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { EmployeeRole } from 'src/model/employeerole.model';
import { EmployeeRoleService } from '../employee-role.service';
import { Query, DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { MultiSelectComponent, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-insert-employee-role',
  templateUrl: './insert-employee-role.component.html',
  styleUrls: ['./insert-employee-role.component.css']
})
export class InsertEmployeeRoleComponent implements OnInit {

  reactForm: FormGroup;
  role: EmployeeRole = new EmployeeRole();

  constructor(private router: Router, private employeeRoleService: EmployeeRoleService) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  associateValues() {
    this.role.name = this.name.value;
    this.role.type = this.type.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'name': new FormControl('', [FormValidators.required]),
      'type': new FormControl('', [FormValidators.required]),
    });

  }

  get name() { return this.reactForm.get('name'); }
  get type() { return this.reactForm.get('type'); }

  private createEmployeeRole() {
    this.employeeRoleService.insertEmployeeRole(this.role)
      .subscribe(data => {
      });
  }


    // define the JSON of data
    public countries: { [key: string]: Object; }[] = [
      { Name: 'Australia', Code: 'AU' },
          { Name: 'Bermuda', Code: 'BM' },
          { Name: 'Canada', Code: 'CA' },
          { Name: 'Cameroon', Code: 'CM' },
          { Name: 'Denmark', Code: 'DK' },
          { Name: 'France', Code: 'FR' },
          { Name: 'Finland', Code: 'FI' },
          { Name: 'Germany', Code: 'DE' },
          { Name: 'Greenland', Code: 'GL' },
          { Name: 'Hong Kong', Code: 'HK' },
          { Name: 'India', Code: 'IN' },
          { Name: 'Italy', Code: 'IT' },
          { Name: 'Japan', Code: 'JP' },
          { Name: 'Mexico', Code: 'MX' },
          { Name: 'Norway', Code: 'NO' },
          { Name: 'Poland', Code: 'PL' },
          { Name: 'Switzerland', Code: 'CH' },
          { Name: 'United Kingdom', Code: 'GB' },
          { Name: 'United States', Code: 'US' }
      ];
      // maps the local data column to fields property
      public localFields: Object = { text: 'Name', value: 'Code' };
      // set the placeholder to MultiSelect input element
      public localWaterMark: string = 'Select countries';
      // bind the DataManager instance to dataSource property
      public data: DataManager = new DataManager({
          url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
          adaptor: new WebApiAdaptor,
          crossDomain: true
      });
      // bind the Query instance to query property
      public query: Query = new Query().select(['FirstName', 'EmployeeID']).take(10).requiresCount();
      // maps the remote data column to fields property
      public remoteFields: Object = { text:'FirstName',value: 'EmployeeID' };
      // set the placeholder to MultiSelect input element
      public remoteWaterMark: string = 'Select names';

}
