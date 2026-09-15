import React, { useMemo } from 'react';
import ScrollToEnd from './ScrollToEnd';
import { renderMarkdown } from '../lib/markdown';

const Introduce = (props) => {
  const { currentIntroduce, isMD } = props;
  // Parsing/sanitizing only when the source or the mode changes keeps every
  // unrelated store update (the typing animation dispatches one per
  // character) from re-parsing the whole document.
  const html = useMemo(
    () => (isMD ? renderMarkdown(currentIntroduce) : ''),
    [currentIntroduce, isMD]
  );

  return (
    <div className='introduceEdit'>
      <pre>
        {isMD ? (
          // Sanitized in src/lib/markdown.js - never raw marked output.
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        ) : (
          // Plain text while typing: React escapes children, so this path does
          // not go through innerHTML at all.
          <code>{currentIntroduce}</code>
        )}
      </pre>
    </div>
  )
}

export default ScrollToEnd(Introduce);
