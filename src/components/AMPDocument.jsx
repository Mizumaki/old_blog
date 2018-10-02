import React from 'react';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import DocumentTitle from 'react-document-title';

class AMPDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offline: false, title: 'BLAZING FAST' };

    // Shadow AMP API が利用可能になったかどうかを判断
    this.ampReadyPromise_ = new Promise(resolve => {
      (window.AMP = window.AMP || []).push(resolve);
    });

    this.container_ = null;
    this.xhr_ = null;
    this.shadowAmp_ = null;
    this.shadowRoot_ = null;
    this.boundClickListener_ = this.clickListener_.bind(this);
  }


  componentDidMount() {
    console.log("AMP Document component did mount!!!")
    this.container_.addEventListener('click', this.boundClickListener_);
    console.log(this.props.match.url);
    const params = this.props.match.params;
    this.fetchAndAttachAmpDoc_(`/amp/${params.main}/${params.sub}/${params.fileName}`);
  }

  componentWillUnmount() {
    console.log('in component will unmount')
    // if null, you can't removeEventListener
    if (this.container_ !== null) {
      this.container_.removeEventListener('click', this.boundClickListener_);
    }

    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentDidUpdate(prevProps) {
    console.log("in compDidUpdate");
    console.log("prev is this", prevProps.match.url);
    console.log("now is this", this.props.match.url);
    const prevUrl = new URL(window.location.origin + prevProps.match.url);
    // current URL is not same as prev URL
    if (prevProps.match.url != this.props.match.url) {
      console.log("in comdidup if");
      const params = this.props.match.params;
      this.fetchAndAttachAmpDoc_(`/amp/${params.main}/${params.sub}/${params.fileName}`);
    }
  }

  render() {
    if (this.state.offline) {
      return (
        <DocumentTitle title={this.state.title}>
          <div>
            <Helmet>
              <link rel="amphtml" href={`https://ryota-mizumaki.com/amp/${this.props.location.pathname}`} />
            </Helmet>
            <h2>Ground Control to Major Tom</h2>
            <p>Your Internet Connection is dead. There's something wrong.</p>
            <p>Can you hear me, Major Tom?</p>
          </div>
        </DocumentTitle>
      );
    } else {
      return (
        <DocumentTitle title={this.state.title}>
          <div>
            <Helmet>
              <link rel="amphtml" href={`https://ryota-mizumaki.com/amp/${this.props.location.pathname}`} />
            </Helmet>
            <div ref={ref => this.container_ = ref} />
          </div>
        </DocumentTitle>
      );
    }
  }

  fetchAndAttachAmpDoc_(url) {
    console.log('in fetch and attach amp doc')
    this.fetchDocument_(url).then(doc => {
      return this.ampReadyPromise_.then(amp => {
        console.log('in fetchDoc return');
        this.hideUnwantedElementsOnDocument_(doc);
        const oldShadowRoot = this.shadowRoot_;
        this.shadowRoot_ = document.createElement('div');
        this.shadowRoot_.setAttribute('id', 'shadow-root');
        if (oldShadowRoot) {
          this.container_.replaceChild(this.shadowRoot_, oldShadowRoot);
        } else {
          this.container_.appendChild(this.shadowRoot_);
        }
        
        this.shadowAmp_ = amp.attachShadowDoc(this.shadowRoot_, doc, url);
        // 全部が完了してから、setTitleすることで、compDidUpdateがトリガーされそれ以降の処理を止めるようなことがないようにする。
        this.setTitle_(doc);
      })
    }).catch(error => {
      this.setState({ offline: true });
    });
  }

  closeShadowAmpDoc_() {
    console.log('in close shadow amp');
    if (typeof this.shadowAmp_.close === 'function') {
      this.shadowAmp_.close();
    }
  }

  setTitle_(doc) {
    console.log('in set title');
    const h1 = doc.getElementsByTagName('h1');
    const title = h1[0].textContent;
    this.setState({ title: title });
  }

  hideUnwantedElementsOnDocument_(doc) {
    console.log('in hide element');
    const banners = doc.getElementsByClassName('site');
    for (let i = 0; i < banners.length; i++) {
      banners[i].style.display = 'none';
    }
    doc.querySelector('section.agenda h4').innerHTML = "目次<span style='font-size: 12px;'>（shadowRootのサポートがないブラウザでは動きません。。）</span>"
  }

  fetchDocument_(url) {
    return new Promise((resolve, reject) => {
      this.xhr_ = new XMLHttpRequest();
      this.xhr_.open('GET', url, true);
      this.xhr_.responseType = 'document';
      this.xhr_.setRequestHeader('Accept', 'text/*');
      this.xhr_.onreadystatechange = () => {
        if (this.xhr_.readyState < /* STATUS_RECEIVED */ 2) {
          return;
        }
        if (this.xhr_.status < 100 || this.xhr_.status > 599) {
          this.xhr_.onreadystatechange = null;
          reject(new Error(`Unknown HTTP status ${this.xhr_.status}`));
          this.xhr_ = null;
          return;
        }
        if (this.xhr_.readyState === /* COMPLETE */ 4) {
          if (this.xhr_.responseXML) {
            resolve(this.xhr_.responseXML);
          } else {
            reject(new Error('No xhr.responseXML'));
          }
          this.xhr_ = null;
        }
      };
      this.xhr_.onerror = () => { reject(new Error('Network failure')); };
      this.xhr_.onabort = () => { reject(new Error('Request aborted')); };
      this.xhr_.send();
    });
  }

  clickListener_(e) {
    console.log('in click listner');
    if (e.defaultPrevented) {
      console.log('in prevent');
      return false;
    }

    let a = null;

    if (e.path) {
      for (let i = 0; i < e.path.length; i++) {
        const node = e.path[i];
        if (node.tagName === 'A') {
          a = node;
          break;
        }
      }
    } else {
      // Polyfill for `path`.
      let node = e.target;
      console.log("node : ", node);
      while (node && node.tagName !== 'A') {
        node = node.parentNode;
      }
      a = node;
    }

    if (a && a.href) {
      console.log('in click listener if if if ');
      const url = new URL(a.href);
      // if click target URL Domain === Site Domain 
      if (url.origin === window.location.origin) {
        console.log('in click listener more if ');
        // Perform router push instead of page navigation.
        e.preventDefault();
        // Clean up current shadow AMP document.
        this.closeShadowAmpDoc_();
        // Router push reuses current component with new props.
        this.props.history.push({ pathname: url.pathname, search: url.search, hash: url.hash });
        return false;
      }
    }
    return true;
  }
}

export default withRouter(AMPDocument);