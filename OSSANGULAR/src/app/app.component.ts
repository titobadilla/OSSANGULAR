import { Component, OnInit, AfterViewInit, AfterContentInit, OnChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TokenStorage } from './login/helper/token-storage';
import { EventEmitterLogoutService } from './login/event-emitter-logout.service';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { MENU_ITEMS } from './shared/menu/pages-menu';
import { MENU_ITEMS_TECHNICAL } from './shared/menu/pages-menu';
import { JwtHelper } from './login/helper/jwt-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  classNotification='notify bar-top do-show';
  typeNotification:string;
  messageNotification:string;


  menu;
  login: boolean;

  messageSesionClosedByUser: boolean = false;
  messageSesionClosedBySystem: boolean = false;


  ngOnInit() {    
    this.login = this.validate();  
  
  }

 


  constructor(private token: TokenStorage, private router: Router, private emitterService: EventEmitterLogoutService,
    private cdref: ChangeDetectorRef, private authService: AuthService) {
     

    emitterService.messageSesionClosedByUser$.subscribe(data => { this.messageSesionClosedByUser = data,
    this.messageNotification='Se ha cerrado sesión correctamente.',
    this.typeNotification='success' });
    emitterService.messageSesionClosedBySystem$.subscribe(data => { this.messageSesionClosedBySystem = data,
      this.messageNotification='Se ha cerrado sesión por inactividad en la pagina.' ,
      this.typeNotification='warning'});


  }

  
  detectChanges() {
    this.cdref.detectChanges(); 
  }

  
  loadMenu(){
  
    this.menu=this.authService.decode().role==='ROLE_ADMIN'?MENU_ITEMS:MENU_ITEMS_TECHNICAL; 
  }

  validate() { 
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {     
      this.loadMenu();   
      return true;
    }
    return false;
  }


}
