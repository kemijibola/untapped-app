import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-contest',
  templateUrl: './new-contest.component.html',
  styleUrls: ['./new-contest.component.css']
})
export class NewContestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // TODO:: on click of proceed to payment, order is created
  // payment is sent to payment gateway
  // On success, updated order collection, contest collection and payment collection
}
