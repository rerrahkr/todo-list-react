import { type AppStore, type RootState, setupStore } from "@/store";
import { type RenderOptions, render } from "@testing-library/react";
import type React from "react";
import { Provider } from "react-redux";

// https://redux.js.org/usage/writing-tests#example-app-code
type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
};

function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const WrapperProvider = ({
    children,
  }: { children: React.ReactNode }): React.JSX.Element => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(ui, { wrapper: WrapperProvider, ...renderOptions }),
  };
}

export { renderWithProviders };
