import { Component, OnInit, ViewChild, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Material } from 'src/model/material.model';
import { MaterialService } from 'src/app/material/material.service';
import { setCulture } from '@syncfusion/ej2-base';
import { DeleteComponent } from 'src/app/delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from 'src/app/delete/delete.emitter.service';
import { WorkOrderMaterial } from 'src/model/workOrdermaterial.model';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs';
@Component({
  selector: 'insert-adicional-material-work-order',
  templateUrl: './insert-adicional-material-work-order.component.html',
  styleUrls: ['./insert-adicional-material-work-order.component.css']
})
export class InsertAdicionalMaterialWorkOrderComponent implements OnInit {

  flag: boolean = true;
  flag2: boolean = false;

  //basic variables
  reactForm: FormGroup;
  modalRef: BsModalRef;
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  //dropdown variables
  @ViewChild('dropdown') public listObj: DropDownListComponent;
  materials: Material[] = new Array();
  public materialWorkOrder: Object = { text: 'name', value: 'id' };
  public materialWatermark: string = 'Seleccione los materiales*';

  //variables necessary
  selectedMaterials: WorkOrderMaterial[] = new Array();
  quantityMaterial: number = 0;
  newQuantityMaterial: number = 0;
  materialSelected: WorkOrderMaterial;
  addQuantityM: boolean = false;
  materialDelete: WorkOrderMaterial;

  constructor(private serviceMaterial: MaterialService, private modalService: BsModalService,
    private deleteService: DeleteEmitterService) {
    this.createReactiveForm();
  }

  getMaterials() {
    this.serviceMaterial.getAllMaterial().subscribe(data => {
      this.materials = data;
    })
  }

  ngOnInit() {

    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.getMaterials();

    this.initEventSubmit();

    this.deleteService.deleteMaterialOfWorkOrder$.subscribe(data => {
      this.deleteOfTable();
    });
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.quantityMaterialNew.valid) {

        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }

  createReactiveForm() {
    this.reactForm = new FormGroup({
      'materialsMulti': new FormControl('', []),
      'quantityMaterial': new FormControl('', []),
      'newQuantityMaterial': new FormControl('', [FormValidators.required])
    });
  }

  get materialsMulti() { return this.reactForm.get('materialsMulti'); }
  get quantityMat() { return this.reactForm.get('quantityMaterial'); }
  get quantityMaterialNew() { return this.reactForm.get('newQuantityMaterial'); }

  onChangeDdlMaterial(value: any) {
    if (value.itemData != undefined) {

      this.materialSelected = new WorkOrderMaterial();
      this.materialSelected.id.material = this.findMaterialById(value.itemData.id);
      this.quantityMaterial = this.materialSelected.id.material.quantity;
      this.newQuantityMaterial = this.quantityMaterial;

      this.quantityMaterialNew.enable();
      this.quantityMat.setValue(this.quantityMaterial);
      this.quantityMaterialNew.setValue(this.quantityMaterial);
      this.quantityMat.disable();

      this.addQuantityM = true;
    }
    else {
      this.addQuantityM = false;
    }
  }

  findMaterialById(id: number): any {
    let elementReturn;
    this.materials.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  addSelectedInventory() {
    if (this.quantityMaterialNew.value != 'null' && this.quantityMaterialNew.value > 0) {
      this.materialSelected.quantity = this.newQuantityMaterial;
      this.selectedMaterials.push(this.materialSelected);
      this.grid.refresh();

      this.materials = this.removeElementAdded(this.materials, this.materialSelected.id.material)
      this.addQuantityM = false;

    } if (this.quantityMaterialNew.value <= 0) {
      this.openModalValidate(this.materialSelected);
      this.quantityMaterialNew.reset();
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  removeElementAdded(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id === elementSelected.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }

  removeElementAddedOfTable(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id.material.id === elementSelected.id.material.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }

  openModal(material: WorkOrderMaterial) {
    this.materialDelete = new WorkOrderMaterial();
    this.materialDelete = material;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar el Material de la Orden de Trabajo',
        data: 'el material con el nombre: ' + material.id.material.name,
        type: 'materialOfWorkOrder'
      }
    });
  }

  openModalValidate(material: WorkOrderMaterial) {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Alerta!',
        data: material.id.material.name,
        type: 'quantityValidate'
      }
    });
  }

  update() {
    this.flag = true;
  }
  deleteOfTable() {
    this.flag = false;
    this.selectedMaterials = this.removeElementAddedOfTable(this.selectedMaterials, this.materialDelete)
    this.grid.refresh();
    this.materials.push(this.materialDelete.id.material);
    this.listObj.dataBind();
    this.listObj.refresh();
    this.noHide();

  }

  noHide() {
    var cont = 0;
    Observable.interval(0.0001)
      .takeWhile(() => cont === 0)
      .subscribe(i => {
        cont++;
        this.update();
      })

  }


}
