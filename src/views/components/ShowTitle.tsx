import * as React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';

interface IOwnProps {
  title?: string;
  type?: string;
}

type IProps = RouteComponentProps<{ main?: string; sub?: string; }> & IOwnProps;

const ShowTitle = (props: IProps) => {
  let title = "BLAZING FAST";
  if (props.title) {
    title = props.title;
  }
  if (props.type) {
    if (props.match) {
      switch (props.type) {
        case "category1":
          title = "カテゴリ：" + props.match.params.main + " の記事一覧";
          break;
        case "category2":
          title = "カテゴリ：" + props.match.params.sub + " の記事一覧";
          break;
        default:
          break;
      }
    }
  }
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}

export default withRouter(ShowTitle);