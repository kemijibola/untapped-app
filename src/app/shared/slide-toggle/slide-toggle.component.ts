import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  MatSlideToggleChange,
  MatSlideToggle,
} from "@angular/material/slide-toggle";
import { Store, select } from "@ngrx/store";
import * as fromSlideToggle from "../../shared/store/slide-toggle/slide-toggle.reducers";
import * as fromApp from "../../store/app.reducers";
import * as ToggleActions from "../../shared/store/slide-toggle/slide-toggle.actions";
import { IToggle } from "src/app/interfaces";

@Component({
  selector: "app-slide-toggle",
  templateUrl: "./slide-toggle.component.html",
  styleUrls: ["./slide-toggle.component.css"],
})
export class SlideToggleComponent implements OnInit, OnChanges {
  isChecked: boolean;
  title: string = "";
  @Input() data: IToggle;
  toggle: IToggle;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {
    if (simple["data"] !== undefined) {
      this.toggle = { ...this.data };
    }
  }
  onToggleChange() {
    this.toggle.state = !this.toggle.state;
    const toggleToUpate: IToggle = {
      name: this.toggle.name,
      state: this.toggle.state,
      title: this.toggle.title,
    };
    this.store.dispatch(new ToggleActions.UpsertToggle(toggleToUpate));
  }
}
