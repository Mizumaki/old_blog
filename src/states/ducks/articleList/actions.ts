import actionCreatorFactory from 'typescript-fsa';
import { ILists } from './epics';

const actionCreator = actionCreatorFactory();

const actions = {
  fetch: actionCreator.async<{ url: string }, { lists: ILists[] }, { hasError: boolean }>('FETCH_LISTS'),
  loading: actionCreator<{ isLoading: boolean }>('LOAD_LISTS'),
};

export default actions;