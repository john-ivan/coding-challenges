import React from 'react';

function Nav({ prev, next }) {
  const styles = {
    textAlign: 'center',
    margin: '5px 0',
    fontWeight: 'bold',
  };
  return (
    <div style={styles}>
      <button style={styles} onClick={prev}>Prev</button>
      <button style={styles} onClick={next}>Next</button>
    </div>
  );
}

// add react props validation

export default Nav;
