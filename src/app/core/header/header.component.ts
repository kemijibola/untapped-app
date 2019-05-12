import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavLink } from 'src/app/models';
import { Observable } from 'rxjs';
import * as CoreModuleActions from '../store/core.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterContentInit {
  homeClicked = false;
  talentsClicked = false;
  constructor(private store: Store<{ coreModule: {
    activeLink: NavLink}}>) { }

  ngOnInit() {
    // this.store.select('coreModule' ).subscribe(data => {
    //     console.log(data);
    // });
  }
  onClick(clicked) {
    if (clicked === 'home') {
      this.homeClicked = !this.homeClicked;
    } else if (clicked === 'talents') {
      this.talentsClicked = !this.talentsClicked;
    }
  }
  ngAfterContentInit() {

    // let nav = document.getElementById('#nav');
    // window.addEventListener('scroll', () => {
    //   if (window.scrollY > 1.5) {
    //     nav.classList.add("fixed-top");
    //     document.body.style.paddingTop = '70';
    //   } else {
    //     nav.classList.remove("fixed-top");
    //     document.body.style.paddingTop = '0';
    //   }
    // });
    // console.log('Listner added');
  }
}
