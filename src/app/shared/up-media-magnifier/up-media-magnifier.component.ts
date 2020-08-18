import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import * as fromApp from "../../store/app.reducers";
import * as ModalsActions from "../../shared/store/modals/modals.actions";
import * as fromModals from "../../shared/store/modals/modals.reducers";
import { MagnifierData } from "src/app/interfaces";
import {
  fetchNoMediaDefaultImage,
  fetchOriginalImage,
} from "src/app/lib/Helper";

@Component({
  selector: "app-up-media-magnifier",
  templateUrl: "./up-media-magnifier.component.html",
  styleUrls: ["./up-media-magnifier.component.css"],
})
export class UpMediaMagnifierComponent implements OnInit {
  imagePath: string = "";
  showMagnifier: boolean;
  currentIndex = -1;
  leftDisabled = false;
  rightDisabled = false;
  magnifierData: MagnifierData = {
    index: -1,
    data: [],
  };
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromModals.selectCurrentMagnifiedData))
      .subscribe((val: MagnifierData) => {
        if (val) {
          this.magnifierData = val;
          const found = val.data[val.index];
          this.setCurrentImage(found.path);
        }
      });

    this.store
      .pipe(select(fromModals.selectCurrentShowMagnifier))
      .subscribe((val: boolean) => {
        this.showMagnifier = val;
      });
  }

  setCurrentImage(path: string) {
    this.imagePath =
      path === undefined
        ? fetchNoMediaDefaultImage()
        : (this.imagePath = fetchOriginalImage(path));
  }

  onClose() {
    // this.showMagnifier = false;
    this.store.dispatch(new ModalsActions.ToggleMagnifier(false));
  }

  onNext() {
    this.currentIndex++;
    if (this.currentIndex > 0 && this.magnifierData.data.length > 1) {
      this.leftDisabled = false;
    }

    if (this.currentIndex === this.magnifierData.data.length - 1) {
      this.rightDisabled = true;
      this.leftDisabled = false;
    }
    const found = this.magnifierData.data[this.currentIndex];
    this.setCurrentImage(found.path);
  }

  onPrevious() {
    this.currentIndex--;
    if (this.currentIndex < this.magnifierData.data.length - 1) {
      this.rightDisabled = false;
    }
    if (this.currentIndex === 0) {
      this.leftDisabled = true;
      this.rightDisabled = false;
    }
    const found = this.magnifierData.data[this.currentIndex];
    this.setCurrentImage(found.path);
  }
}
