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
import { OwlOptions, SlidesOutputData } from "ngx-owl-carousel-o";
import {
  fetchImageObjectFromCloudFormation,
  fetchDefaultContestBanner,
} from "src/app/lib/Helper";
import { ImageFit, ImageEditRequest } from "src/app/interfaces/media/image";

@Component({
  selector: "app-latest-contest-landing",
  templateUrl: "./latest-contest-landing.component.html",
  styleUrls: ["./latest-contest-landing.component.css"],
})
export class LatestContestLandingComponent implements OnInit {
  runningContests: ContestWithEntriesPreview[] = [];
  showContests: boolean = false;
  showEntries: boolean = false;

  editParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 202,
        height: 192,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };

  defaultParams: ImageEditRequest = {
    edits: {
      resize: {
        width: 70,
        height: 70,
        fit: ImageFit.fill,
      },
      grayscale: false,
    },
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["Previous", "Next"],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  // slidesStore = [
  //   {
  //     id: 1,
  //     src: "https://i.picsum.photos/id/976/400/250.jpg",
  //     alt: "Image_1",
  //     title: "Image_1",
  //   },
  //   {
  //     id: 2,
  //     src: "https://i.picsum.photos/id/996/400/250.jpg",
  //     alt: "Image_2",
  //     title: "Image_3",
  //   },
  //   {
  //     id: 3,
  //     src: "https://i.picsum.photos/id/400/400/250.jpg",
  //     alt: "Image_3",
  //     title: "Image_3",
  //   },
  //   {
  //     id: 4,
  //     src: "https://i.picsum.photos/id/316/400/250.jpg",
  //     alt: "Image_4",
  //     title: "Image_4",
  //   },
  //   {
  //     id: 5,
  //     src: "https://i.picsum.photos/id/705/400/250.jpg",
  //     alt: "Image_5",
  //     title: "Image_5",
  //   },
  // ];
  activeSlides: SlidesOutputData;

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
        this.setContestBannerImage();
        // if (this.runningContests.length === 1) {
        //   this.showEntries = true;
        //   this.showContests = false;
        // }
        // if (this.runningContests.length > 1) {
        //   this.showContests = true;
        //   this.showEntries = false;
        // }
        //.hideScrollBar();
      });
  }

  setContestBannerImage() {
    this.runningContests = this.runningContests.map((x) => {
      return Object.assign({}, x, {
        defaultBannerImage: fetchImageObjectFromCloudFormation(
          x.contest.banner,
          this.defaultParams
        ),
        fullBannerImage:
          x.contest.banner !== ""
            ? fetchImageObjectFromCloudFormation(
                x.contest.banner,
                this.editParams
              )
            : fetchDefaultContestBanner(),
      });
    });
    console.log(this.runningContests);
  }
  // hideScrollBar() {
  //   if (this.runningContests.length > 0) {
  //     this.renderer.setStyle(this.document.body, "overflow-y", "hidden");
  //   }
  // }

  onSelect(data: any) {
    console.log("clicked", data);
  }

  showinfo() {}
}
