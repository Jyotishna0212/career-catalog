import React, { useEffect, useRef, useState } from 'react';

// Custom Hook for Event Listeners
function useEventListener(eventName, handler, element = document) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Custom Cursor Component
function AnimatedCursor() {
  const cursorRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    setCoords({ x: event.clientX, y: event.clientY });
  };

  useEventListener('mousemove', onMouseMove);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${coords.x}px`;
      cursorRef.current.style.top = `${coords.y}px`;
    }
  }, [coords]);

  // Cursor Styles
  const styles = {
    cursor: {
      zIndex: 999,
      display: 'block',
      position: 'fixed',
      borderRadius: '50%',
      width: 20,
      height: 20,
      backgroundColor: 'rgba(220, 90, 90, 1)',
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.15s ease-in-out',
    },
  };

  // Hide the default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return <div ref={cursorRef} style={styles.cursor} />;
}

export default AnimatedCursor;
