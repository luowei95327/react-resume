import React from 'react';
import ScrollToEnd from './ScrollToEnd';
import { marked } from 'marked';

const Introduce = (props) => {
  const { currentIntroduce, isMD } = props;
  return (
    <div className='introduceEdit'>
      <pre>
        <code dangerouslySetInnerHTML={{__html: isMD ? marked.parse(currentIntroduce) : currentIntroduce}}></code>
      </pre>
    </div>
  )
}

export default ScrollToEnd(Introduce);
