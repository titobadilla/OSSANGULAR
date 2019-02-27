import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { Device } from 'src/model/device.model';
import { DeviceService } from '../device.service';
import { Model } from 'src/model/model.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { DeviceStateService } from 'src/app/device-state/device-state.service';
import { ModelService } from 'src/app/model/model.service';
import { DeviceState } from 'src/model/devicestate.model';

@Component({
  selector: 'insert-device',
  templateUrl: './insert-device.component.html',
  styleUrls: ['./insert-device.component.css']
})
export class InsertDeviceComponent implements OnInit {

  reactForm: FormGroup;
  device: Device = new Device();


  public models: Model[] = new Array();
  public modelDevice: Object = { text: 'name', value: 'id' };
  public modelWatermark: string = 'Seleccione un modelo*';

  public categories: InventoryCategory[] = new Array();
  public categoryDevice: Object = { text: 'name', value: 'id' };
  public categoryWatermark: string = 'Seleccione una categoría*';

  public deviceStates: DeviceState[] = new Array();
  public stateDevice: Object = { text: 'state', value: 'id' };
  public stateWatermark: string = 'Seleccione un estado*';

  public measurementsUnits: MeasurementUnit[] = new Array();
  public measurementUnitDevice: Object = { text: 'name', value: 'id' };
  public measurementUnitWatermark: string = 'Seleccione una unidad de medida*';

  constructor(private deviceService: DeviceService, private categoryService: InventoryCategoryService,
    private measurementUnitService: MeasurementUnitService,
    private deviceStateService: DeviceStateService,
    private modelService: ModelService) {
    this.createReactiveForm();
    this.associateValues();
  }

  ngOnInit() {
    this.getValues();
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


  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })

    this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
      this.measurementsUnits = data;
    })

    this.modelService.getAllModels().subscribe(data => {
      this.models = data;
    })

    this.deviceStateService.getAllDevicestates().subscribe(data => {
      this.deviceStates = data;
    })

  }

  associateValues() {
    this.device.serialNumber = this.serialNumber.value;
    this.device.name = this.name.value;
    this.device.description = this.description.value
    this.device.quantity = 0;
    this.device.manufactureModel = this.manufactureModel.value
    this.device.model.id = this.model.value
    this.device.inventoryCategory.id = this.category.value
    this.device.measurementUnit.id = this.measurementUnit.value
    this.device.deviceState.id = this.deviceState.value
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'serialNumber': new FormControl('', [FormValidators.required]),
      'name': new FormControl('', [FormValidators.required]),
      'description': new FormControl('', [FormValidators.required]),
      'manufactureModel': new FormControl('', [FormValidators.required]),
      'model': new FormControl('', [this.valueRequired]),
      'category': new FormControl('', [this.valueRequired]),
      'measurementUnit': new FormControl('', [this.valueRequired]),
      'deviceState': new FormControl('', [this.valueRequired]),
    });

  }

  get serialNumber() { return this.reactForm.get('serialNumber'); }
  get name() { return this.reactForm.get('name'); }
  get description() { return this.reactForm.get('description'); }
  get manufactureModel() { return this.reactForm.get('manufactureModel'); }
  get model() { 
  //  console.log("model: "+this.reactForm.get('model').value)
    return this.reactForm.get('model'); }
  get category() { return this.reactForm.get('category'); }
  get measurementUnit() { return this.reactForm.get('measurementUnit'); }
  get deviceState() { return this.reactForm.get('deviceState'); }


  private createDevice() {
    console.log(this.device.model.id)
    this.deviceService.insertDevice(this.device).subscribe();
  }

  valueRequired(control: FormControl) {

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
}