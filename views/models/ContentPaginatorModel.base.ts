/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ContentModel, ContentModelType } from "./ContentModel"
import { ContentModelSelector } from "./ContentModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<ContentModelType>;
}

/**
 * ContentPaginatorBase
 * auto generated base class for the model ContentPaginatorModel.
 *
 * A paginated list of Content items.
 */
export const ContentPaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('ContentPaginator')
  .props({
    __typename: types.optional(types.literal("ContentPaginator"), "ContentPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of Content items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => ContentModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ContentPaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | ContentModelSelector | ((selector: ContentModelSelector) => ContentModelSelector)) { return this.__child(`data`, ContentModelSelector, builder) }
}
export function selectFromContentPaginator() {
  return new ContentPaginatorModelSelector()
}

export const contentPaginatorModelPrimitives = selectFromContentPaginator()
