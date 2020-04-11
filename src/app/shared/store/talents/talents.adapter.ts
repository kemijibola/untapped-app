import { IUserType } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export const adapter: EntityAdapter<any> = createEntityAdapter<any>({});
