import type React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { setupStore } from "./store";

function Provider({
  children,
}: { children: React.ReactNode }): React.JSX.Element {
  return <ReduxProvider store={setupStore()}>{children}</ReduxProvider>;
}

export { Provider };
