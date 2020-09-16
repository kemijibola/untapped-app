import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { addDays } from "date-fns";
import { Store, select } from "@ngrx/store";
import * as fromApp from "../../store/app.reducers";
import * as fromNewContest from "../../user-contest/store/new-contest/new-contest.reducers";
import * as fromUserContest from "../../user-contest/user-contest.reducers";
import { AppNotificationKey, IContest } from "src/app/interfaces";
import * as NotificationActions from "../../store/global/notification/notification.action";
import * as NewContestActions from "../../user-contest/store/new-contest/new-contest.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-sms-vote",
  templateUrl: "./sms-vote.component.html",
  styleUrls: ["./sms-vote.component.css"],
})
export class SmsVoteComponent implements OnInit {
  smsContestForm: FormGroup;
  smsAgreementForm: FormGroup;
  canSmsProceed: boolean = false;
  smsMinDate: Date = addDays(new Date(), 1);
  smsMaxDate: Date = addDays(this.smsMinDate, 180);

  isInitiated$ = this.userContestStore.pipe(
    select(fromNewContest.selectSmsContestInitiatedStatus)
  );

  inProgress$ = this.userContestStore.pipe(
    select(fromNewContest.selectSmsContestInProgressStatus)
  );

  isCompleted$ = this.userContestStore.pipe(
    select(fromNewContest.selectSmsContestCompletedStatus)
  );

  failed$ = this.userContestStore.pipe(
    select(fromNewContest.selectSmsContestFailedStatus)
  );

  @ViewChild("smsCreateButton", { static: false }) smsCreateButton: ElementRef;
  constructor(
    public store: Store<fromApp.AppState>,
    private userContestStore: Store<fromUserContest.UserContestState>,
    private renderer: Renderer2,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.smsAgreementForm = new FormGroup({
      terms: new FormControl(false, Validators.requiredTrue),
    });

    this.smsContestForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
      ]),
      noOfParticipants: new FormControl(2, [
        Validators.required,
        Validators.min(2),
      ]),
      smsContestDuration: new FormControl(
        [this.smsMinDate, this.smsMaxDate],
        [Validators.required]
      ),
    });

    this.isCompleted$.subscribe((val: boolean) => {
      if (val) {
        this.router.navigate(["/user/competition/page"], {
          queryParams: { tab: "all" },
        });
      }
    });
  }

  onClickContinue(): void {
    this.canSmsProceed = true;
  }
  get smsAgreement() {
    return this.smsAgreementForm.controls;
  }
  onClickGenerateButton(): void {
    const smsCreateBtn = this.smsCreateButton.nativeElement;
    this.renderer.setProperty(smsCreateBtn, "disabled", true);

    const title = this.smsContestForm.controls["title"].value;
    const participants: number = this.smsContestForm.controls[
      "noOfParticipants"
    ].value;
    const duration = this.smsContestForm.controls["smsContestDuration"].value;
    if (!duration) {
      this.store.dispatch(
        new NotificationActions.AddError({
          key: AppNotificationKey.error,
          message: "Invalid contest duration",
          code: 400,
        })
      );
    } else {
      const contestObj: IContest = {
        title,
        numberOfParticipants: participants,
        startDate: new Date(duration[0]),
        endDate: new Date(duration[1]),
      };
      this.userContestStore.dispatch(
        new NewContestActions.CreateSmsVote({ smsContest: contestObj })
      );
    }
  }
}
