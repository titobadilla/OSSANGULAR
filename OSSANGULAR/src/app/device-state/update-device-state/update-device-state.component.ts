import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DeviceState } from 'src/model/devicestate.model';
import { DeviceStateService } from '../device-state.service';
import { DeviceStateComponent } from '../device-state.component';

@Component({
  selector: 'update-device-state',
  templateUrl: './update-device-state.component.html',
  styleUrls: ['./update-device-state.component.css']
})
export class UpdateDeviceStateComponent implements OnInit {

  @Input() deviceStateId: number;

  reactForm: FormGroup;
  deviceState: DeviceState = new DeviceState();

  constructor(private deviceStateService: DeviceStateService, private parent: DeviceStateComponent) {
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
          this.editDeviceState();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });

    this.deviceStateService.getByIdDeviceState(this.deviceStateId).subscribe(data => {
      this.deviceState = data;
    })
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

  private editDeviceState() {
    this.deviceStateService.updateDeviceState(this.deviceState).subscribe(
      data => {
        this.returnView();
      }
    );

  }

  returnView() {
    this.parent.getAllStates();
    this.parent.editSection = false;
    this.parent.principal = true;
  }

}
