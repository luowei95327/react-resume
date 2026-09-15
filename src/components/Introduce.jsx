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

  // The markdown output is block level HTML (h1/p/ul/...), so it is rendered
  // into a div: <pre><code> around it is invalid nesting and made a screen
  // reader announce the whole resume as one code sample.
  return (
    <section className='introduceEdit' aria-label='简历内容' ref={rootRef}>
      {isMD ? (
        // Sanitized in src/lib/markdown.js - never raw marked output.
        <div
          className='introduceBody'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        // Plain text while typing: React escapes children, so this path does
        // not go through innerHTML at all.
        <div className='introduceBody introduceBody--raw'>{currentIntroduce}</div>
      )}
    </section>
  )
}

export default memo(Introduce);
