import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolService } from './tool.service';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Tool } from 'src/model/tool.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  constructor(private toolService: ToolService,
    private modalService: BsModalService, private deleteService: DeleteEmitterService) { }

  public data: Tool[];
  public pageSettings: Object;
  @ViewChild('grid') public grid: GridComponent;

  toolId: number;
  principal: boolean = true;
  editSection: boolean = false;
  insertSection = false;
  toolDelete: Tool;
  modalRef: BsModalRef;

  ngOnInit(): void {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.getAlltools();

    this.deleteService.deleteTool$.subscribe(data => {
      this.aceptDelete();
    });
  }

  getAlltools() {
    this.toolService.getAllTool().subscribe((data:Tool[])=>{
      this.data=data;
    });
  }

  edit(element: Tool) {
    this.toolId = element.id;
    this.principal = false;
    this.editSection = true;
  }

  aceptDelete() {
    this.toolService.deleteTool(this.toolDelete.id).subscribe(data => {
      this.getAlltools();
    })
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }

  openModal(tool: Tool) {
    this.toolDelete = tool;

    this.modalRef = this.modalService.show(DeleteComponent, {
      initialState: {
        title: 'Eliminar la Herramienta de Inventario',
        data: 'la herramienta con el nombre: ' + tool.name,
        type: 'tool'
      }
    });
  }
}
