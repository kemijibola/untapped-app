import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { Store, select } from "@ngrx/store";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { Bank } from "src/app/interfaces/account/wallet";
import * as fromUser from "../../user.reducers";
import * as fromBanks from "../../store/bank/bank.reducer";
import { NUMERIC_REGEX } from "src/app/lib/constants";
import * as BanksActions from "../../store/bank/bank.actions";
import { PaymentProcessor } from "src/app/interfaces";

@Component({
  selector: "app-account-setup",
  templateUrl: "./account-setup.component.html",
  styleUrls: ["./account-setup.component.css"],
})
export class AccountSetupComponent implements OnInit {
  accountSetup: FormGroup;
  selectedBankValue: string = "";
  showBanks: boolean = false;
  banks: Bank[] = [];
  placeHolderText: string;
  searchText: string = "";
  selectedBank: Bank;
  accountPattern = /^[0-9]{10,11}$/;

  isInitiated$ = this.userStore.pipe(
    select(fromBanks.selectAccountSetUpInitiatedStatus)
  );

  inProgress$ = this.userStore.pipe(
    select(fromBanks.selectAccountSetUpInProgressStatus)
  );

  isCompleted$ = this.userStore.pipe(
    select(fromBanks.selectAccountSetUpCompletedStatus)
  );

  failed$ = this.userStore.pipe(
    select(fromBanks.selectAccountSetUpFailedStatus)
  );

  @ViewChild("setUpButton", { static: false }) setUpButton: ElementRef;

  constructor(
    private userStore: Store<fromUser.UserState>,
    private renderer: Renderer2
  ) {
    this.placeHolderText = "Fetching banks...";
  }

  ngOnInit(): void {
    this.accountSetup = new FormGroup({
      selectedBank: new FormControl(null, Validators.required),
      accountNumber: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(NUMERIC_REGEX),
        ])
      ),
    });

    this.fetchBanks();
  }

  onClick() {
    this.showBanks = !this.showBanks;
  }

  onMouseLeave() {
    this.showBanks = !this.showBanks;
  }

  trackByFn(index: number, item: Bank) {
    return item.id;
  }

  fetchBanks(): void {
    this.userStore
      .pipe(select(fromBanks.selectAllBanks))
      .subscribe((val: Bank[]) => {
        if (val.length > 0) {
          this.banks = val;
          this.placeHolderText = "Select a bank";
        } else {
          this.placeHolderText = "Fetching banks...";
        }
      });
  }

  onSelectBank(bank: Bank): void {
    this.showBanks = !this.showBanks;
    this.accountSetup.controls["selectedBank"].setValue(bank.name);
    this.selectedBank = bank;
  }

  onClickSave(): void {
    const saveBtn = this.setUpButton.nativeElement;
    this.renderer.setProperty(saveBtn, "disabled", true);

    const accountNumber = this.accountSetup.controls["accountNumber"].value;
    this.userStore.dispatch(
      new BanksActions.SetUpBankDetails({
        processor: PaymentProcessor.paystack,
        accountNumber,
        bankCode: this.selectedBank.code,
      })
    );
  }
}
