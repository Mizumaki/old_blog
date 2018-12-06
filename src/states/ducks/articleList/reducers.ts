import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './actions';
import { IApi } from './epics';

export interface IStates {
  hasError: boolean;
  isLoading: boolean;
  lists: IApi[];
}

const initialState: IStates = {
  hasError: false,
  isLoading: false,
  lists: [],
};

const reducer = reducerWithInitialState(initialState)
  .case(actions.loading, (state, payload) => {
    return Object.assign({}, state, { isLoading: payload.isLoading });
  })
  .case(actions.fetch.done, (state, payload) => {
    return Object.assign({}, state, { comments: payload.result.lists })
  })
  .case(actions.fetch.failed, (state, payload) => {
    return Object.assign({}, state, { hasError: payload.error.hasError })
  })

export default reducer;