import { Component, OnInit } from '@angular/core';
import { GroupClientService } from './group-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-client',
  templateUrl: './group-client.component.html',
  styleUrls: ['./group-client.component.css']
})
export class GroupClientComponent implements OnInit {

  constructor(private router: Router,private groupClientService:GroupClientService) { }

  ngOnInit() {
  }

}
