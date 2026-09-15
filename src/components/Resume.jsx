import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIntroduce, setMarkdown, setStyle, setStyleEditable } from '../redux/actions/action';
import { introduce, styles } from '../assets/data';
import Introduce from './Introduce';
import StyleSheet from './StyleSheet';
import { stageDuration, visibleSlice } from '../lib/typing';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

// The whole point of the animation is the two panes filling up, but it should
// never make the resume unreadable for long: the stages below take ~18s in
// total instead of the ~121s the per-character setTimeout loop needed.
const styleAfterFirstStage = styles[0] + styles[1];
const fullStyle = styles.join('');

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const Resume = () => {
  const dispatch = useDispatch();
  const currentStyle = useSelector((state) => state.currentStyle);
  const currentIntroduce = useSelector((state) => state.currentIntroduce);
  const isMD = useSelector((state) => state.isMD);
  const isStyleEditable = useSelector((state) => state.isStyleEditable);

  const frameRef = useRef(0);
  const resolveRef = useRef(null);
  const cancelledRef = useRef(false);
  // Visitors who asked their OS for reduced motion get the final resume
  // immediately, so the skip button never renders for them.
  const [isAnimating, setIsAnimating] = useState(() => !prefersReducedMotion());

  /**
   * Reveal `text` from `fromLength` to its full length within the stage budget.
   * The visible slice is derived from elapsed time, so a slow frame catches up
   * instead of falling behind.
   */
  const type = useCallback((text, fromLength, onUpdate) => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      const duration = stageDuration(text.length - fromLength);
      const startedAt = performance.now();

      const step = (now) => {
        if (cancelledRef.current) {
          resolve(false);
          return;
        }
        const progress = duration === 0 ? 1 : (now - startedAt) / duration;
        onUpdate(visibleSlice(text, fromLength, progress));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          resolve(true);
        }
      };

      frameRef.current = requestAnimationFrame(step);
    });
  }, []);

  const skip = useCallback(() => {
    cancelledRef.current = true;
    cancelAnimationFrame(frameRef.current);
    resolveRef.current?.(false);
    dispatch(setStyle(fullStyle));
    dispatch(setIntroduce(introduce));
    dispatch(setMarkdown(true));
    dispatch(setStyleEditable(true));
    setIsAnimating(false);
  }, [dispatch]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      dispatch(setStyle(fullStyle));
      dispatch(setIntroduce(introduce));
      dispatch(setMarkdown(true));
      dispatch(setStyleEditable(true));
      return undefined;
    }

    const run = async () => {
      if (!(await type(styles[0], 0, (value) => dispatch(setStyle(value))))) return;
      if (!(await type(introduce, 0, (value) => dispatch(setIntroduce(value))))) return;
      if (!(await type(styleAfterFirstStage, styles[0].length, (value) => dispatch(setStyle(value))))) return;

      dispatch(setMarkdown(true));

      if (!(await type(fullStyle, styleAfterFirstStage.length, (value) => dispatch(setStyle(value))))) return;

      dispatch(setStyleEditable(true));
      setIsAnimating(false);
    };

    run();

    return () => {
      cancelledRef.current = true;
      cancelAnimationFrame(frameRef.current);
      resolveRef.current?.(false);
    };
  }, [dispatch, type]);

  const editStyle = useCallback((style) => {
    dispatch(setStyle(style));
  }, [dispatch]);

  return (
    <React.Fragment>
      <StyleSheet
        currentStyle={currentStyle}
        isStyleEditable={isStyleEditable}
        editStyle={editStyle}
      />
      <Introduce currentIntroduce={currentIntroduce} isMD={isMD}/>
      <style>{currentStyle}</style>
      {isAnimating && (
        <button type="button" className="skipAnimation" onClick={skip}>
          跳过动画
        </button>
      )}
    </React.Fragment>
  )
}

export default Resume;
