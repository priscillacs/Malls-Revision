import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  cart: [],
  origin: {},
});

export { useGlobalState, setGlobalState };
