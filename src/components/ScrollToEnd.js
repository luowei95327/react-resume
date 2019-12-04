import React, { Component } from 'react';
import ReactDOM from 'react-dom'

const ScrollToEnd = (WrappedComponent) => {
  return class ScrollToEnd extends Component {

    componentDidUpdate = () => {
      let dom = ReactDOM.findDOMNode(this);
      if(dom.scrollHeight > dom.clientHeight) {
        dom.scrollTop = dom.scrollHeight
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

export default ScrollToEnd;