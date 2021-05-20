declare namespace Application {
  type AppUser = import("./models/UserModel").UserModelType;
  type RootModel = import("./models").RootStoreType;
  type PaginatorConst = typeof import("./app").paginator;

  type PaginatorInput<T extends Record<string, any> = Record<string, any>> =
    Record<PaginatorConst["defaultInput"], number> & T;
}
