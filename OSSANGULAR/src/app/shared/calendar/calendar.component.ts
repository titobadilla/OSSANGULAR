import { Component, OnInit ,ViewChild} from '@angular/core';

import { extend } from '@syncfusion/ej2-base';
import {
    EventSettingsModel, EventRenderedArgs, ScheduleComponent, MonthService, DayService, WeekService, ResizeService, DragAndDropService
} from '@syncfusion/ej2-angular-schedule';
import { fifaEventsData } from 'src/app/datasource';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  public data: Object[] = <Object[]>extend([], fifaEventsData, null, true);
  public selectedDate: Date = new Date(2018, 5, 21);
  public eventSettings: EventSettingsModel = { dataSource: this.data ,enableTooltip:true};
  public isSelected: Boolean = true;
  public dayInterval: number = 1;
  public weekInterval: number = 1;
  public monthInterval: number = 1;
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;

  onEventRendered(args: EventRenderedArgs): void {
    
      let categoryColor: string = args.data.CategoryColor as string;
      if (!args.element || !categoryColor) {
          return;
      }
      if (this.scheduleObj.currentView === 'Agenda') {
          (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
      } else {
          args.element.style.backgroundColor = categoryColor;
      }
  }
}