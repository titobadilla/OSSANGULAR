import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { extend, Internationalization } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, ScheduleComponent, ActionEventArgs, View
} from '@syncfusion/ej2-angular-schedule';
import { Router } from "@angular/router"

import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { WorkOrder } from 'src/model/workOrder.model';
import { Color } from 'src/model/color.model';
import { AuthService } from 'src/app/login/auth.service';
import { Employee } from 'src/model/employee.model';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {

    }

    public data: WorkOrder[];
    public val: Number;
    public idDetail: number;
    public selectedDate: Date = new Date();
    public eventSettings: EventSettingsModel;
    public isSelected: Boolean = true;
    public dayInterval: number = 1;
    public weekInterval: number = 1;
    public monthInterval: number = 1;
    public flag: boolean = false;
    @ViewChild('scheduleObj')
    public scheduleObj: ScheduleComponent;
    public showQuickInfo: boolean = true;
    public instance: Internationalization = new Internationalization();
    public startdate: Date = new Date(2000, 0, 1, 8);
    public enddate: Date = new Date(2000, 0, 1, 21);
    public flagDoubleClick: boolean = false;
    public flagKeyDown: boolean = false;
    public quickInfo: any;

    public constructor(private router: Router, private workOrderService: WorkOrderService, private authService: AuthService) {

        this.addEventsNews();

    }

    addEventsNews() {
        document.body.addEventListener('keydown', (e: KeyboardEvent) => {
        });
    }


    ngOnInit() {

        this.loadDataInit();
        this.scheduleObj.startHour = this.instance.formatDate(this.startdate, { skeleton: 'Hm' });
        this.scheduleObj.endHour = this.instance.formatDate(this.enddate, { skeleton: 'Hm' });
        this.scheduleObj.readonly = this.authService.decode().role === 'ROLE_ADMIN' ? false : true;

        this.scheduleObj.quickInfoTemplates.footer = "<div class='e-popup-footer'></div>";


    }

    detailEmployee() {
        this.router.navigate(['/work-order-detail-general'], { queryParams: { IdWO: this.idDetail } });
        this.flagKeyDown = false;
    }


    onCellClick(arg: EventRenderedArgs) {
        return arg.cancel = true;
    }

    loadDataInit() {
        var curr = new Date(this.scheduleObj.selectedDate); // get current date 
        var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week 
        var last = first + 6; // last day is the first day + 6 

        var firstday = new Date(curr.setDate(first)).toISOString().substring(0, 10);
        var lastday = new Date(curr.setDate(last)).toISOString().substring(0, 10);

        this.loadWeekData(firstday, lastday);

    }

    loadDataCalendar() {

        this.eventSettings = {
            dataSource: this.data, enableTooltip: true, fields: {
                subject: { title: 'Nombre del cliente', name: 'nameClientOptional', default: 'Nombre' },
                location: { title: 'Ubicación del trabajo', name: 'locationClientOptional', default: 'Descripción' },
                description: { title: 'Descripción del trabajo', name: 'description' },
                startTime: { title: 'De', name: 'startDate' },
                endTime: { title: 'Hasta', name: 'endDate' }
            }
        };
    }

    onCellDoubleClick(): void {

        this.flagDoubleClick = true;
    }



    onPopupOpen(arg: EventRenderedArgs) {

        if (arg.type === 'QuickInfo') {
            var dat = arg.data;
            var button = document.createElement("input");

            button.type = "button";
            button.value = "Detalles";
            button.className = "btn btn-info";

            button.addEventListener('click', (e: any) => {
                this.idDetail = <number>dat.id;
                this.detailEmployee();
            });
            arg.element.firstChild.childNodes[2].appendChild(button);

        }
        /*  if(arg.type==='QuickInfo'){
              var dat=arg.data;    
              this.employeeDetail= <Employee[]>dat.employees; 
              this.employeeDetail.forEach(element => {
                  var br= document.createElement("br");
           var button = document.createElement("input");
         
             button.type = "button";
             button.disabled=true;
             button.value = element.name+" "+element.lastName;
             button.className="btn btn-warning";  
             button.style.margin="1%";
             arg.element.firstChild.appendChild(button);            
              });
          }*/
        else if ((arg.type === 'Editor' && !this.flagDoubleClick)) {
            this.router.navigate(['/update-work-order'], { queryParams: { IdWO: arg.data.id } });
            this.flagKeyDown = false;
            return arg.cancel = true;
        }

        else if (arg.type === 'DeleteAlert' || this.flagKeyDown) {
            this.flagKeyDown = false;

            return arg.cancel = true;
        } else {
            this.flagDoubleClick = false;
        }
    }

    onKeyDown(arg: EventRenderedArgs) {
        this.flagKeyDown = true;
    }

    onEventRendered(args: EventRenderedArgs): void {

        let color: Color = args.data.color as Color;
        let categoryColor: string = color.color;

        if (!args.element || !categoryColor) {
            return;
        }
        if (this.scheduleObj.currentView === 'Agenda') {
            (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
        } else {
            args.element.style.backgroundColor = categoryColor;
        }
    }



    onNavigating(args: EventRenderedArgs) {


    }

    onActionBegin(args: ActionEventArgs) {
        //Se quita posibilidad de mover eventos en la interfaz
        if (args.requestType === 'eventChange') {
            return args.cancel = true;
        }

    }


    changeDate(args: ActionEventArgs) {

        if (this.scheduleObj.currentView.toString() === 'Day') {
            //llamar loadDayData()
            let dateStart = new Date(this.scheduleObj.selectedDate);
            let dateStartString = dateStart.toJSON().substring(0, 10);
            this.loadDayData(dateStartString);

        } else if (this.scheduleObj.currentView.toString() === 'Week') {
            //llamar loadWeekData()

            var curr = new Date(this.scheduleObj.selectedDate); // get current date 
            var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week 
            var last = first + 6; // last day is the first day + 6 

            var firstday = new Date(curr.setDate(first)).toISOString().substring(0, 10);
            var lastday = new Date(curr.setDate(last)).toISOString().substring(0, 10);

            this.loadWeekData(firstday, lastday);

        } else if (this.scheduleObj.currentView.toString() === 'Month') {
            //llamar loadMonthData()
            var date = this.scheduleObj.selectedDate.toISOString();
            this.loadMonthData(date.substring(0, 7));

        } else if (this.scheduleObj.currentView.toString() === 'Agenda') {
            //llamar loadAgendaData()

            let dateStart = new Date(this.scheduleObj.selectedDate);
            let dateStartString = dateStart.toJSON().substring(0, 10);
            let dateEnd = new Date(dateStart);
            dateEnd.setDate((dateEnd.getDate() + 6));
            let dateEndString = dateEnd.toJSON().substring(0, 10);
            this.loadAgendaData(dateStartString, dateEndString);

        }


    }

    loadWeekData(weekStart: String, weekEnd: String) {

        this.workOrderService.getWorkOrderByWeekWithStartDateAndEndDate(weekStart, weekEnd).subscribe(data => {
            this.data = data;
            this.loadDataCalendar();
        });
    }

    loadMonthData(date: String) {
        this.workOrderService.getWorkOrderByMonth(date).subscribe(data => {
            this.data = data;
            this.loadDataCalendar();
        });

    }

    loadDayData(date: String) {
        this.workOrderService.getWorkOrderByStartDate(date).subscribe(data => {
            this.data = data;
            this.loadDataCalendar();
        });
    }

    loadAgendaData(dateStartString: String, dateEndString: String) {
        this.loadWeekData(dateStartString, dateEndString);
    }

    onComplete(args: ActionEventArgs): void {

        //si se cambió de fecha(mandar a recargar datos)
        if (args.requestType === 'viewNavigate' || args.requestType === 'dateNavigate') {
            return this.changeDate(args);
        }

        if (this.flag) {
            if (args.data != undefined) {
                this.router.navigate(['/work-order'])
            }
        } else {
            this.flag = !this.flag;
        }
    }



}