declare module "video-react" {
  type R = import("react").ComponentType;
  type PlayerProps = {
    fluid?: boolean;
    width?: number | string;
    height?: number | string;
    src: string;
    poster: string;
    style?: import("react").CSSProperties;
  };

  type PlayerType = import("react").ComponentType<PlayerProps> & {
    video: PlayerInstance;
  };
  export const Player: PlayerType;

  interface PlayerInstance {
    play(): void;
    pause(): void;
    toggleFullScreen(): void;
  }
}

declare namespace Application {
  type AppUser = import("./models/UserModel").UserModelType;
  type RootModel = import("./models").RootStoreType;
  type PaginatorConst = typeof import("./app").paginator;

  type PaginatorInput<T extends Record<string, any> = Record<string, any>> =
    Record<PaginatorConst["defaultInput"], number> & T;
}
