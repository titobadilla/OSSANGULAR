import { Component, OnInit } from '@angular/core';
import { ModelService } from './model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor(private router: Router,private modelService:ModelService) { }

  ngOnInit() {
  }

}
