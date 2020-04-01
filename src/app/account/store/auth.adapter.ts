import { IAuthData } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

// export function selectUserAuthId(a: IAuthData): string {
//   return a.user_data._id;
// }

export const adapter: EntityAdapter<IAuthData> = createEntityAdapter<IAuthData>(
  {}
);
