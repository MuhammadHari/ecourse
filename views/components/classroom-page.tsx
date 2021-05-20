import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ClassRoomModelType } from "@root/models";
import { useFetchQuery, Options } from "@hooks/use-fetch-query";
import { RootStoreBaseQueries } from "@root-model";
import { observer } from "mobx-react";

export type ClassroomPageProps = {
  classroom: ClassRoomModelType;
};

type UseClassroomPage = {
  refresh: () => void;
  classroom: ClassRoomModelType;
};

const Context = React.createContext<null | UseClassroomPage>(null);

export function useClassroomPage() {
  return React.useContext(Context) as UseClassroomPage;
}

export const ClassroomPage = <RouteKey extends string = "id">(
  Component: React.ComponentType<ClassroomPageProps>,
  rk: RouteKey,
  builder?: Options<any>["builder"]
) => {
  const ClassRoomAutoload = observer(
    ({ match }: RouteComponentProps<{ [K in RouteKey]: string }>) => {
      const id = match.params[rk];
      const [value, setValue] = React.useState<null | ClassRoomModelType>(null);
      const [result, { fetch, isNull }] = useFetchQuery<
        ClassRoomModelType,
        { id: string }
      >({
        queryKey: RootStoreBaseQueries.queryClassroom,
        builder,
      });

      React.useEffect(() => {
        if (result) {
          console.log("new data is coming");
          setValue(result);
        }
      }, [result]);

      React.useEffect(() => {
        fetch({ id });
      }, []);

      if (isNull) {
        return <div>Classroom is not found</div>;
      }
      if (!result || !value) {
        return null;
      }
      return (
        <Context.Provider
          value={{ classroom: value, refresh: () => fetch({ id }) }}
        >
          <Component classroom={result} />
        </Context.Provider>
      );
    }
  );
  return ClassRoomAutoload;
};
