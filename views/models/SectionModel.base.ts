/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { types } from "mobx-state-tree"
import { QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { RootStoreType } from "./index"


/**
 * SectionBase
 * auto generated base class for the model SectionModel.
 */
export const SectionModelBase = ModelBase
  .named('Section')
  .props({
    __typename: types.optional(types.literal("Section"), "Section"),
    id: types.identifier,
    classroomId: types.union(types.undefined, types.string),
    title: types.union(types.undefined, types.string),
    sequence: types.union(types.undefined, types.integer),
    createdAt: types.union(types.undefined, types.frozen()),
    updatedAt: types.union(types.undefined, types.null, types.frozen()),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  }))

export class SectionModelSelector extends QueryBuilder {
  get id() { return this.__attr(`id`) }
  get classroomId() { return this.__attr(`classroomId`) }
  get title() { return this.__attr(`title`) }
  get sequence() { return this.__attr(`sequence`) }
  get createdAt() { return this.__attr(`createdAt`) }
  get updatedAt() { return this.__attr(`updatedAt`) }
}
export function selectFromSection() {
  return new SectionModelSelector()
}

export const sectionModelPrimitives = selectFromSection().classroomId.title.sequence.createdAt.updatedAt
