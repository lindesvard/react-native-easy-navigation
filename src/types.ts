export type StatusBarType = {
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
};

export type ModeType =
  | 'modal'
  | 'half-panel'
  | 'replace'
  | 'initial'
  | 'push'
  | 'overlay'
  | 'drawer';

export type HeaderType = {
  backgroundColor: string;
  color: string;
};

export type RouteOptionsType = {
  props?: object;
  animated?: boolean;
  statusBar?: StatusBarType;
  header?: HeaderType;
  mode?: ModeType;
  name?: string;
};

export type RouteType = {
  id: number;
  name: string;
  Component: any;
  props: object;
  animated: boolean;
  statusBar: StatusBarType;
  header: HeaderType;
  mode: ModeType;
};

export type RouteFunctionType = (
  route: string,
  options?: RouteOptionsType
) => void;

export type LoseObjectType = { [key: string]: any };

export type BaseRouterType = {
  pop: () => void;
  push: RouteFunctionType;
  replace: RouteFunctionType;
  reset: () => void;
};

export type CustomRouterType = LoseObjectType;

export type RouterType = BaseRouterType & CustomRouterType;
