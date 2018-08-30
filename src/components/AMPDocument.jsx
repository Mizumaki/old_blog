import React from 'react';
import { withRouter } from 'react-router'

class AMPDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'offline': false };

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
    console.log(this.props.path.url);
    this.fetchAndAttachAmpDoc_(this.props.path.url);
  }

  componentWillUnmount() {
    console.log('in component will unmount')
    this.container_.removeEventListener('click', this.boundClickListener_);

    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentDidUpdate(prevProps) {
    console.log("in compDidUpdate");
    const prevUrl = new URL(window.location.origin + prevProps.path.url);
    // current URL is not same as prev URL
    if (prevUrl.pathname != window.location.pathname) {
      //// decode precent encoding to Japanese string
      //if (window.location.hash) {
      //  const hash = decodeURI(window.location.hash);
      //  console.log("hash, hash, hash", hash);
      //  console.log("this is ref : ", this.container_.current);
      //  this.container_.current.querySelector(hash).scrollIntoView(true);
      //}
      //} //else {
      //console.log("in ELSE compDidUpdate");
      //this.fetchAndAttachAmpDoc_(this.props.path.url);
      console.log("in comdidup if");
      this.fetchAndAttachAmpDoc_(this.props.path.url);
    }
  }

  //componentWillReceiveProps(nextProps) {
  //  console.log("in comp will receive props");
  //  const nextUrl = new URL(window.location.origin + nextProps.path.url);
  //  if (nextUrl.pathname === window.location.pathname) {
  //    console.log("in IF comp will receive props and nextUrl.href : ", nextUrl.href);
  //    const hash = nextUrl.hash
  //    if (hash) {
  //      console.log("in IF IF comp will receive props and hash", hash);
  //      document.querySelector(hash).scrollIntoView(true);
  //    }
  //  } else {
  //    console.log("in ELSE comp will receive props");
  //    this.fetchAndAttachAmpDoc_(nextProps.path.url);
  //  } 
  //}

  render() {
    if (this.state.offline) {
      return (
        <div>
          <h2>Ground Control to Major Tom</h2>
          <p>Your Internet Connection is dead. There's something wrong.</p>
          <p>Can you hear me, Major Tom?</p>
        </div>
      );
    } else {
      return (<div ref={ref => this.container_ = ref} />);
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
      })
      //.then(() => {
      //  if (window.location.hash) {
      //    const hash = decodeURI(window.location.hash);
      //    console.log("hash, hash, hash", hash);
      //    console.log(this.shadowAmp_);
      //    this.shadowAmp_.querySelector(hash).scrollIntoView(true);
      //  }
      //})
    }).catch(error => {
      this.setState({ 'offline': true });
    });
  }

  closeShadowAmpDoc_() {
    console.log('in close shadow amp');
    if (typeof this.shadowAmp_.close === 'function') {
      this.shadowAmp_.close();
    }
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
      console.log(' in prevent');
      return false;
    }

    let a = null;

    if (e.path) {
      console.log("e.path : ", e.path);
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
        this.props.history.push(url.pathname);
        return false;
      }
    }

    return true;
  }
}
//AMPDocument.propTypes = { src: React.PropTypes.string.isRequired }
export default withRouter(AMPDocument);
