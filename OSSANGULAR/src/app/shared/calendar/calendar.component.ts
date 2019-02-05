import { Component, OnInit ,ViewChild} from '@angular/core';

import { extend, Internationalization } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, ResizeService, DragAndDropService, ActionEventArgs, KeyEventArgs, View
} from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from 'src/app/datasource';
import {Router} from "@angular/router"



import { loadCldr,L10n } from '@syncfusion/ej2-base';
import { TimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { WorkOrderService } from 'src/app/work-order/work-order.service';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { WorkOrder } from 'src/model/workorder.model';
import { Color } from 'src/model/color.model';
import { Client } from 'src/model/client.model';
import { Observable } from 'rxjs';
import { ArgumentType } from '@angular/compiler/src/core';
L10n.load({
    'es-CR': {
        'schedule': {
            'saveButton': 'Aceptar',
            'cancelButton': 'Cancelar',
            'deleteButton': 'Eliminar',
            'newEvent': '¿Desea crear una orden de trabajo?',
            'today':'Hoy',
            'day':'Por día',
            'week':'Por Semana',
            'month':'Por mes',
            'agenda':'Agenda',
            'more':'más'
        },
        'calendar':{
            'today':'Hoy'
        },
    }
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent  implements OnInit{


  public data:WorkOrder[];
  public selectedDate: Date = new Date();
  public eventSettings: EventSettingsModel ;
  public isSelected: Boolean = true;
  public dayInterval: number = 1;
  public weekInterval: number = 1;
  public monthInterval: number = 1;
  public flag:boolean=false;
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public showQuickInfo: boolean = true;
  public instance: Internationalization = new Internationalization();
  public startdate: Date = new Date(2000, 0, 1, 8);
  public enddate: Date = new Date(2000, 0, 1, 21);
  public readonly: boolean = false;
  public flagDoubleClick:boolean=false;
  public flagKeyDown:boolean=false;
  public scheduleView: View = 'Week';

    public constructor(private router: Router,private workOrderService:WorkOrderService ){
     
        this.addEventsNews();
    
}

addEventsNews(){
    document.body.addEventListener('keydown', (e: KeyboardEvent) => {
    });
}


ngOnInit(){
    this.getAllWorkOrders();
    this.scheduleObj.startHour = this.instance.formatDate(this.startdate, { skeleton: 'Hm' });
    this.scheduleObj.endHour = this.instance.formatDate(this.enddate, { skeleton: 'Hm' });  
}

onCellClick(arg: EventRenderedArgs){

    return arg.cancel=true;
}


    getAllWorkOrders(){
        this.workOrderService.getAllWorkOrders().subscribe(data=>{
            this.data=data;
            this.loadDataCalendar();
        });

    }

    loadDataCalendar(){

        this.eventSettings={ dataSource: this.data ,enableTooltip:true, fields: {
            subject: { title: 'Nombre del cliente', name: 'nameClientOptional', default: 'Nombre' },
            location: { title: 'Ubicación del trabajo', name: 'locationClientOptional', default: 'Descripción' },
            description: { title: 'Descripción del trabajo', name: 'description' },
            startTime: { title: 'De', name: 'startDate' },
            endTime: { title: 'Hasta', name: 'endDate' }
        }};
    }
   
    onCellDoubleClick(): void {
       
        this.flagDoubleClick=true; 
    }


    onPopupOpen(arg: EventRenderedArgs){

      if((arg.type==='Editor' && !this.flagDoubleClick) || arg.type==='DeleteAlert' || this.flagKeyDown ){
         this.flagKeyDown=false;
            return arg.cancel=true;
        }else{
            this.flagDoubleClick=false;
        }
    }

    onKeyDown(arg: EventRenderedArgs){
       this.flagKeyDown=true;
    }

  onEventRendered(args: EventRenderedArgs): void {
   
      let color: Color = args.data.color as Color;
      let categoryColor:string=color.color;
      if (!args.element || !categoryColor) {
          return;
      }
      if (this.scheduleObj.currentView === 'Agenda') {
          (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
      } else {
          args.element.style.backgroundColor = categoryColor;
      }
  }


  onNavigating(args: EventRenderedArgs){
   

  }

  onActionBegin(args: ActionEventArgs){
      //Se quita posibilidad de mover eventos en la interfaz
   if(args.requestType==='eventChange'){
       return args.cancel=true;
   }

  }


  changeDate(args: ActionEventArgs){

    /*var startDay = 0; //0=sunday, 1=monday etc.
      var d = this.scheduleObj.selectedDate.getDay(); //get the current day
      var weekStart = new Date(this.scheduleObj.selectedDate.valueOf() - (d<=0 ? 7-startDay:d-startDay)*86400000); //rewind to start day
      var weekEnd = new Date(weekStart.valueOf() + 6*86400000); //add 6 days to get last day

      console.log('Inicia: '+weekStart.toISOString());
      console.log('Finaliza: '+weekEnd);
*/
    
        if(this.scheduleObj.currentView.toString()==='Day'){
            alert('day');
            //llamar loadDayData()
            
        }else if(this.scheduleObj.currentView.toString()==='Week'){
            alert('week');
            //llamar loadWeekData()
        }else if(this.scheduleObj.currentView.toString()==='Month'){
            alert('month');
            //llamar loadMonthData()
        }else if(this.scheduleObj.currentView.toString()==='Agenda'){
            alert('agenda');
            //llamar loadAgendaData()
            let dateStart=new Date(this.scheduleObj.selectedDate);
            let dateStartString=dateStart.toJSON().substring(0,10);
            console.log('Agenda Inicia: '+dateStartString);
            let dateEnd=new Date(dateStart);
            dateEnd.setDate((dateEnd.getDate()+6));
            let dateEndString=dateEnd.toJSON().substring(0,10);
            console.log('Agenda Finaliza: '+(dateEndString));
        }

   // this.data=null;
    this.loadDataCalendar();

  }

  loadWeekData(){

  }

  loadMonthData(){

  }

  loadDayData(){

  }

  loadAgendaData(){

  }

  onRedirect(args: ActionEventArgs): void{

      //si se cambió de fecha(mandar a recargar datos)
      if(args.requestType==='viewNavigate' || args.requestType==='dateNavigate'){
        return this.changeDate(args);
      }     

      if(this.flag){     
          if(args.data!=undefined){
         this.router.navigate(['/work-order'])
        }
    }else{
        this.flag=!this.flag;
    }   
  }

  

}