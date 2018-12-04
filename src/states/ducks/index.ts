import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import commentsReducer, { ICommentsState, commentsFetchEpic } from './comments/index';
import articleListsReducer, { IStates as IArticleListsStates, articleListsEpic } from './articleList/index';

export interface IAppState {
  comments: ICommentsState,
  articleLists: IArticleListsStates,
}

export const reducers = combineReducers<IAppState>({ comments: commentsReducer, articleLists: articleListsReducer })

export const epics = combineEpics(
  commentsFetchEpic,
  articleListsEpic
);