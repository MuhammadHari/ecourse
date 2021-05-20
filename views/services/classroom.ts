import { useFetchQuery } from "@hooks/use-fetch-query";
import { ClassRoomModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const queryAllClassroom = () => {
  const [classrooms, { fetch, loading }] = useFetchQuery<
    Array<ClassRoomModelType>
  >({
    queryKey: RootStoreBaseQueries.queryClassrooms,
  });
  return {
    classrooms,
    fetch,
    loading,
  };
};

const queryClassroom = () => {
  const [classroom, { fetch, loading }] = useFetchQuery<
    ClassRoomModelType,
    { id: string }
  >({
    queryKey: RootStoreBaseQueries.queryClassroom,
  });
  const param = useParams<{ id: string }>();
  useEffect(() => {
    if (param.id) {
      fetch(param);
    }
  }, []);

  return {
    classroom,
    fetch,
    loading,
  };
};

export const classroomServices = {
  queryAllClassroom,
  queryClassroom,
};
