import { Component, OnInit, ViewChild } from '@angular/core';
import { ToolService } from './tool.service';
import { setCulture } from '@syncfusion/ej2-base';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Tool } from 'src/model/tool.model';
import { UpdateToolComponent } from './update-tool/update-tool.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize = 5;
  }

  constructor(private toolService: ToolService) { }

  public data: Tool[];
  public pageSettings: Object;
  @ViewChild('updateTool') childOne: UpdateToolComponent;
  @ViewChild('grid') public grid: GridComponent;

  toolId: number;
  principal: boolean = true;
  editSection: boolean = false;
  modalDelete = false;
  insertSection = false;
  toolDelete: Tool;

  ngOnInit(): void {
    this.pageSettings = { pageCount: 3 };
    setCulture('es-CR');
    this.getAlltools();
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

  delete(tool: Tool) {
    this.toolDelete = tool;
    this.modalDelete = true;
  }

  hideModal() {
    this.toolDelete = new Tool();
    this.modalDelete = false;
  }

  aceptDelete() {
    this.toolService.deleteTool(this.toolDelete.id).subscribe(data => {
      this.getAlltools();
    })
    this.modalDelete = false;
  }

  insert() {
    this.principal = false;
    this.insertSection = true;
  }
}
