import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromModal from "../../../shared/store/modals/modals.reducers";
import { VgMedia } from "videogular2/compiled/core";
import { VgAPI } from "ngx-videogular";
import { IModal, IEntryData } from "src/app/interfaces";
import * as fromApp from "../../../store/app.reducers";
import * as CommentsActions from "../../../shared/store/comments/comments.action";

@Component({
  selector: "app-contest-entry-modal-content",
  templateUrl: "./contest-entry-modal-content.component.html",
  styleUrls: ["./contest-entry-modal-content.component.css"],
})
export class ContestEntryModalContentComponent implements OnInit {
  api: VgAPI;
  constructor(private store: Store<fromApp.AppState>) {}
  isCurrentImageSet: boolean;
  isCurrentAudioSet: boolean;
  isCurrentVideoSet: boolean;
  entryData: IEntryData;

  ngOnInit(): void {
    this.activateModalContent();
  }

  activateModalContent(): void {
    this.store
      .pipe(select(fromModal.selectCurrentActiveModal))
      .subscribe((val: IModal) => {
        if (val !== null) {
          this.isCurrentAudioSet = false;
          this.isCurrentImageSet = false;
          this.isCurrentVideoSet = false;
          if (val.name === "talent-entry-details" && val.data !== null) {
            if (val.data !== null) {
              console.log("contestant", val);
              this.entryData = { ...val.data };
              this.store.dispatch(
                new CommentsActions.FetchMediaComments({
                  entityId: this.entryData.entry._id,
                })
              );
            }
          }
        }
      });
  }
}
