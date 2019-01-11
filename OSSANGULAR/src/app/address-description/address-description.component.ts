import { Component, OnInit } from '@angular/core';
import { AddressDescriptionService } from './address-description.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-description',
  templateUrl: './address-description.component.html',
  styleUrls: ['./address-description.component.css']
})
export class AddressDescriptionComponent implements OnInit {

  constructor(private router: Router,private addressDescriptionService:AddressDescriptionService) { }

  ngOnInit() {
  }

}
