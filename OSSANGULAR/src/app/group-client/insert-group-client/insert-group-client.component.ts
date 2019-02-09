import { Component, OnInit } from '@angular/core';
import { GroupClientService } from '../group-client.service';

@Component({
  selector: 'insert-group-client',
  templateUrl: './insert-group-client.component.html',
  styleUrls: ['./insert-group-client.component.css']
})
export class InsertGroupClientComponent implements OnInit {


  constructor(private groupClientService: GroupClientService) {

  }

  ngOnInit() {

  }


}
