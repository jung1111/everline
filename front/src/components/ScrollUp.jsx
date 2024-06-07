import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollUp = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scrollup-btn"   onClick={scrollToTop}>
        <span>......</span>
        <FontAwesomeIcon icon={faArrowUp} size="2x"/>
    </button>
  );
};


export default ScrollUp;
