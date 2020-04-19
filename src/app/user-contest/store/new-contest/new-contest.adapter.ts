import { IContest } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<IContest> = createEntityAdapter<IContest>(
  {}
);
