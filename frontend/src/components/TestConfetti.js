import React, { useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

const getInstance = () => {
  let instance = null;
  return {
    setInstance: (ref) => {
      instance = ref;
    },
    fire: () => {
        console.log("fire");
      if (instance) {
        instance({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 }
        });
      }
    },
  };
};

const confetti = getInstance();

const TestConfetti = () => {
  return (
    <>
      <ReactCanvasConfetti
        refConfetti={confetti.setInstance}
        style={{
          position: "fixed",
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      />
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <button onClick={confetti.fire}>Fire Confetti</button>
      </div>
    </>
  );
};

export default TestConfetti;
