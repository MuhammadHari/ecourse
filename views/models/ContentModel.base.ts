/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ContentTypeEnumType } from "./ContentTypeEnum"
import { RootStoreType } from "./index"


/**
 * ContentBase
 * auto generated base class for the model ContentModel.
 */
export const ContentModelBase = ModelBase
  .named('Content')
  .props({
    __typename: types.optional(types.literal("Content"), "Content"),
    id: types.identifier,
    sectionId: types.union(types.undefined, types.string),
    classroomId: types.union(types.undefined, types.string),
    title: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.frozen()),
    sequenceNumber: types.union(types.undefined, types.integer),
    type: types.union(types.undefined, ContentTypeEnumType),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class ContentModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get sectionId() { return this.__attr(`sectionId`) }
  get classroomId() { return this.__attr(`classroomId`) }
  get title() { return this.__attr(`title`) }
  get description() { return this.__attr(`description`) }
  get sequenceNumber() { return this.__attr(`sequenceNumber`) }
  get type() { return this.__attr(`type`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
}
export function selectFromContent() {
  return new ContentModelSelector()
}

export const contentModelPrimitives = selectFromContent().sectionId.classroomId.title.description.sequenceNumber.type.createdAt.updatedAt
