import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

import { NbMenuService, NbSidebarService, NbMenuItem } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { Route, Router } from '@angular/router';
import { TokenStorage } from 'src/app/login/helper/token-storage';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthService } from 'src/app/login/auth.service';
import { filter, map } from 'rxjs/operators';
import { NbMenuBag } from '@nebular/theme/components/menu/menu.service';
import { NbLogoutComponent } from '@nebular/auth';
import { AppComponent } from 'src/app/app.component';
import { EventEmitterLogoutService } from 'src/app/login/event-emitter-logout.service';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs';
import { SampleLayoutComponent } from '../../layouts';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  tag = 'my-context-menu';
  stopCondition:boolean=false;

  userMenu = [{ title: 'Cambiar Contraseña', data: { id: 'changePassword' } }, { title: 'Cerrar Sesión', data: { id: 'logout' } }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private router: Router,
    private token: TokenStorage,
    private app: AppComponent,
    private emitter:EventEmitterLogoutService,
    private sample:SampleLayoutComponent) {

  }

  ngOnInit() {
    this.user = this.authService.getTokenUser();
    this.emitter._logoutByCellForm$.subscribe(data=>{
      this.logout();
    });
    this.menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === this.tag))
      .subscribe(bag => {
        if (bag.item.data.id === 'logout') {
          this.logout();
        } else if (bag.item.data.id === 'changePassword') {
          this.changePassword();
        }
      });
      this.logoutSystem();
  }

logoutSystem(){
  Observable.interval(1000)
    .takeWhile(() => !this.stopCondition)
    .subscribe(i => { 
       this.logoutPrivateBySystem();
    })

}

logoutPrivateBySystem(){
  if(this.authService.isAuthenticated() && this.authService.isTokenExpired()){
    /*this.token.signOutSystem();    
    this.app.ngOnInit();
    */
   this.stopCondition=true;
    alert('tokenVencido');
  }
}
  changePassword() {

  }

  logout() {
    this.stopCondition=true;
    this.token.signOut();        
    this.app.ngOnInit();
  }

  

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    if(window.innerWidth<=667){
      this.sample.flag=true;
     }else{
      this.sample.flag=false;
     }

    return false;
  }
  //redirigir a pagina inicial
  goToHome() {
    this.router.navigate(['/']);
  }

}
