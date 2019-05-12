import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade',
    [
      state('void', style({ opacity : 0})),
      transition(':enter', [ animate(300)]),
      transition(':leave', [ animate(500)]),
    ]
  )]
})
export class AppComponent implements OnInit {
  title = 'untapped-app';
  ngOnInit() {}
  constructor(@Inject(DOCUMENT) document) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
     if (window.pageYOffset > 0) {
       const element = document.getElementById('navbar');
       element.classList.add('sticky');
     } else {
      const element = document.getElementById('navbar');
        element.classList.remove('sticky');
     }
  }
}
