import { Instance } from "mobx-state-tree"
import { SectionModelBase } from "./SectionModel.base"

/* The TypeScript type of an instance of SectionModel */
export interface SectionModelType extends Instance<typeof SectionModel.Type> {}

/* A graphql query fragment builders for SectionModel */
export { selectFromSection, sectionModelPrimitives, SectionModelSelector } from "./SectionModel.base"

/**
 * SectionModel
 */
export const SectionModel = SectionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
