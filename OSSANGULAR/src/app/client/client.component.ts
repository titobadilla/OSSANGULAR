import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { Client } from 'src/model/client.model';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { setCulture, removeClass, addClass } from '@syncfusion/ej2-base';

@Component({
  selector: 'client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit,AfterViewInit {

  public clients: Client[];
  clientId: String;
  public pageSettings: Object;

  @ViewChild('grid') public grid: GridComponent;
  public flag: boolean = false;

  
  principalSection: boolean = true;
  clientsSection: boolean = false;
  modalDelete = false;
  clientDelete:Client; 

  constructor(private clientService: ClientService) {

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
    this.modalDelete = true;
  }

  hideModal() {
    this.clientDelete=new Client();
    this.modalDelete = false;
  }

  aceptDelete(){
    this.clientService.deleteClient(this.clientDelete.id).subscribe(data=>{
    
        this.getAllClients();
     });
     this.modalDelete = false;
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
