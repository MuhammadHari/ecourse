export type BatchUpdaterItem = {
  title: string;
  sequence: number;
  id: string;
};

export type FormMapInput = {
  id: string | number;
  sequence: number;
};

export type BatchUpdaterInput = {
  map: FormMapInput[];
  classroomId: number | string;
};
