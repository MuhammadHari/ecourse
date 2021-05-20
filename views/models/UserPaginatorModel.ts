import { Instance } from "mobx-state-tree"
import { UserPaginatorModelBase } from "./UserPaginatorModel.base"

/* The TypeScript type of an instance of UserPaginatorModel */
export interface UserPaginatorModelType extends Instance<typeof UserPaginatorModel.Type> {}

/* A graphql query fragment builders for UserPaginatorModel */
export { selectFromUserPaginator, userPaginatorModelPrimitives, UserPaginatorModelSelector } from "./UserPaginatorModel.base"

/**
 * UserPaginatorModel
 *
 * A paginated list of User items.
 */
export const UserPaginatorModel = UserPaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
