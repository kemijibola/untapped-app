import { IComment } from "src/app/interfaces";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";

export function selectCommentId(a: IComment): string {
  return a._id;
}

export const adapter: EntityAdapter<IComment> = createEntityAdapter<IComment>({
  selectId: selectCommentId,
});

export const {
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: commentCount,
} = adapter.getSelectors();
