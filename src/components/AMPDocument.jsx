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
    console.log(this.props.path);
    this.fetchAndAttachAmpDoc_(this.props.path);
  }

  componentWillUnmount() {
    this.closeShadowAmpDoc_();
    this.container_.removeEventListener('click', this.boundClickListener_);

    if (this.xhr_) {
      this.xhr_.abort();
      this.xhr_ = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchAndAttachAmpDoc_(nextProps.src);
  }

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
    this.fetchDocument_(url).then(doc => {
      return this.ampReadyPromise_.then(amp => {
        //this.hideUnwantedElementsOnDocument_(doc);

        const oldShadowRoot = this.shadowRoot_;
        this.shadowRoot_ = document.createElement('div');
        if (oldShadowRoot) {
          this.container_.replaceChild(this.shadowRoot_, oldShadowRoot);
        } else {
          this.container_.appendChild(this.shadowRoot_);
        }

        this.shadowAmp_ = amp.attachShadowDoc(this.shadowRoot_, doc, url);
      });
    }).catch(error => {
      this.setState({ 'offline': true });
    });
  }

  closeShadowAmpDoc_() {
    if (typeof this.shadowAmp_.close === 'function') {
      this.shadowAmp_.close();
    }
  }

  hideUnwantedElementsOnDocument_(doc) {
    const banners = doc.getElementsByClassName('banner');
    for (let i = 0; i < banners.length; i++) {
      banners[i].style.display = 'none';
    }
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
    if (e.defaultPrevented) {
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
      while (node && node.tagName !== 'A') {
        node = node.parentNode;
      }
      a = node;
    }

    if (a && a.href) {
      const url = new URL(a.href);
      if (url.origin === window.location.origin) {
        // Perform router push instead of page navigation.
        e.preventDefault();
        // Clean up current shadow AMP document.
        this.closeShadowAmpDoc_();
        // Router push reuses current component with new props.
        this.props.router.push(url.pathname);
        return false;
      }
    }

    return true;
  }
}
//AMPDocument.propTypes = { src: React.PropTypes.string.isRequired }
export default withRouter(AMPDocument);
