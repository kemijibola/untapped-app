import { IWallet } from "src/app/interfaces/account/wallet";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectWalletId(a: IWallet): string {
  return a._id;
}

export const adapter: EntityAdapter<IWallet> = createEntityAdapter<IWallet>({
  selectId: selectWalletId,
});
