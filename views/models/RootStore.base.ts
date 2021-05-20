/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { ObservableMap } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLStore, configureStoreMixin, QueryOptions, withTypedRefs } from "mst-gql"

import { UserModel, UserModelType } from "./UserModel"
import { userModelPrimitives, UserModelSelector } from "./UserModel.base"
import { UserPaginatorModel, UserPaginatorModelType } from "./UserPaginatorModel"
import { userPaginatorModelPrimitives, UserPaginatorModelSelector } from "./UserPaginatorModel.base"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { paginatorInfoModelPrimitives, PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { ClassRoomModel, ClassRoomModelType } from "./ClassRoomModel"
import { classRoomModelPrimitives, ClassRoomModelSelector } from "./ClassRoomModel.base"
import { SectionModel, SectionModelType } from "./SectionModel"
import { sectionModelPrimitives, SectionModelSelector } from "./SectionModel.base"
import { ContentModel, ContentModelType } from "./ContentModel"
import { contentModelPrimitives, ContentModelSelector } from "./ContentModel.base"
import { ContentPaginatorModel, ContentPaginatorModelType } from "./ContentPaginatorModel"
import { contentPaginatorModelPrimitives, ContentPaginatorModelSelector } from "./ContentPaginatorModel.base"
import { PageInfoModel, PageInfoModelType } from "./PageInfoModel"
import { pageInfoModelPrimitives, PageInfoModelSelector } from "./PageInfoModel.base"


import { Role } from "./RoleEnum"
import { Grade } from "./GradeEnum"
import { ContentType } from "./ContentTypeEnum"
import { SortOrder } from "./SortOrderEnum"
import { Trashed } from "./TrashedEnum"

export type CreateUserInput = {
  email: string
  password: string
  password_confirmation: string
  name: string
}
export type SectionBatchMapInput = {
  id?: string
  sequence?: number
}
export type OrderByClause = {
  column: string
  order: SortOrder
}
/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  users: ObservableMap<string, UserModelType>,
  classRooms: ObservableMap<string, ClassRoomModelType>,
  sections: ObservableMap<string, SectionModelType>,
  contents: ObservableMap<string, ContentModelType>
}


/**
* Enums for the names of base graphql actions
*/
export enum RootStoreBaseQueries {
queryAuth="queryAuth",
queryTeachers="queryTeachers",
queryStudents="queryStudents",
queryClassrooms="queryClassrooms",
queryClassroom="queryClassroom",
queryContents="queryContents"
}
export enum RootStoreBaseMutations {
mutateLogin="mutateLogin",
mutateResetPassword="mutateResetPassword",
mutateResetPasswordCallback="mutateResetPasswordCallback",
mutateRegister="mutateRegister",
mutateSections="mutateSections",
mutateSectionBatchUpdate="mutateSectionBatchUpdate",
mutateUser="mutateUser"
}

/**
* Store, managing, among others, all the objects received through graphQL
*/
export const RootStoreBase = withTypedRefs<Refs>()(MSTGQLStore
  .named("RootStore")
  .extend(configureStoreMixin([['User', () => UserModel], ['UserPaginator', () => UserPaginatorModel], ['PaginatorInfo', () => PaginatorInfoModel], ['ClassRoom', () => ClassRoomModel], ['Section', () => SectionModel], ['Content', () => ContentModel], ['ContentPaginator', () => ContentPaginatorModel], ['PageInfo', () => PageInfoModel]], ['User', 'ClassRoom', 'Section', 'Content'], "js"))
  .props({
    users: types.optional(types.map(types.late((): any => UserModel)), {}),
    classRooms: types.optional(types.map(types.late((): any => ClassRoomModel)), {}),
    sections: types.optional(types.map(types.late((): any => SectionModel)), {}),
    contents: types.optional(types.map(types.late((): any => ContentModel)), {})
  })
  .actions(self => ({
    queryAuth(variables?: {  }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ auth: UserModelType}>(`query auth { auth {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryTeachers(variables: { first?: number, page?: number }, resultSelector: string | ((qb: UserPaginatorModelSelector) => UserPaginatorModelSelector) = userPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ teachers: UserPaginatorModelType}>(`query teachers($first: Int, $page: Int) { teachers(first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryStudents(variables: { grade?: string, first?: number, page?: number }, resultSelector: string | ((qb: UserPaginatorModelSelector) => UserPaginatorModelSelector) = userPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ students: UserPaginatorModelType}>(`query students($grade: String, $first: Int, $page: Int) { students(grade: $grade, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new UserPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryClassrooms(variables?: {  }, resultSelector: string | ((qb: ClassRoomModelSelector) => ClassRoomModelSelector) = classRoomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ classrooms: ClassRoomModelType[]}>(`query classrooms { classrooms {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryClassroom(variables: { id: string }, resultSelector: string | ((qb: ClassRoomModelSelector) => ClassRoomModelSelector) = classRoomModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ classroom: ClassRoomModelType}>(`query classroom($id: ID!) { classroom(id: $id) {
        ${typeof resultSelector === "function" ? resultSelector(new ClassRoomModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    queryContents(variables: { classroomId: string, first?: number, page?: number }, resultSelector: string | ((qb: ContentPaginatorModelSelector) => ContentPaginatorModelSelector) = contentPaginatorModelPrimitives.toString(), options: QueryOptions = {}) {
      return self.query<{ contents: ContentPaginatorModelType}>(`query contents($classroomId: ID!, $first: Int, $page: Int) { contents(classroomId: $classroomId, first: $first, page: $page) {
        ${typeof resultSelector === "function" ? resultSelector(new ContentPaginatorModelSelector()).toString() : resultSelector}
      } }`, variables, options)
    },
    mutateLogin(variables: { email: string, password: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ login: boolean }>(`mutation login($email: String!, $password: String!) { login(email: $email, password: $password) }`, variables, optimisticUpdate)
    },
    mutateResetPassword(variables: { email: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ resetPassword: boolean }>(`mutation resetPassword($email: String!) { resetPassword(email: $email) }`, variables, optimisticUpdate)
    },
    mutateResetPasswordCallback(variables: { email: string, code: string, password: string, passwordConfirmation: string }, optimisticUpdate?: () => void) {
      return self.mutate<{ resetPasswordCallback: boolean }>(`mutation resetPasswordCallback($email: String!, $code: String!, $password: String!, $passwordConfirmation: String!) { resetPasswordCallback(email: $email, code: $code, password: $password, password_confirmation: $passwordConfirmation) }`, variables, optimisticUpdate)
    },
    mutateRegister(variables: { args: CreateUserInput }, optimisticUpdate?: () => void) {
      return self.mutate<{ register: boolean }>(`mutation register($args: CreateUserInput!) { register(args: $args) }`, variables, optimisticUpdate)
    },
    mutateSections(variables: { classroomId: string, title: string, sequence: number }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ sections: SectionModelType}>(`mutation sections($classroomId: ID!, $title: String!, $sequence: Int!) { sections(classroomId: $classroomId, title: $title, sequence: $sequence) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateSectionBatchUpdate(variables: { classroomId: string, map: SectionBatchMapInput[] }, resultSelector: string | ((qb: SectionModelSelector) => SectionModelSelector) = sectionModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ sectionBatchUpdate: SectionModelType[]}>(`mutation sectionBatchUpdate($classroomId: ID!, $map: [SectionBatchMapInput!]!) { sectionBatchUpdate(classroomId: $classroomId, map: $map) {
        ${typeof resultSelector === "function" ? resultSelector(new SectionModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
    mutateUser(variables: { name: string, email: string, password: string, role?: Role, grade?: Grade }, resultSelector: string | ((qb: UserModelSelector) => UserModelSelector) = userModelPrimitives.toString(), optimisticUpdate?: () => void) {
      return self.mutate<{ user: UserModelType}>(`mutation user($name: String!, $email: String!, $password: String!, $role: Role, $grade: Grade) { user(name: $name, email: $email, password: $password, role: $role, grade: $grade) {
        ${typeof resultSelector === "function" ? resultSelector(new UserModelSelector()).toString() : resultSelector}
      } }`, variables, optimisticUpdate)
    },
  })))
