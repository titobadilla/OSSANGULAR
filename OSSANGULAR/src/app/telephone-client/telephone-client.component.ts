import { Component, OnInit } from '@angular/core';
import { TelephoneClientService } from './telephone-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-telephone-client',
  templateUrl: './telephone-client.component.html',
  styleUrls: ['./telephone-client.component.css']
})
export class TelephoneClientComponent implements OnInit {

  constructor(private router: Router,private telephoneClient:TelephoneClientService) { }

  ngOnInit() {
  }

}
