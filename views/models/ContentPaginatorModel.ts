import { Instance } from "mobx-state-tree"
import { ContentPaginatorModelBase } from "./ContentPaginatorModel.base"

/* The TypeScript type of an instance of ContentPaginatorModel */
export interface ContentPaginatorModelType extends Instance<typeof ContentPaginatorModel.Type> {}

/* A graphql query fragment builders for ContentPaginatorModel */
export { selectFromContentPaginator, contentPaginatorModelPrimitives, ContentPaginatorModelSelector } from "./ContentPaginatorModel.base"

/**
 * ContentPaginatorModel
 *
 * A paginated list of Content items.
 */
export const ContentPaginatorModel = ContentPaginatorModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
