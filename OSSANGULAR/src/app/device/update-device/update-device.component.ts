import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Device } from 'src/model/device.model';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { DeviceService } from '../device.service';
import { Model } from 'src/model/model.model';
import { InventoryCategory } from 'src/model/inventorycategory.model';
import { DeviceState } from 'src/model/devicestate.model';
import { MeasurementUnit } from 'src/model/measurementunit.model';
import { ModelService } from 'src/app/model/model.service';
import { MeasurementUnitService } from 'src/app/measurement-unit/measurement-unit.service';
import { InventoryCategoryService } from 'src/app/inventory-category/inventory-category.service';
import { DeviceStateService } from 'src/app/device-state/device-state.service';
import { DeviceComponent } from '../device.component';

@Component({
  selector: 'update-device',
  templateUrl: './update-device.component.html',
  styleUrls: ['./update-device.component.css']
})
export class UpdateDeviceComponent implements OnInit, AfterViewInit {

  @Input() deviceid: number;

  ngAfterViewInit(): void {
    this.getValues();
  }

  public modelID: number;
  public models: Model[] = new Array();
  public modelDevice: Object = { text: 'name', value: 'id' };
  public modelWatermark: string = 'Seleccione un modelo*';

  public categoryID: number;
  public categories: InventoryCategory[] = new Array();
  public categoryDevice: Object = { text: 'name', value: 'id' };
  public categoryWatermark: string = 'Seleccione una categoría*';

  public stateID: number;
  public deviceStates: DeviceState[] = new Array();
  public stateDevice: Object = { text: 'state', value: 'id' };
  public stateWatermark: string = 'Seleccione un estado*';

  public measurementUnitID: number;
  public measurementsUnits: MeasurementUnit[] = new Array();
  public measurementUnitDevice: Object = { text: 'name', value: 'id' };
  public measurementUnitWatermark: string = 'Seleccione una unidad de medida*';

  device: Device = new Device();
  reactForm: FormGroup;

  constructor(private deviceService: DeviceService,
    private modelService: ModelService,
    private measurementUnitService: MeasurementUnitService,
    private categoryService: InventoryCategoryService,
    private deviceStateService: DeviceStateService,
    private parent: DeviceComponent
  ) {
    this.createReactiveForm();
    this.associateValues();
  }

  associateValues() {
    this.device.serialNumber = this.serialNumber.value;
    this.device.name = this.name.value
    this.device.description = this.description.value
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
  get model() { return this.reactForm.get('model'); }
  get category() { return this.reactForm.get('category'); }
  get measurementUnit() { return this.reactForm.get('measurementUnit'); }
  get deviceState() { return this.reactForm.get('deviceState'); }

  ngOnInit() {
    this.initEventSubmit();
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.editDevice();

        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  onChangeDdl(value: any) {

    if (value.itemData != undefined) {
      if (value.element.id === 'models') {
        this.device.model = this.findModelById(value.itemData.id);
      }
      if (value.element.id === 'categories') {
        this.device.inventoryCategory = this.findInventoryCategoryById(value.itemData.id);
      }
      if (value.element.id === 'measurementsUnits') {
        this.device.measurementUnit = this.findMeasurementUnitById(value.itemData.id);
      }
      if (value.element.id === 'deviceStates') {
        this.device.deviceState = this.findDeviceStateById(value.itemData.id);
      }
    }
  }
  findModelById(id: number): any {
    let elementReturn;
    this.models.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findInventoryCategoryById(id: number): any {
    let elementReturn;
    this.categories.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findMeasurementUnitById(id: number): any {
    let elementReturn;
    this.measurementsUnits.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  findDeviceStateById(id: number): any {
    let elementReturn;
    this.deviceStates.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  getDevice() {
    this.deviceService.getByIdDevice(this.deviceid).subscribe(data => {
      this.device = data;
      this.setValuesInDropdown();
    })
  }

  getValues() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
      this.measurementUnitService.getAllMeasurementUnit().subscribe(data => {
        this.measurementsUnits = data;
        this.modelService.getAllModels().subscribe(data => {
          this.models = data;
          this.deviceStateService.getAllDevicestates().subscribe(data => {
            this.deviceStates = data;
            this.getDevice();
          })
        })
      })
    })
  }

  public editDevice() {
    this.deviceService.updateDevice(this.device).subscribe(data=>{
      this.returnView();
    });
    
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

  setValuesInDropdown() {
    this.serialNumber.setValue(this.device.serialNumber);
    this.serialNumber.setValidators(FormValidators.required);

    this.name.setValue(this.device.name);
    this.name.setValidators(FormValidators.required);

    this.description.setValue(this.device.description);
    this.description.setValidators(FormValidators.required);

    this.manufactureModel.setValue(this.device.manufactureModel);
    this.manufactureModel.setValidators(FormValidators.required);

    this.model.setValue(this.device.model.name);
    this.model.setValidators(this.valueRequired);
    this.modelID = this.device.model.id;

    this.category.setValue(this.device.inventoryCategory.name);
    this.category.setValidators(this.valueRequired)
    this.categoryID = this.device.inventoryCategory.id;

    this.measurementUnit.setValue(this.device.measurementUnit.name);
    this.measurementUnit.setValidators(this.valueRequired)
    this.measurementUnitID = this.device.measurementUnit.id;

    this.deviceState.setValue(this.device.deviceState.state);
    this.deviceState.setValidators(this.valueRequired);
    this.stateID = this.device.deviceState.id;

  }


  returnView() {
    this.parent.getAllDevices();
    this.parent.editSection = false;
    this.parent.principal = true;
  }
}
