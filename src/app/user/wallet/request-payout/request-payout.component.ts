import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { NUMERIC_REGEX } from "src/app/lib/constants";
import { Store, select } from "@ngrx/store";
import * as fromUser from "../../user.reducers";
import * as WalletActions from "../../store/wallet/wallet.actions";
import { PaymentProcessor } from "src/app/interfaces";
import { HelperService } from "src/app/shared/utils/helper.service";
import { environment } from "src/environments/environment";
import * as fromWallet from "../../store/wallet/wallet.reducer";

@Component({
  selector: "app-request-payout",
  templateUrl: "./request-payout.component.html",
  styleUrls: ["./request-payout.component.css"],
})
export class RequestPayoutComponent implements OnInit {
  transferForm: FormGroup;
  pinPattern = /^[0-9]{4}$/;
  amountPattern = NUMERIC_REGEX;
  initiated$ = this.userStore.pipe(
    select(fromWallet.selectPayoutInitiatedStatus)
  );

  inProgress$ = this.userStore.pipe(
    select(fromWallet.selectPayoutInProgressStatus)
  );

  isCompleted$ = this.userStore.pipe(
    select(fromWallet.selectPayoutCompletedStatus)
  );

  failed$ = this.userStore.pipe(select(fromWallet.selectPayoutFailedStatus));

  @ViewChild("sendButton", { static: false }) sendButton: ElementRef;

  constructor(
    private userStore: Store<fromUser.UserState>,
    private helperService: HelperService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.transferForm = new FormGroup({
      walletPin: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ])
      ),
      amount: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(NUMERIC_REGEX),
        ])
      ),
      narration: new FormControl(null),
    });
  }

  onClickWithdaw(): void {
    const sendBtn = this.sendButton.nativeElement;
    this.renderer.setProperty(sendBtn, "disabled", true);

    const pin: string = this.transferForm.controls["walletPin"].value;
    const amount: string = this.transferForm.controls["amount"].value;
    const narration: string = this.transferForm.controls["narration"].value;
    const pinData = this.helperService.set(environment.KEY, pin);
    this.userStore.dispatch(
      new WalletActions.RequestPayout({
        processor: PaymentProcessor.paystack,
        walletPin: pinData,
        amount,
        narration,
      })
    );
  }
}
