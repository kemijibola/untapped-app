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
import { IToggle, ToggleList, AppToggle } from "src/app/interfaces";

@Component({
  selector: "app-slide-toggle",
  templateUrl: "./slide-toggle.component.html",
  styleUrls: ["./slide-toggle.component.css"],
})
export class SlideToggleComponent implements OnInit, OnChanges {
  isChecked: boolean;
  title: string = "";
  @Input() data: IToggle;
  componentToggle: AppToggle;
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    // get
    this.store
      .pipe(select(fromSlideToggle.selectCurrentSlideToggle))
      .subscribe((val: AppToggle) => {
        if (val) {
          this.componentToggle = { ...val };
        }
      });
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple["data"]) {
      this.title = this.data.title;
    }
  }
  onToggleChange() {
    this.isChecked = !this.isChecked;
    const payload: IToggle = {
      index: this.data.index,
      title: this.data.title,
      name: this.data.name,
      state: this.isChecked,
    };

    this.store.dispatch(
      new ToggleActions.InitiateToggle({
        componentToggle: this.componentToggle,
        toggle: payload,
      })
    );
    // this is where appComponent toggle is updated
    // this page should get currentComponentToggle
    // this.store.dispatch(
    //   new ToggleStateActions.UpdateToggle({ updateObj: payload })
    // );
  }
}
