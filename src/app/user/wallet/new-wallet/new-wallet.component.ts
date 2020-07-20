import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NUMERIC_REGEX } from "src/app/lib/constants";
import * as fromWallet from "../../store/wallet/wallet.reducer";
import * as WalletActions from "../../store/wallet/wallet.actions";
import * as fromUser from "../../user.reducers";
import * as fromApp from "../../../store/app.reducers";
import { Store, select } from "@ngrx/store";
import { HelperService } from "src/app/shared/utils/helper.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-new-wallet",
  templateUrl: "./new-wallet.component.html",
  styleUrls: ["./new-wallet.component.css"],
})
export class NewWalletComponent implements OnInit {
  newWalletForm: FormGroup;

  initiated$ = this.userStore.pipe(select(fromWallet.selectInitiatedStatus));

  inProgress$ = this.userStore.pipe(select(fromWallet.selectInProgressStatus));

  isCompleted$ = this.userStore.pipe(select(fromWallet.selectCompletedStatus));

  failed$ = this.userStore.pipe(select(fromWallet.selectFailedStatus));
  @ViewChild("walletButton", { static: false }) walletButton: ElementRef;

  constructor(
    private userStore: Store<fromUser.UserState>,
    private store: Store<fromApp.AppState>,
    private renderer: Renderer2,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.newWalletForm = new FormGroup({
      walletPin: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(NUMERIC_REGEX),
        ])
      ),
    });
  }

  onCreateWallet(): void {
    const createBtn = this.walletButton.nativeElement;
    this.renderer.setProperty(createBtn, "disabled", true);

    const pin: string = this.newWalletForm.controls["walletPin"].value;
    const pinData = this.helperService.set(environment.KEY, pin);
    this.userStore.dispatch(new WalletActions.CreateWallet({ pin: pinData }));
  }
}
