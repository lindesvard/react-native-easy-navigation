import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import ScreenProvider from "./ScreenProvider";
import ScreenTransition from "./ScreenTransition";
import { deepMerge } from "./helpers";

const removeLast = list => list.slice(0, list.length - 1);
const getLast = list => list.slice(list.length - 1)[0];

export const NavigationContext = React.createContext({});

interface ProviderProps {
  initial: string;
  routes: object;
  router: object;
  children: any;
  renderTabs: Function;
}

const Provider = ({ initial, routes, router, renderTabs }: ProviderProps) => {
  const [stacks, setStacks] = useState([]);
  const [pops, setPops] = useState([]);

  const createRoute = params => ({
    ...deepMerge(
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
      routes[params.name]
    ),
    ...params
  });

  const push = (name: string, data = {}) => {
    if (data.mode === "replace") {
      return replace(name, data);
    }

    setStacks(prev => [...prev, createRoute({ ...data, name })]);
  };

  const replace = (name: string, data = {}) => {
    setStacks(prev => {
      const newStacks = [
        ...removeLast(prev),
        createRoute({ ...data, name, mode: "replace", animated: false })
      ];

      return newStacks;
    });
  };

  const pop = () => {
    if (stacks.length === 1) {
      return null;
    }

    setPops(prev => {
      return [...prev, getLast(stacks)];
    });
  };

  const reset = () => {
    setStacks([
      createRoute({ name: initial, mode: "replace", animated: false })
    ]);
  };

  useEffect(() => {
    push(initial, { mode: "initial", animated: false });
  }, []); // eslint-disable-line

  useEffect(() => {
    console.log("Length", stacks.length);
    console.log("Stacks", stacks.map(route => route.name).join(","));
    console.log("=======");
  }, [stacks]);

  useEffect(() => {
    console.log("Length", pops.length);
    console.log("Pops", pops.map(route => route.name).join(","));
    console.log("=======");
  }, [pops]);

  const current = getLast(stacks);

  return (
    <NavigationContext.Provider
      value={{
        push,
        reset,
        pop,
        replace,
        depth: stacks.length - pops.length,
        stacks,
        current,
        ...Object.keys(router).reduce((acc, key) => {
          const { name, ...options } = router[key];
          return {
            [key]: props =>
              push(name, { ...options, props: { ...options.props, ...props } }),
            ...acc
          };
        }, {})
      }}
    >
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
        const mounted = !pops.find(route => route.id === stack.id);
        const showStatusBar = Boolean(isCurrent && statusBar);

        return (
          <ScreenProvider
            key={id}
            value={{
              mode,
              id,
              animated,
              statusBar,
              header,
              isCurrent
            }}
          >
            {showStatusBar && <StatusBar {...statusBar} />}
            <ScreenTransition
              mounted={mounted}
              onUnmount={() => {
                setPops(prev => prev.filter(route => route.id !== stack.id));
                setStacks(prev => prev.filter(route => route.id !== stack.id));
              }}
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
