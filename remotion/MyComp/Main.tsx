import { z } from 'zod';
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  random,
  Img,
  staticFile,
} from 'remotion';
import { CompositionProps, VIDEO_HEIGHT } from '../../types/constants';
import { loadFont, fontFamily } from '@remotion/google-fonts/Inter';
import React, { useMemo } from 'react';

loadFont();

const _container: React.CSSProperties = {
  backgroundColor: 'white',
};

const calculateSquareStyle = (
  index: number,
  frame: number,
  fps: number,
  fallSpeed: number,
  delayBetweenSpeed: number
): React.CSSProperties => {
  const delay = index * delayBetweenSpeed; // Adjust this for the desired stagger effect

  const squareFall = spring({
    frame: frame - delay,
    fps,
    from: -100, // Start above the screen
    to: VIDEO_HEIGHT + 300, // End below the screen
    durationInFrames: fps * fallSpeed, // Adjust as needed
  });

  const randomLeft = random(`left-${index}`) * 80 + 10; // Between 10% and 90%

  return {
    position: 'absolute',
    top: squareFall,
    left: `${randomLeft}%`,
    width: 100,
    height: 100,
    transform: 'translateX(-50%)',
  };
};

export const Main = ({
  title,
  sprites,
  fallSpeed,
  delayBetweenSpeed,
  backgroundImage,
  Subtitle,
  Difficulty,
}: any) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const container: React.CSSProperties = {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'lightblue',
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: 'Arial',
    fontSize: 120,
    position: 'absolute',
    top: 0,
    width: '100%',
    color: 'black',
    textAlign: 'center',
  };
  console.log(Subtitle);
  return (
    <AbsoluteFill style={container}>
      {backgroundImage && (
        <Img
          src={staticFile(`${backgroundImage}.png`)} // Use staticFile to reference the image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <h1 style={titleStyle}>{title}</h1>
      {sprites &&
        sprites.length > 0 &&
        sprites.map((sprite, index) => {
          const squareStyle = calculateSquareStyle(
            index,
            frame,
            fps,
            fallSpeed,
            delayBetweenSpeed
          );
          return (
            <div key={index} style={squareStyle}>
              <Img
                src={staticFile(`${sprite.image}.png`)} // Use staticFile to reference the image
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          );
        })}
      <div
        style={{
          position: 'absolute', // Position relative to parent AbsoluteFill
          bottom: 0,
          height: '23.33%', // 1/3 of the height
          backgroundColor: '#76B5F5',
          zIndex: 10, // Ensure it's at the front
          left: 0,
          right: 0,
          color: 'white',
          display: 'flex',
          fontFamily: 'Arial',
          fontSize: 30,
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          textAlign: 'center', // Center text within the flex container
        }}
      >
        {/* Your content here */}
        <h1>{Subtitle}</h1>
      </div>
    </AbsoluteFill>
  );
};
