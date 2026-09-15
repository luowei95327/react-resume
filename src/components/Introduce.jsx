import React, { memo, useMemo, useRef } from 'react';
import { useAutoScrollToEnd } from '../hooks/useAutoScrollToEnd';
import { renderMarkdown } from '../lib/markdown';

const Introduce = (props) => {
  const { currentIntroduce, isMD } = props;
  const rootRef = useRef(null);

  // Parsing/sanitizing only when the source or the mode changes keeps every
  // unrelated store update (the intro animation dispatches one per frame) from
  // re-parsing the whole document.
  const html = useMemo(
    () => (isMD ? renderMarkdown(currentIntroduce) : ''),
    [currentIntroduce, isMD]
  );

  useAutoScrollToEnd(rootRef, currentIntroduce);

  return (
    <div className='introduceEdit' ref={rootRef}>
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

export default memo(Introduce);
