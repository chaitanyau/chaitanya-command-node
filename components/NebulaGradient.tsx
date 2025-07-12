import React from 'react';

const NebulaGradient = () => {
  return (
    <>
      <style>
        {`
          .nebula-gradient {
           background: linear-gradient(-45deg, #000000, #051427, #101b39, #210535, #282157, #430d4b, #530f1e, #7b337d, #a44322, #c874b2, #da8a8b, #f5d5e0, #ced7e0, #9ccddc, #5591a9);
            background-size: 100% 100%;
            animation: gradient 15s ease infinite;
            height: 100vh;
            width: 100vw;
            position: fixed;
            top: 0;
            left: 0;
            z-index: -1;
            opacity: 0.1; /* Adjust opacity as needed */    
          }

          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
      <div className="nebula-gradient" />
    </>
  );
};

export default NebulaGradient;