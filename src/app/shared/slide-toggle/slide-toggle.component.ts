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
  @Input() id: string = "";
  @Input() data: IToggle;
  componentToggle: AppToggle;
  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(
      new ToggleActions.FetchToggle({ appToggleId: this.id })
    );
  }

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
      //this.title = this.data.title;
      console.log(this.data);
    }
  }
  onToggleChange(q) {
    console.log("", q);
    // this.isChecked = !this.isChecked;

    // const toggleToUpdate = this.componentToggle.toggles[this.data.index];
    // toggleToUpdate.state = this.isChecked;
    // this.componentToggle.toggles[this.data.index] = { ...toggleToUpdate };

    // console.log(this.componentToggle);

    // this.store.dispatch(new ToggleActions.UpsertToggle(this.componentToggle));
    // this is where appComponent toggle is updated
    // this page should get currentComponentToggle
  }
}
