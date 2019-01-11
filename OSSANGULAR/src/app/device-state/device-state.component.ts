import { Component, OnInit } from '@angular/core';
import { DeviceStateService } from './device-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-state',
  templateUrl: './device-state.component.html',
  styleUrls: ['./device-state.component.css']
})
export class DeviceStateComponent implements OnInit {

  constructor(private router: Router,private deviceStateService:DeviceStateService) { }

  ngOnInit() {
  }

}
