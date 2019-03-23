import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { Client } from 'src/model/client.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';
import { DeleteEmitterService } from '../delete/delete.emitter.service';
import { DeleteComponent } from '../delete/delete.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit,AfterViewInit {

  public clients: Client[];
  clientId: String;
  public pageSettings: Object;
  modalRef: BsModalRef;
  @ViewChild('grid') public grid: GridComponent;
  public flag: boolean = false;

  
  principalSection: boolean = true;
  clientsSection: boolean = false;
  clientDelete:Client; 

  constructor(private clientService: ClientService, 
    private modalService: BsModalService, private deleteService: DeleteEmitterService) {
this.subscribeForDelete();
  }

  private subscribeForDelete(){
    this.deleteService.deleteClient$.subscribe(data => {
      this.aceptDelete();
    });
  }

  public dataBound(): void {
    this.flag = true;
}
  

  ngOnInit(): void {
   this.getAllClients();
   this.pageSettings = {pageCount: 3 };    
    setCulture('es-CR');   
  }

  
  ngAfterViewInit(): void {
    this.grid.pageSettings.pageSize=5;
  }

  getAllClients(){
    this.clientService.getAllClients().subscribe((data: Client[]) => {
      this.clients=data
      
    });
  }

  edit(client: Client) {
    this.clientId = client.id;
    this.principalSection = false;
    this.clientsSection = true;
  }

  delete(client:Client) {
    this.clientDelete=client;
  }


  aceptDelete(){
    this.clientService.deleteClient(this.clientDelete.id).subscribe(data=>{    
        this.getAllClients();
     });
     }

     seeMore(client:Client){       
      this.modalRef = this.modalService.show(DeleteComponent, {
        initialState: {
          title: 'Datos de '+client.name,
          data: client,
          type: 'seeMore'
        }
      });
     }

     openModal(client: Client) {
      this.clientDelete = client;
  
      this.modalRef = this.modalService.show(DeleteComponent, {
        initialState: {
          title: 'Eliminar Cliente',
          data: 'el cliente con el nombre: ' + client.name,
          type: 'client'
        }
      });
    }

     
     public onClicked(e: MouseEvent): void {
      if (!this.flag) { return; }

      let element: HTMLElement = <HTMLInputElement>e.target;


      if (!element.classList.contains('e-tbar-btn-text') && !element.classList.contains('e-tbar-btn')) {
          return;
      }

      element = <HTMLElement>(element.tagName === 'BUTTON' ? element.firstElementChild : element);
      this.flag = false;
      let hidden: boolean = element.classList.contains('e-ghidden');
      let classFn: Function = hidden ? removeClass : addClass;
      classFn([element], 'e-ghidden');


      if (hidden) {
          this.grid.showColumns(element.innerHTML);
      } else {
          this.grid.hideColumns(element.innerHTML);
      }
  }

}
