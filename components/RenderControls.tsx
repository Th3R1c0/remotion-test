import { z } from 'zod';
import { useRendering } from '../helpers/use-rendering';
import { CompositionProps, COMP_NAME } from '../types/constants';
import { AlignEnd } from './AlignEnd';
import { Button } from './Button/Button';
import { InputContainer } from './Container';
import { DownloadButton } from './DownloadButton';
import { ErrorComp } from './Error';
import { ProgressBar } from './ProgressBar';
import { Spacing } from './Spacing';
import { Settings } from './settings';

export const RenderControls: React.FC<{
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
  inputProps: z.infer<typeof CompositionProps>;
}> = ({ settings, setSettings, inputProps }) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <InputContainer>
      <Settings settings={settings} setSettings={setSettings} />

      {state.status === 'init' ||
      state.status === 'invoking' ||
      state.status === 'error' ? (
        <>
          <Spacing></Spacing>
          <AlignEnd>
            <Button
              disabled={state.status === 'invoking'}
              loading={state.status === 'invoking'}
              onClick={renderMedia}
            >
              Render video
            </Button>
          </AlignEnd>
          {state.status === 'error' ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      ) : null}
      {state.status === 'rendering' || state.status === 'done' ? (
        <>
          <ProgressBar
            progress={state.status === 'rendering' ? state.progress : 1}
          />
          <Spacing></Spacing>
          <AlignEnd>
            <DownloadButton undo={undo} state={state}></DownloadButton>
          </AlignEnd>
        </>
      ) : null}
    </InputContainer>
  );
};