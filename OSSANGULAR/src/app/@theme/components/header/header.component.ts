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

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  tag = 'my-context-menu';
  

  userMenu = [{ title: 'Cambiar Contraseña', data: { id: 'changePassword' } }, { title: 'Cerrar Sesión', data: { id: 'logout' } }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private router: Router,
    private token: TokenStorage,
    private app: AppComponent) {

  }

  ngOnInit() {
    this.user = this.authService.getTokenUser();
    this.menuService.onItemClick()
      .pipe(filter(({ tag }) => tag === this.tag))
      .subscribe(bag => {
        if (bag.item.data.id === 'logout') {
          this.logout();
        } else if (bag.item.data.id === 'changePassword') {
          this.changePassword();
        }
      });
  }


  changePassword() {

  }

  logout() {
    this.token.signOut();    
    this.app.ngOnInit();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }
  //redirigir a pagina inicial
  goToHome() {
    this.router.navigate(['/']);
  }

}
