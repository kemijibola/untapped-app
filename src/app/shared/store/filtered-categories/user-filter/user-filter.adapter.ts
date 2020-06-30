import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<string> = createEntityAdapter<string>({});
