import { Component, OnInit, AfterViewInit, AfterContentInit, OnChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { TokenStorage } from './login/helper/token-storage';
import { EventEmitterLogoutService } from './login/event-emitter-logout.service';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { MENU_ITEMS } from './shared/menu/pages-menu';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  menu = MENU_ITEMS;
  login: boolean;

  messageSesionClosedByUser: boolean = false;
  messageSesionClosedBySystem: boolean = false;


  ngOnInit() {
    this.login = this.validate();
    
  }


  constructor(private token: TokenStorage, private router: Router, private emitterService: EventEmitterLogoutService,
    private cdref: ChangeDetectorRef, private authService: AuthService) {
     

    emitterService.messageSesionClosedByUser$.subscribe(data => { this.messageSesionClosedByUser = data });
    emitterService.messageSesionClosedBySystem$.subscribe(data => { this.messageSesionClosedBySystem = data });


  }

  
  detectChanges() {
    this.cdref.detectChanges();
  }


  validate() {
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {
      return true;
    }
    return false;
  }


}
