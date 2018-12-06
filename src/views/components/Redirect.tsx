import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Redirect as R } from 'react-router-dom';

const Redirect = (props: RouteComponentProps<{ main?: string; sub?: string; fileName: string; }>) => {
  if (props.match) {
    const params = props.match.params;
    return (
      <R to={`/${params.main}/${params.sub}/${params.fileName}${props.location.hash ? props.location.hash : ""}`} />
    )
  } else {
    return null;
  }
}

export default withRouter(Redirect);