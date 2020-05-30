import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  Inject,
} from "@angular/core";
import * as fromDashboard from "../../shared/store/dashboard/dashboard.reducer";
import * as fromApp from "../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { ContestWithEntriesPreview } from "src/app/interfaces/shared/dashboard";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-latest-contest-landing",
  templateUrl: "./latest-contest-landing.component.html",
  styleUrls: ["./latest-contest-landing.component.css"],
})
export class LatestContestLandingComponent implements OnInit {
  runningContests: ContestWithEntriesPreview[] = [];
  showContests: boolean = false;
  showEntries: boolean = false;
  constructor(
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromDashboard.selectAllRunningContests))
      .subscribe((val: ContestWithEntriesPreview[]) => {
        this.runningContests = [...val];
        if (this.runningContests.length === 1) {
          this.showEntries = true;
          this.showContests = false;
        }
        if (this.runningContests.length > 1) {
          this.showContests = true;
          this.showEntries = false;
        }
        this.hideScrollBar();
      });
  }

  hideScrollBar() {
    if (this.runningContests.length > 0) {
      this.renderer.setStyle(this.document.body, "overflow-y", "hidden");
    }
  }

  onSelect(id: string) {
    console.log("clicked", id);
  }

  showinfo() {}
}
