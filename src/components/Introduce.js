import React from 'react';
import ScrollToEnd from './ScrollToEnd';
import marked from 'marked';

const Introduce = (props) => {
  const { currentIntroduce, isMD } = props;
  return (
    <div className='introduceEdit'>
      <pre>
        <code dangerouslySetInnerHTML={{__html: isMD ? marked(currentIntroduce) : currentIntroduce}}></code>
      </pre>
    </div>
  )
}

export default ScrollToEnd(Introduce);