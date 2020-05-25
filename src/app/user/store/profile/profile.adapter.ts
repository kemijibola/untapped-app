import { IProfile } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectProfileId(a: IProfile): string {
  return a._id;
}

export const adapter: EntityAdapter<IProfile> = createEntityAdapter<IProfile>({
  selectId: selectProfileId,
});

export const {
  selectIds: selectProfileIds,
  selectEntities: selectProfileEntities,
  selectAll: selectAllProfiles,
  selectTotal: profileCount,
} = adapter.getSelectors();
