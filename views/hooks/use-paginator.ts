import { RootStoreBaseQueries } from "@root-model";
import { createContext, useContext, useEffect, useState } from "react";
import { useFetchQuery } from "@hooks/use-fetch-query";
import {
  PaginatorInfoModelSelector,
  PaginatorInfoModelType,
} from "@root/models";
import { paginator } from "@root/app";

const DefaultPaginator = paginator.defaultPaginator;
const DefaultInput = paginator.defaultInput;

type PageHandlerOpt = {
  current: Application.PaginatorInput;
  paginator?: PaginatorInfoModelType;
  setter(v: Application.PaginatorInput<any>): void;
};

function usePageHandler({
  current,
  setter,
  paginator = DefaultPaginator,
}: PageHandlerOpt) {
  const { currentPage } = paginator;
  const go = (page: number) => {
    setter({ ...current, page });
  };
  const next = () => {
    go((currentPage as number) + 1);
  };
  const prev = () => {
    go((currentPage as number) - 1);
  };
  const changePerPage = (first: number) => {
    setter({ ...current, page: 1, first });
  };
  return {
    go,
    next,
    prev,
    changePerPage,
  };
}

type ResRef<T> = {
  data: T[];
  paginatorInfo: PaginatorInfoModelType;
};
type Opt<Var> = {
  queryKey: RootStoreBaseQueries;
  initial?: Partial<Var>;
  modelBuilder(instance: any): typeof instance;
};

export function usePaginator<
  T,
  CustomVar extends Record<string, any> = Record<string, any>
>({ queryKey, modelBuilder, initial }: Opt<CustomVar>) {
  const [paginatorInput, setPaginatorInput] = useState<
    Application.PaginatorInput<CustomVar>
  >(() => {
    return {
      ...DefaultInput,
      ...initial,
    } as unknown as Application.PaginatorInput<CustomVar>;
  });

  const builder = (instance: any) => {
    return instance
      .data(modelBuilder)
      .paginatorInfo((instance: PaginatorInfoModelSelector) => {
        return instance.total.currentPage.perPage.lastPage.hasMorePages.lastItem
          .count;
      });
  };

  const [result, { fetch, loading }] = useFetchQuery<ResRef<T>>({
    queryKey,
    builder,
  });
  useEffect(() => {
    fetch({ ...paginatorInput });
  }, [paginatorInput]);

  const pageHandler = usePageHandler({
    paginator: result ? result.paginatorInfo : DefaultPaginator,
    current: paginatorInput,
    setter: setPaginatorInput,
  });

  const updateVars = (vars: Partial<CustomVar>) => {
    setPaginatorInput({
      ...paginatorInput,
      ...vars,
      page: 1,
    });
  };

  return {
    ...pageHandler,
    updateVars,
    loading,
    data: result?.data ?? [],
    paginator: result?.paginatorInfo ?? DefaultPaginator,
  };
}

export const PaginatorProvider =
  createContext<null | ReturnType<typeof usePaginator>>(null);

export type UsePaginator<T, V> = Omit<
  ReturnType<typeof usePaginator>,
  "data" | "updateVars"
> & {
  data: Array<T>;
  updateVars(v: Partial<V>): void;
};

export function usePaginatorContext<
  T extends Record<string, any>,
  CustomVar extends Record<string, any> = Record<string, any>
>(): UsePaginator<T, CustomVar> {
  return useContext(PaginatorProvider) as UsePaginator<T, CustomVar>;
}
