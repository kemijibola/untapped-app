import { IAuthData } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<IAuthData> = createEntityAdapter<IAuthData>(
  {}
);
