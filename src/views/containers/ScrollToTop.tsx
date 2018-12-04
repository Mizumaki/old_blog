import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Component from '../components/ScrollToTop';
import { IAppState } from '../../states/ducks/index';

const mapStateToProps = (_: IAppState, ownProps: RouteComponentProps) => {
  return {...ownProps};
}

const Container = connect(
  mapStateToProps
)(Component)

export default withRouter(Container);