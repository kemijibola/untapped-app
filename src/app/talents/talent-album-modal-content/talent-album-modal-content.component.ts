import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import { selectActiveModal } from "src/app/shared/store/modals/modals.selectors";
import { IModal } from "src/app/interfaces";

@Component({
  selector: "app-talent-album-modal-content",
  templateUrl: "./talent-album-modal-content.component.html",
  styleUrls: ["./talent-album-modal-content.component.css"]
})
export class TalentAlbumModalContentComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.activateModalContent();
  }

  activateModalContent(): void {
    this.store.pipe(select(selectActiveModal)).subscribe((val: IModal) => {
      if (val.name === "album-modal") {
        console.log("album-modal");
      }
    });
  }
}
