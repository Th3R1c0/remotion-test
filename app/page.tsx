'use client';
import { Player } from '@remotion/player';
import type { NextPage } from 'next';
import React, { useMemo, useState } from 'react';
import { Main } from '../remotion/MyComp/Main';
import {
  CompositionProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from '../types/constants';
import { z } from 'zod';
import { RenderControls } from '../components/RenderControls';
import { Tips } from '../components/Tips/Tips';
import { Spacing } from '../components/Spacing';

const container: React.CSSProperties = {
  maxWidth: 768,
  margin: 'auto',
  marginBottom: 20,
};

const outer: React.CSSProperties = {
  borderRadius: 'var(--geist-border-radius)',
  overflow: 'hidden',
  boxShadow: '0 0 200px rgba(0, 0, 0, 0.15)',
  marginBottom: 40,
  marginTop: 60,
};

const player: React.CSSProperties = {
  width: '100%',
};

const Home: NextPage = () => {
  const [settings, setSettings] = useState<any>({
    title: '',
    Subtitle: '',
    Difficulty: 'easy',
    sprites: [
      { image: 'money', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'money2', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
      { image: 'poo', animation: 'straight' },
    ],
    fallSpeed: 10,
    delayBetweenSpeed: 30,
    backgroundImage: false,
  });

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      title: settings.title,
      sprites: settings.sprites,
      fallSpeed: settings.fallSpeed,
      delayBetweenSpeed: settings.delayBetweenSpeed,
      backgroundImage: settings.backgroundImage,
      Difficulty: settings.Difficulty,
      Subtitle: settings.Subtitle,
    };
  }, [settings]);

  return (
    <div>
      <div style={container}>
        <div className="cinematics" style={outer}>
          <Player
            component={Main}
            inputProps={inputProps}
            durationInFrames={DURATION_IN_FRAMES}
            fps={VIDEO_FPS}
            compositionHeight={VIDEO_HEIGHT}
            compositionWidth={VIDEO_WIDTH}
            style={player}
            controls
            autoPlay
            loop
          />
        </div>
        <RenderControls
          settings={settings}
          setSettings={setSettings}
          inputProps={inputProps}
        />
        <Spacing />
        <Spacing />
        <Spacing />
        <Spacing />
        <Tips />
      </div>
    </div>
  );
};

export default Home;
