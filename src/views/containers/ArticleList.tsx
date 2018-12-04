import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { articleListsOperations, articleListsSelectors, IStates } from '../../states/ducks/articleList/index';
import Component from '../components/ArticleList';
import { IAppState } from '../../states/ducks/index';

export interface IProps extends RouteComponentProps<{ main: string; sub: string; }>, IStates {
  fetch: (url: string) => Action<{url: string}>;
}

const mapStateToProps = (appState: IAppState, ownProps: RouteComponentProps<{ main: string; sub: string; }>) => {
  const regularStates = articleListsSelectors.getRegularStates(appState);
  return {...regularStates, ...ownProps}
}

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => {
  return { fetch: (url: string) => dispatch(articleListsOperations.fetch(url)) }
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)

export default withRouter(Container);