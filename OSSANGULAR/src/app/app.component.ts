import { Component, OnInit, AfterViewInit, AfterContentInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { TokenStorage } from './login/helper/token-storage';
import { EventEmitterLogoutService } from './login/event-emitter-logout.service';
import { Router } from '@angular/router';
import { AuthService } from './login/auth.service';
import { MENU_ITEMS } from './shared/menu/pages-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  menu = MENU_ITEMS;
  login: boolean;

  ngOnInit(){
    this.login = this.validate();
  }

  constructor(private token: TokenStorage, private router: Router, private sync: EventEmitterLogoutService,
    private cdref: ChangeDetectorRef, private authService: AuthService) {
   

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
