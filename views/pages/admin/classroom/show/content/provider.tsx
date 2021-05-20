import * as React from "react";
import { useShowClassrom } from "@pages/admin/classroom/show/provider";
import { UsePaginator, usePaginator } from "@hooks/use-paginator";
import { ContentModelSelector, ContentModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useState } from "react";
import { observer } from "mobx-react";

type UseContentList = UsePaginator<ContentModelType> & {
  selected: null | ContentModelType;
  setActive(model: ContentModelType): () => void;
};

const Context = createContext<null | UseContentList>(null);

export function useContentList() {
  return useContext(Context) as UseContentList;
}

export const Provider = observer(
  ({ children }: React.PropsWithChildren<any>) => {
    const { classroom } = useShowClassrom();
    const paginator = usePaginator<ContentModelType>({
      queryKey: RootStoreBaseQueries.queryContents,
      initial: { classroomId: classroom.id, first: 5 },
      modelBuilder(instance: ContentModelSelector): ContentModelSelector {
        return instance.id.classroomId.type.title.description.sequenceNumber.mediaContent.thumbnail.user(
          (instance) => instance.id.name
        );
      },
    });
    const [selected, setSelected] = useState<null | ContentModelType>(null);
    const ctx: UseContentList = {
      ...paginator,
      selected,
      setActive(model: ContentModelType) {
        return () => setSelected(model);
      },
    };
    return <Context.Provider value={ctx}>{children}</Context.Provider>;
  }
);
