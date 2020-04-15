import { IContest } from "src/app/interfaces";
import * as UserContestActions from "./user-contest.action";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAdapter from "./user-contest.adapter";

export 
