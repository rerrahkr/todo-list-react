import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

const useAppSelector = useSelector.withTypes<RootState>();
const useTodosSelector = () => useAppSelector((state) => state.todos);

export { useAppSelector, useTodosSelector };

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
