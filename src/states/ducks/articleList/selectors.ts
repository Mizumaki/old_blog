import { IAppState } from "../index";

export const getRegularStates = (state: IAppState) => {
  const listsState = state.articleLists;

  const lists = listsState.lists;
  const isLoading = listsState.isLoading;
  const hasError = listsState.hasError;

  return {
    isLoading,
    hasError,
    lists
  };
};

export default { getRegularStates };
