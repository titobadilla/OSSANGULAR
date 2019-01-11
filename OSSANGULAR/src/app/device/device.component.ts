import { Component, OnInit } from '@angular/core';
import { DeviceService } from './device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  constructor(private router: Router,private deviceService:DeviceService) { }

  ngOnInit() {
  }

}
