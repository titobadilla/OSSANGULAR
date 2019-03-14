import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DeviceState } from 'src/model/devicestate.model';
import { DeviceStateService } from '../device-state.service';
import { DeviceStateComponent } from '../device-state.component';

@Component({
  selector: 'insert-device-state',
  templateUrl: './insert-device-state.component.html',
  styleUrls: ['./insert-device-state.component.css']
})
export class InsertDeviceStateComponent implements OnInit {

  reactForm: FormGroup;
  deviceState: DeviceState = new DeviceState();

  constructor(private deviceStateService:DeviceStateService, private parent: DeviceStateComponent) {
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
          this.createDeviceState();
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
    this.deviceState.state = this.state.value;
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'state': new FormControl('', [FormValidators.required]),
    });

  }

  get state() { return this.reactForm.get('state'); }

  private createDeviceState() {
    this.deviceStateService.insertDeviceState(this.deviceState).subscribe(data=>{
      this.returnView();
    });
  }

  returnView() {
    this.parent.getAllStates();
    this.parent.insertSection = false;
    this.parent.principal = true;
  }

}
