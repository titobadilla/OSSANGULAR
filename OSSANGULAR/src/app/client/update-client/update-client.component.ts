import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  @Input() clientId: String;

  constructor() { }

  ngOnInit() {
  }

}
