import { ref, string } from "yup";
import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { RootStoreBaseMutations } from "@root-model";

const loginSchema = {
  email: string().email().required(),
  password: string().required(),
};
const registerSchema = {
  email: string().email().required(),
  name: string().required(),
  password: string().required(),
  passwordConfirmation: string()
    .required()
    .oneOf([ref("password")], "password di not match"),
};

export const authService = {
  login: mutationServiceFactory<boolean, RootStoreBaseMutations.mutateLogin>({
    schema: loginSchema,
    mutation: RootStoreBaseMutations.mutateLogin,
  }),
  register: mutationServiceFactory<
    boolean,
    RootStoreBaseMutations.mutateRegister
  >({
    schema: registerSchema,
    mutation: RootStoreBaseMutations.mutateRegister,
  }),
};
