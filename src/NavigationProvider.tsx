import React, { useMemo, useEffect, useCallback, useReducer } from 'react';
import { StatusBar } from 'react-native';
import ScreenProvider from './ScreenProvider';
import ScreenTransition from './ScreenTransition';
import { mergeDeep, last } from './helpers';
import { isDrawer } from './helpers/screen';
import {
  RouteType,
  RouteOptionsType,
  LoseObjectType,
  RouterType,
} from './types';

export const NavigationContext = React.createContext({});

type Props = {
  initial: string;
  routes: { [key: string]: RouteOptionsType & { Component: any } };
  router: { [key: string]: RouteOptionsType & { name: string } };
  renderTabs: (route: RouteType, router: RouterType) => React.ReactNode | null;
};

type ReducerState = {
  stacks: RouteType[];
  wizard: RouteType[];
  pops: RouteType[];
  leftDrawer: true | false;
  rightDrawer: true | false;
};

type ReducerAction =
  | { type: 'pop' }
  | {
      type: 'push' | 'replace' | 'pop' | 'pop_done' | 'reset';
      route: RouteType;
    };

const createRoute = (route: RouteOptionsType, overrides?: RouteOptionsType) => {
  const merged = {
    name: null,
    props: {},
    id: Math.ceil(Math.random() * 99999999),
    mode: 'push',
    animated: true,
    ...route,
    statusBar: {
      barStyle: 'light-content',
      ...route.statusBar,
    },
    header: {
      backgroundColor: '#222',
      color: '#fff',
      ...route.header,
    },
  };

  return mergeDeep(merged, overrides) as RouteType;
};

const initialState = {
  stacks: [],
  wizard: [],
  pops: [],
  leftDrawer: false,
  rightDrawer: false,
};

const reducer = (state: ReducerState, action: ReducerAction): ReducerState => {
  const { stacks, pops } = state;

  // console.log(action.type, action); // eslint-disable-line

  switch (action.type) {
    case 'push':
      // add drawer to pops
      // if a new push incoming
      if (isDrawer(last(stacks).mode)) {
        return {
          ...state,
          stacks: [...stacks, action.route],
          pops: [...pops, last(stacks)],
        };
      }

      return {
        ...state,
        stacks: [...stacks, action.route],
      };

    case 'replace':
      return {
        ...state,
        stacks: [...stacks.slice(0, stacks.length - 1), action.route],
      };
    case 'pop':
      return {
        ...state,
        pops: [...pops, last(stacks)],
      };
    case 'pop_done':
      return {
        ...state,
        stacks: stacks.filter(route => route.id !== action.route.id),
        pops: pops.filter(route => route.id !== action.route.id),
      };
    case 'reset':
      return {
        ...initialState,
        stacks: [action.route],
      };
    default:
      return state;
  }
};

const isRouteMounted = (state: ReducerState, route: RouteType) =>
  !state.pops.find(({ id }) => id === route.id);
const getCurrentRoute = (state: ReducerState) =>
  state.stacks.slice(state.stacks.length - 1)[0];
const getStacks = (state: ReducerState) => state.stacks;

const prepareRoutes = (routes: LoseObjectType): LoseObjectType =>
  Object.keys(routes).reduce((acc, key) => {
    return { ...acc, [key]: { ...routes[key], name: key } };
  }, {});

const Provider = ({ initial, routes: _routes, router, renderTabs }: Props) => {
  const routes = prepareRoutes(_routes);
  const [state, dispatch] = useReducer(reducer, initialState);

  const replace = useCallback(
    (name: string, options?: RouteOptionsType) => {
      dispatch({
        type: 'replace',
        route: createRoute(routes[name], {
          ...options,
          mode: 'replace',
          animated: false,
        }),
      });
    },
    [routes]
  );

  const push = useCallback(
    (name: string, options?: RouteOptionsType) => {
      if (options && options.mode === 'replace') {
        return replace(name, options);
      }

      return dispatch({
        type: 'push',
        route: createRoute(routes[name], options),
      });
    },
    [replace, routes]
  );

  const pop = useCallback(() => {
    dispatch({ type: 'pop' });
  }, []);

  const reset = useCallback(() => {
    const name = initial;
    dispatch({
      type: 'reset',
      route: createRoute(routes[name], {
        mode: 'replace',
        animated: false,
      }),
    });
  }, [initial, routes]);

  useEffect(() => {
    push(initial, { mode: 'initial', animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = getCurrentRoute(state);
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
          [key]: (props: object) =>
            push(name, { ...options, props: { ...options.props, ...props } }),
          ...acc,
        };
      }, {}),
    }),
    [pop, push, replace, reset, router]
  );

  return (
    <NavigationContext.Provider value={context}>
      {stacks.map((stack, index) => {
        const { Component, mode, statusBar, props, id, animated } = stack;

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
              showBackButton: index !== 0,
            }}
          >
            {showStatusBar && <StatusBar {...statusBar} />}
            <ScreenTransition
              mounted={mounted}
              onUnmount={() => {
                dispatch({ type: 'pop_done', route: stack });
              }}
              pop={pop}
              mode={mode}
              animated={animated}
            >
              <Component {...props} />
              {renderTabs(stack, context)}
            </ScreenTransition>
          </ScreenProvider>
        );
      })}
    </NavigationContext.Provider>
  );
};

export default Provider;
