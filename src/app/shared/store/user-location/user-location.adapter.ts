import { ILocation } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<ILocation> = createEntityAdapter<ILocation>(
  {}
);
