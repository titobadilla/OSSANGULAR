import { Component, TemplateRef, Input, AfterViewInit, AfterContentInit, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs';
import { EventEmitterLogoutService } from 'src/app/login/event-emitter-logout.service';
import { TokenStorage } from 'src/app/login/helper/token-storage';
import { AuthService } from 'src/app/login/auth.service';
import { HeaderComponent } from '../header.component';
 

@Component({
  selector: 'modal-sesion-refresh',
  templateUrl: './modal-sesion-refresh.component.html',
  styleUrls: ['./modal-sesion-refresh.component.css']
})
export class ModalSesionRefreshComponent implements AfterContentInit {
  
  ngAfterContentInit(): void {
    this.datetime=new Date();
    this.reloadTimeNow();
    this.reloadTime();
  }

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  datetime:Date;
  timeNow:any;
  stopCondition:boolean=false;  
  @Input() usernameInput:String;  
  timeToken:Date;
  @ViewChild('template2') temp2:any;

  
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService,private eventEmitter:EventEmitterLogoutService,private authService:AuthService,
    private header:HeaderComponent) {
   
   this.eventEmitter._messageRefreshToken$.subscribe(data=>{this.changesSesion()});
  }

  changesSesion(){
    this.modalRef2.hide();
    this.header.stopCondition=false;
    this.header.logoutSystem();
  }

  loginTimeOut(){
    this.modalRef2 = this.modalService.show(this.temp2, this.config);
  }

  logout(){
    this.stopCondition=true;
    this.modalRef2.hide();
    this.header.logout();
  }

  reloadTimeNow(){   
    this.datetime=new Date();
    this.timeToken=this.authService.getTokenExpirationDate();
      this.datetime.setHours(this.timeToken.getHours()-this.datetime.getHours());
      this.datetime.setMinutes(this.timeToken.getMinutes()-this.datetime.getMinutes());
      this.datetime.setSeconds(this.timeToken.getSeconds()-this.datetime.getSeconds()); 
    let hours=this.datetime.getHours()>9?this.datetime.getHours():'0'+this.datetime.getHours();
    let minutes=this.datetime.getMinutes()>9?this.datetime.getMinutes():'0'+this.datetime.getMinutes();
    let seconds=this.datetime.getSeconds()>9?this.datetime.getSeconds():'0'+this.datetime.getSeconds();
    this.timeNow=hours+':'+minutes +':'+seconds;    
    if(this.timeNow==='00:00:00'){
      this.stopCondition=true;
      this.loginTimeOut();
    }
 
  }

  reloadTime(){
    Observable.interval(1000)
    .takeWhile(() => !this.stopCondition)
    .subscribe(i => {      
       this.reloadTimeNow();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openModalSesion(template: TemplateRef<any>) {
    this.modalRef.hide();
    this.modalRef2 = this.modalService.show(template, this.config);
  }
  

}