import { Component, OnDestroy } from '@angular/core';
import { delay, withLatestFrom, takeWhile } from 'rxjs/operators';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';
import { Observable } from 'rxjs';

import { StateService } from '../../../@core/utils';
import { Router } from '@angular/router';
import { EventEmitterLogoutService } from 'src/app/login/event-emitter-logout.service';

// TODO: move layouts into the framework
@Component({
  selector: 'ngx-sample-layout',
  styleUrls: ['./sample.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>
      <nb-layout-header fixed>
        <ngx-header [position]="sidebar.id === 'start' ? 'normal': 'inverse'"></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar"
                   tag="menu-sidebar"
                   responsive
                   [end]="sidebar.id === 'end'">
        <nb-sidebar-header *ngIf="currentTheme !== 'corporate'">
          <a (click)='goCalendar()' class="btn btn-success main-btn">
            <i class="ion ion-calendar"></i> <span> Calendario</span>           
          </a>
          <div *ngIf='flag'>
          <br><br>          
          <a (click)='logout()' class="btn btn-warning">
            <i class="ion ion-play"></i> <span> Cerrar Sesión</span>
          </a>
          </div>
          
        </nb-sidebar-header>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

     
    </nb-layout>
  `,
})
export class SampleLayoutComponent implements OnDestroy {

  deleteElement(){
    var spaceWhite=document.getElementsByClassName('menu-title')[0];
    spaceWhite.className='';  
  }
  
  deleteThread(){
    Observable.interval(1)
      .takeWhile(() => !this.stopCondition)
      .subscribe(i => {
         if(document.getElementsByClassName('menu-title')[0]!=undefined){

            this.deleteElement();
            this.stopCondition=true;
         }
      })
  
  }

  stopCondition:boolean;
  layout: any = {};
  sidebar: any = {};

  private alive = true;
  flag:boolean=false;

  currentTheme: string;

  

  constructor(protected stateService: StateService,
              protected menuService: NbMenuService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,
              protected sidebarService: NbSidebarService,
              private router: Router,
              private emitter:EventEmitterLogoutService) {
                this.deleteThread();
                                
    this.stateService.onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => this.layout = layout);

    this.stateService.onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
    this.menuService.onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20),
      )
      .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {

        if (bpTo.width <= isBp.width) {          
          this.sidebarService.collapse('menu-sidebar');
          
        }
      });

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
    });
  }

  logout(){
    this.emitter.setLogout(true);
  }

  goCalendar(){
    this.router.navigate(['/calendar']);       
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
