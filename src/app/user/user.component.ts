import { Component, OnInit } from '@angular/core';
import { IAppTab } from '../interfaces';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  tab: IAppTab;
  componentName = 'Talent';
  fragment: string;
  toFragment = 'profile';
  constructor() {}

  ngOnInit() {}
}
