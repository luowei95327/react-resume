import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollToEnd from './ScrollToEnd';
import 'prismjs';
import 'prismjs/themes/prism.css'
import { PrismCode } from 'react-prism';

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
          <PrismCode className="language-css">{currentStyle}</PrismCode>
        </pre>
      </div>
    )
  }
}

export default ScrollToEnd(StyleSheet);