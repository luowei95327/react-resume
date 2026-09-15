import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollToEnd from './ScrollToEnd';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'

class StyleSheet extends Component {

  shouldComponentUpdate = (nextProps) => {
    return !this.props.isStyleEditable
  }

  componentDidUpdate = () => {
    let _this = this;
    let dom = ReactDOM.findDOMNode(this);
    if(!dom.oninput && dom.contentEditable) {
      dom.addEventListener('input', (event) => {
        _this.props.editStyle(event.target.innerText);
      }, false)
    }
  }

  render() {
    const { currentStyle, isStyleEditable } = this.props;
    return (
      <div className="styleEdit" suppressContentEditableWarning contentEditable={isStyleEditable}>
        <pre>
          <code
            className="language-css"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(currentStyle, Prism.languages.css, 'css'),
            }}
          />
        </pre>
      </div>
    )
  }
}

export default ScrollToEnd(StyleSheet);
