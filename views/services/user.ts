import { ref, string } from "yup";
import { gradeUtils } from "@utils/grade-tranform";
import {
  mutationServiceFactory,
  Options,
} from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";
import { UserModelType } from "@root/models";

const schema = (isTeacher = false) => ({
  name: string().required(),
  email: string().required().email(),
  password: string().required(),
  password_confirmation: string()
    .required()
    .oneOf([ref("password")]),
  grade: string()
    .when({
      is: !isTeacher,
      then(schema) {
        return schema.required();
      },
    })
    .oneOf(gradeUtils.map.map(({ grade }) => grade)),
});

const opt = (isTeacher: boolean): Options<any, any, any> => ({
  schema: schema(isTeacher),
  mutation: RootStoreBaseMutations.mutateUser,
});

const createTeacher = mutationServiceFactory<
  UserModelType,
  RootStoreBaseMutations.mutateUser
>(opt(true));

const createStudent = mutationServiceFactory<
  UserModelType,
  RootStoreBaseMutations.mutateUser
>(opt(false));

export const userService = {
  teacher: {
    create: createTeacher,
  },
  student: {
    create: createStudent,
  },
};
