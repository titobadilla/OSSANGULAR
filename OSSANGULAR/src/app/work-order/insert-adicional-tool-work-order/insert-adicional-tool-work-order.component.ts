import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { WorkOrderTool } from 'src/model/workOrdertool.model';
@Component({
  selector: 'insert-adicional-tool-work-order',
  templateUrl: './insert-adicional-tool-work-order.component.html',
  styleUrls: ['./insert-adicional-tool-work-order.component.css']
})
export class InsertAdicionalToolWorkOrderComponent implements OnInit, AfterViewInit {
 
  //initialize number pages
  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  //basic variables
  reactForm: FormGroup;
  modalRef: BsModalRef;
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  //dropdown variables
  tools: Tool[] = new Array();
  @ViewChild('dropdown') public listObj: DropDownListComponent;
  public toolWorkOrder: Object = { text: 'name', value: 'id' };
  public toolWatermark: string = 'Seleccione las herramientas*';

  //workOrderTool manage
  workOrderToolSelected: WorkOrderTool;
  selectedTools: WorkOrderTool[] = new Array();
  quantityTool: number = 0;
  newQuantityTool: number = 0;
  addQuantityT: boolean = false;
  toolDelete: WorkOrderTool = new WorkOrderTool();  
  dataTool:WorkOrderTool[];

  constructor(private serviceTool: ToolService, private modalService: BsModalService,
    private deleteService: DeleteEmitterService) {
    this.createReactiveForm();
  }

  ngOnInit() {

    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');

    this.serviceTool.getAllTool().subscribe(data => {
      this.tools = data;      
      this.databaseChargedData();
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

  //verify the changes in the dropdown
  onChangeDdlTool(value: any) {
    if (value.itemData != undefined) {
      this.workOrderToolSelected= new WorkOrderTool();
      this.workOrderToolSelected.id.tool = this.findToolById(value.itemData.id);
      this.quantityTool = this.workOrderToolSelected.id.tool.quantity;
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

  databaseChargedData(){
    if(this.dataTool!=undefined){
    this.dataTool.forEach(element => {
      this.workOrderToolSelected=element;   
      this.addFromDatabase();
    });
  }
  }  

  addFromDatabase() {  
    this.selectedTools.push(this.workOrderToolSelected);
    this.grid.refresh();
    this.tools = this.removeElementAddedOfDropdown(this.tools, this.workOrderToolSelected);
    this.addQuantityT = false;
}


  //add workOrderTool Selected in the selected and add into the table
  addSelectedInventory() {
    if (this.quantityToolNew.value != 'null' && this.quantityToolNew.value > 0) {

      this.workOrderToolSelected.quantity = this.newQuantityTool;
      this.selectedTools.push(this.workOrderToolSelected);
      this.grid.refresh();

      this.tools = this.removeElementAddedOfDropdown(this.tools, this.workOrderToolSelected);

      this.addQuantityT = false;

    } if (this.quantityToolNew.value <= 0) {

      this.openModalValidate(this.workOrderToolSelected);
      this.quantityToolNew.reset();
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele, index) {
      return index != value;
    });
  }

  removeElementAddedOfDropdown(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id === elementSelected.id.tool.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }

  removeElementAddedOfTable(arr, elementSelected) {
    let aux;
    arr.forEach((element, index) => {
      if (element.id.tool.id === elementSelected.id.tool.id) {
        aux = this.arrayRemove(arr, index);
      }
    });
    return aux
  }

  openModal(tool: WorkOrderTool) {
    this.toolDelete = tool;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Herramienta de la Orden de Trabajo',
        data: 'la herramienta con el nombre: ' + tool.id.tool.name,
        type: 'toolOfWorkOrder'
      }
    });
  }

  openModalValidate(tool: WorkOrderTool) {

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Alerta!',
        data: tool.id.tool.name,
        type: 'quantityValidate'
      }
    });
  }

  deleteOfTable() {
    this.selectedTools = this.removeElementAddedOfTable(this.selectedTools, this.toolDelete)
    this.grid.refresh();
    this.tools.push(this.toolDelete.id.tool);
    //this.listObj.refresh();
  }
}
