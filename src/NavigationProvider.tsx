import React, { useMemo, useEffect, useCallback, useReducer } from "react";
import { StatusBar } from "react-native";
import ScreenProvider from "./ScreenProvider";
import ScreenTransition from "./ScreenTransition";
import { mergeDeep, last, Mode } from "./helpers";

export const NavigationContext = React.createContext({});

interface StatusBarInterface {
  barStyle: string;
}

interface HeaderInterface {
  backgroundColor: string;
  color: string;
}

interface ProviderProps {
  initial: string;
  routes: object;
  router: object;
  children: any; // eslint-disable-line
  renderTabs: Function;
}

interface ReducerState {
  stacks: object[];
  wizard: object[];
  pops: object[];
}

interface ReducerAction {
  type: string;
  route?: object;
}

interface RouteInterface {
  name: string;
  props: object;
  id: number;
  mode: Mode;
  animated: boolean;
  statusBar: StatusBarInterface;
  header: HeaderInterface;
}

const mergeWithDefaults = (route: object, params: object) => ({
  ...mergeDeep(
    {
      name: null,
      props: {},
      id: Math.ceil(Math.random() * 99999999),
      mode: "push",
      animated: true,
      statusBar: { barStyle: "light-content" },
      header: {
        backgroundColor: "#222",
        color: "#fff"
      }
    },
    route
  ),
  ...params
});

const initialState = {
  stacks: [],
  wizard: [],
  pops: []
};

const reducer = (state: ReducerState, action: ReducerAction) => {
  const { stacks, pops } = state;

  console.log(action.type, action); // eslint-disable-line

  switch (action.type) {
    case "push":
      return {
        ...state,
        stacks: [...stacks, action.route]
      };
    case "replace":
      return {
        ...state,
        stacks: [...stacks.slice(0, stacks.length - 1), action.route]
      };
    case "pop":
      return {
        ...state,
        pops: [...pops, last(stacks)]
      };
    case "pop_done":
      return {
        ...state,
        stacks: stacks.filter(route => route.id !== action.route.id),
        pops: pops.filter(route => route.id !== action.route.id)
      };
    case "reset":
      return {
        ...initialState,
        stacks: [action.route]
      };
    default:
      return state;
  }
};

const isRouteMounted = (state: ReducerState, route: RouteInterface) =>
  !state.pops.find(({ id }) => id === route.id);
const getCurrentRoute = (state: ReducerState) =>
  state.stacks.slice(state.stacks.length - 1)[0];
const getDepth = (state: ReducerState) =>
  state.stacks.length - state.pops.length;
const getStacks = (state: ReducerState) => state.stacks;

const Provider = ({ initial, routes, router, renderTabs }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createRoute = useCallback(
    params => mergeWithDefaults(routes[params.name], params),
    [routes]
  );

  const replace = useCallback(
    (name: string, data = {}) => {
      dispatch({
        type: "replace",
        route: createRoute({ ...data, name, mode: "replace", animated: false })
      });
    },
    [createRoute]
  );

  const push = useCallback(
    (name: string, data = {}) => {
      if (data.mode === "replace") {
        return replace(name, data);
      }

      return dispatch({ type: "push", route: createRoute({ ...data, name }) });
    },
    [createRoute, replace]
  );

  const pop = useCallback(() => {
    dispatch({ type: "pop" });
  }, []);

  const reset = useCallback(() => {
    dispatch({
      type: "reset",
      route: createRoute({ name: initial, mode: "replace", animated: false })
    });
  }, [createRoute, initial]);

  useEffect(() => {
    push(initial, { mode: "initial", animated: false });
  }, []); // eslint-disable-line

  const current = getCurrentRoute(state);
  const depth = getDepth(state);
  const stacks = getStacks(state);
  const context = useMemo(
    () => ({
      push,
      reset,
      pop,
      replace,
      ...Object.keys(router).reduce((acc, key) => {
        const { name, ...options } = router[key];
        return {
          [key]: props =>
            push(name, { ...options, props: { ...options.props, ...props } }),
          ...acc
        };
      }, {})
    }),
    [pop, push, replace, reset, router]
  );

  return (
    <NavigationContext.Provider value={context}>
      {stacks.map((stack, index) => {
        const {
          Component,
          mode,
          statusBar,
          props,
          id,
          animated,
          header
        } = stack;

        if (stacks.length - index > 3) {
          return null;
        }

        const isCurrent = current.id === stack.id;
        const mounted = isRouteMounted(state, stack);
        const showStatusBar = Boolean(isCurrent && statusBar);

        return (
          <ScreenProvider
            key={id}
            value={{
              screen: stack,
              showBackButton: depth !== 1
            }}
          >
            {showStatusBar && <StatusBar {...statusBar} />}
            <ScreenTransition
              mounted={mounted}
              onUnmount={() => {
                dispatch({ type: "pop_done", route: stack });
              }}
              pop={pop}
              mode={mode}
              animated={animated}
            >
              <Component {...props} />
              {renderTabs(stack)}
            </ScreenTransition>
          </ScreenProvider>
        );
      })}
    </NavigationContext.Provider>
  );
};

export default Provider;
