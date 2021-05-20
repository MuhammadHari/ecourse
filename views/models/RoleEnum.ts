/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum Role {
  Adm="Adm",
Teacher="Teacher",
Student="Student"
}

/**
* Role
*/
export const RoleEnumType = types.enumeration("Role", [
        "Adm",
  "Teacher",
  "Student",
      ])
