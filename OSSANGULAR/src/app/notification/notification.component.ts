import { Component, OnInit, Input } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-buttons/src/check-box/checkbox.component';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input() class:string;
  @Input() type:string;
  @Input() message:string;

  constructor() { }

  ngOnInit() {
  }

}
