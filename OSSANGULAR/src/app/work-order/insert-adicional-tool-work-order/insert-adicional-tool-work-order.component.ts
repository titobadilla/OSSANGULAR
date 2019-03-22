import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { setCulture } from '@syncfusion/ej2-base';
import { DeleteComponent } from 'src/app/delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from 'src/app/delete/delete.emitter.service';
import { Tool } from 'src/model/tool.model';
import { ToolService } from 'src/app/tool/tool.service';
@Component({
  selector: 'insert-adicional-tool-work-order',
  templateUrl: './insert-adicional-tool-work-order.component.html',
  styleUrls: ['./insert-adicional-tool-work-order.component.css']
})
export class InsertAdicionalToolWorkOrderComponent implements OnInit {
  reactForm: FormGroup;
  modalRef: BsModalRef;
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;
  @ViewChild('dropdown') public listObj: DropDownListComponent;

  tools: Tool[] = new Array();
  selectedTools: Tool[] = new Array();
  public toolWorkOrder: Object = { text: 'name', value: 'id' };
  public toolWatermark: string = 'Seleccione las herramientas*';
  tool: Tool = new Tool();
  quantityTool: number = 0;
  newQuantityTool: number = 0;
  toolSelected: Tool = new Tool();
  addQuantityT: boolean = false;
  toolDelete: Tool = new Tool();

  constructor(private serviceTool: ToolService,private modalService: BsModalService,
     private deleteService: DeleteEmitterService) {
    this.createReactiveForm();
  }

  ngOnInit() {

    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.serviceTool.getAllTool().subscribe(data => {
      this.tools = data;
    })

    this.initEventSubmit();

    this.deleteService.deleteToolOfWorkOrder$.subscribe(data => {
      this.deleteOfTable();
    });
  }

  initEventSubmit() {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.quantityToolNew.valid) {
         
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
      'toolsMulti': new FormControl('', []),
      'quantityTool': new FormControl('', []),
      'newQuantityTool': new FormControl('', [FormValidators.required])
    });
  }

  get toolsMulti() { return this.reactForm.get('toolsMulti'); }
  get quantityTo() { return this.reactForm.get('quantityTool'); }
  get quantityToolNew() { return this.reactForm.get('newQuantityTool'); }

  onChangeDdlTool(value: any) {
    if (value.itemData != undefined) {
      this.toolSelected = this.findToolById(value.itemData.id);
      this.quantityTool = this.toolSelected.quantity;
      this.newQuantityTool = this.quantityTool;

      this.quantityTo.setValue(this.quantityTool);
      this.quantityToolNew.setValue(this.quantityTool);
      this.quantityTo.disable();

      this.addQuantityT = true;
    }
    else {
      this.addQuantityT = false;
    }
  }

  findToolById(id: number): any {
    let elementReturn;
    this.tools.forEach(element => {
      if (element.id == id) {
        elementReturn = element;
      }
    });
    return elementReturn;
  }

  addSelectedInventory() {
    if(this.quantityToolNew.value!='null' && this.quantityToolNew.value>0){
    this.toolSelected.quantity = this.newQuantityTool;
    this.selectedTools.push(this.toolSelected);
    this.grid.refresh();

    this.tools = this.removeElementAdded(this.tools, this.toolSelected)
    this.addQuantityT = false;
    }if(this.quantityToolNew.value<=0){
       this.openModalValidate(this.toolSelected);
        this.quantityToolNew.reset();
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

  openModal(tool: Tool) {
    this.toolDelete = tool;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Herramienta de la Orden de Trabajo',
        data: 'la herramienta con el nombre: ' + tool.name,
        type: 'toolOfWorkOrder'
      }
    });
  }

  openModalValidate(tool: Tool) {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Alerta!',
        data: tool.name,
        type: 'quantityValidate'
      }
    });
  }

  deleteOfTable(){
    this.selectedTools = this.removeElementAdded(this.selectedTools, this.toolDelete)
    this.grid.refresh();
    this.tools.push(this.toolDelete); 
    //this.listObj.refresh();
  }
}
