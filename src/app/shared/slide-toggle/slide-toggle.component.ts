import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  MatSlideToggleChange,
  MatSlideToggle
} from "@angular/material/slide-toggle";
import { Store } from "@ngrx/store";
import * as fromSlideToggle from "../../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromApp from "../../store/app.reducers";
import * as ToggleStateActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import { IToggle, ToggleList } from "src/app/interfaces";

@Component({
  selector: "app-slide-toggle",
  templateUrl: "./slide-toggle.component.html",
  styleUrls: ["./slide-toggle.component.css"]
})
export class SlideToggleComponent implements OnInit {
  @Input() title: string;
  @Input() name: string;
  isChecked: boolean;
  @Input() data: IToggle;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onToggleChange() {
    this.isChecked = !this.isChecked;
    const payload: IToggle = {
      index: this.data.index,
      name: this.data.name,
      state: this.isChecked
    };
    this.store.dispatch(
      new ToggleStateActions.UpdateToggle({ updateObj: payload })
    );
  }
}
