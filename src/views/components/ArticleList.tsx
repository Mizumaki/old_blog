import * as React from 'react';
import { css } from 'emotion';
import { IProps as IContainerProps, IApi } from '../containers/ArticleList';
import BlogCard from './BlogCard';

const styles = {
  wrap: css({
    padding: '3rem 1rem',
  }),
};

interface IOwnProps {
  type?: string;
  query?: string;
}

type IProps = IOwnProps & IContainerProps

class ArticleList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.fetchArticleList = this.fetchArticleList.bind(this);
  }

  public componentDidMount() {
    this.fetchArticleList();
  }

  public componentDidUpdate(prevProps: IProps) {
    // type, subtype is always equal, so handle update whether query is different or not
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.fetchArticleList();
    }
  }

  public fetchArticleList() {
    const params = this.props.match.params;
    const location = this.props.location;
    // If props is maunally defined, use props. Otherwise, use match object.
    const urlType = location.pathname === '/tags' ? "tags" : "category";
    const listType = this.props.type ? this.props.type : urlType;
    const categoryType = (listType === "category") ? (params.sub ? "sub" : "main") : "";
    const searchType = (listType === "category") ? (params.sub ? "?name=" + params.sub : "?name=" + params.main) : location.search;
    const search = this.props.query ? this.props.query : searchType;
    this.props.fetch(`https://ryota-mizumaki.com/api/article-list/${listType}${categoryType ? "/" + categoryType : ""}${search}`)
  }

  public render() {
    if (this.props.isLoading) {
      return <div>loading...</div>;
    }
    if (this.props.hasError) {
      return <div>error</div>;
    }
    const articles = this.props.lists
    const blogCards = articles.map((article: IApi, i: number) => {
      return (
        <div className={styles.wrap} key={i}>
          <BlogCard title={article.title} subCategory={article.subCategory} lead={article.lead} date={article.date} path={article.path} />
        </div>
      )
    });

    return (
      <div>
        {blogCards}
      </div>
    );
  }
}

export default ArticleList;