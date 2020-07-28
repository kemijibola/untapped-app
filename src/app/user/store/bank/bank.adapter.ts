import { Bank } from "src/app/interfaces/account/wallet";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectBankId(a: Bank): number {
  return a.id;
}

export const adapter: EntityAdapter<Bank> = createEntityAdapter<Bank>({
  selectId: selectBankId,
});

export const {
  selectIds: selectBankIds,
  selectEntities: selectBankEntities,
  selectAll: selectAllBanks,
  selectTotal: bankCount,
} = adapter.getSelectors();
