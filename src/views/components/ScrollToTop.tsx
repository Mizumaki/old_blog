import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class ScrollToTop extends React.Component<RouteComponentProps> {
  constructor(props: RouteComponentProps) {
    super(props);
  }

  public componentDidUpdate(prevProps: RouteComponentProps) {
    console.log("in ScrollToTop");
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("in ScrollToTop if");
      window.scrollTo(0, 0);
    }
  }

  public render() {
    return this.props.children;
  }
}

export default ScrollToTop;