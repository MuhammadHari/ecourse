import { mutationServiceFactory } from "@utils/mutation-service-factory";
import { BatchUpdaterInput } from "@teacher-pages/section/type";
import { SectionModelType } from "@root/models";
import { RootStoreBaseMutations } from "@root-model";
import { array, mixed, number, object, string } from "yup";

const idSchema = mixed()
  .required()
  .test(
    "check",
    "error-type",
    (v) => typeof v === "number" || typeof v === "string"
  );

const schema = {
  map: array()
    .required()
    .of(
      object({
        id: idSchema,
        sequence: number().required().min(1),
      })
    ),
};

const sectionBatchUpdater = mutationServiceFactory<
  Array<SectionModelType>,
  RootStoreBaseMutations.mutateSectionBatchUpdate,
  BatchUpdaterInput
>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  schema: schema,
  mutation: RootStoreBaseMutations.mutateSectionBatchUpdate,
});

const createSchema = {
  title: string().required(),
};

const section = mutationServiceFactory<
  SectionModelType,
  RootStoreBaseMutations.mutateSections,
  { title: string }
>({
  schema: createSchema,
  mutation: RootStoreBaseMutations.mutateSections,
});

export const sectionService = {
  sectionBatchUpdater,
  createSection: section,
};
