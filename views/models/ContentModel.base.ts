/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { ContentTypeEnumType } from "./ContentTypeEnum"
import { UserModel, UserModelType } from "./UserModel"
import { UserModelSelector } from "./UserModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  user: UserModelType;
}

/**
 * ContentBase
 * auto generated base class for the model ContentModel.
 */
export const ContentModelBase = withTypedRefs<Refs>()(ModelBase
  .named('Content')
  .props({
    __typename: types.optional(types.literal("Content"), "Content"),
    id: types.identifier,
    sectionId: types.union(types.undefined, types.string),
    classroomId: types.union(types.undefined, types.string),
    title: types.union(types.undefined, types.string),
    description: types.union(types.undefined, types.string),
    sequenceNumber: types.union(types.undefined, types.integer),
    type: types.union(types.undefined, ContentTypeEnumType),
    mediaContent: types.union(types.undefined, types.string),
    thumbnail: types.union(types.undefined, types.string),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
    user: types.union(types.undefined, MSTGQLRef(types.late((): any => UserModel))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class ContentModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get sectionId() { return this.__attr(`sectionId`) }
  get classroomId() { return this.__attr(`classroomId`) }
  get title() { return this.__attr(`title`) }
  get description() { return this.__attr(`description`) }
  get sequenceNumber() { return this.__attr(`sequenceNumber`) }
  get type() { return this.__attr(`type`) }
  get mediaContent() { return this.__attr(`mediaContent`) }
  get thumbnail() { return this.__attr(`thumbnail`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
  user(builder?: string | UserModelSelector | ((selector: UserModelSelector) => UserModelSelector)) { return this.__child(`user`, UserModelSelector, builder) }
}
export function selectFromContent() {
  return new ContentModelSelector()
}

export const contentModelPrimitives = selectFromContent().sectionId.classroomId.title.description.sequenceNumber.type.mediaContent.thumbnail.createdAt.updatedAt
