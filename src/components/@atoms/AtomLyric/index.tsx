/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { timerAtom } from '@Hooks/useTimerTrack';
import { ILyric } from '@Types/index';
import convertToSecondsAndMinutes from '@Utils/convertToSecontsAndMinutes';
import isBackDark from '@Utils/isBlackOrWhite';
import useIframe from '@Utils/useRefIframe';
import { SetStateAction, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Vec3 } from 'node-vibrant/lib/color';
import { FC, MutableRefObject } from 'react';
import REDUCER_LYRIC_ATOM, { ACTIONLYRIC } from '../../../_jotai/lyrics';
import { PLAY_IFRAME_ATOM } from '../AtomPlayerIframe';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

type Props = {
  type: 'read' | 'edit' | 'view';
  colorBackground?: (string | Vec3)[] | any;
  currentTime?: number;
  setCurrentTime?: (update: SetStateAction<number>) => void;
  dispatch?: (update: ACTIONLYRIC) => void;
  audio?: MutableRefObject<HTMLAudioElement | undefined>;
  setPlayPlayer?: (update: SetStateAction<boolean>) => void;
} & ILyric;

const typeLyric = (props: Props) => ({
  view: () => {
    return (
      <AtomWrapper
        customCSS={css`
          margin-top: 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 2rem;
          display: flex;
          flex-direction: column;
        `}
      >
        <AtomText
          fontSize="30px"
          color="black"
          customCSS={css`
            color: ${isBackDark(props?.colorBackground?.[0]?.hex as string)};
          `}
        >
          {props.phrase}
        </AtomText>
      </AtomWrapper>
    );
  },
  read: () => {
    const spotifyEmbedWindow = useIframe();
    const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
    return (
      <AtomWrapper
        id={`${props.start as number}`}
        onClick={() => {
          setPlayIFRAME(true);
          if (!playIFRAME) {
            spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
          }
          if (props?.setCurrentTime) {
            props?.setCurrentTime(Number(props.start));
          }
          spotifyEmbedWindow.postMessage(
            {
              command: 'seek',
              timestamp: props.start
            },
            '*'
          );
        }}
        customCSS={css`
          margin-top: 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 2rem;
          display: flex;
          flex-direction: column;
        `}
      >
        <AtomText
          fontSize="32px"
          color="#121216"
          customCSS={css`
            font-family: 'Gotham', sans-serif;
            ${(props?.currentTime as number) >= (props?.start as number) &&
            css`
              color: white;
            /* `}
            ${(props?.start as number) + 2 < (props?.currentTime as number) &&
            css`
              color: white;
              opacity: 0.8;
            `} */
            &:hover {
              cursor: pointer;
              color: white;
            }
          `}
        >
          {props.phrase}
        </AtomText>
      </AtomWrapper>
    );
  },
  edit: () => (
    <AtomWrapper
      width="100%"
      flexDirection="row"
      justifyContent="space-between"
    >
      <AtomWrapper
        onClick={() => {
          props?.dispatch &&
            props?.dispatch({
              type: 'OPENBYLYRIC',
              payload: {
                openSetting: true,
                editLyric: {
                  id: props.id,
                  artists: props.artists,
                  start: Math.round(props?.currentTime ?? 0),
                  translates: props.translates,
                  phrase: props.phrase,
                  notifies: props.notifies
                }
              }
            });
        }}
        customCSS={css`
          cursor: pointer;
          margin-top: 20px;
          font-family: 'Open Sans', sans-serif;
          font-size: 2rem;
          display: flex;
          flex-direction: column;
          grid-column: 1;
        `}
      >
        <AtomText
          fontSize="30px"
          color="black"
          customCSS={css`
            ${props?.start &&
            props.start > 0 &&
            css`
              color: white;
            `}
            &:hover {
              cursor: pointer;
              color: white;
            }
          `}
        >
          {props.phrase}
        </AtomText>
        <AtomText
          fontSize="13px"
          color="black"
          customCSS={css`
            ${props?.start &&
            props.start > 0 &&
            css`
              color: white;
            `}
            &:hover {
              cursor: pointer;
              color: white;
            }
          `}
        >
          Start In: {convertToSecondsAndMinutes(props?.start as number).track}
        </AtomText>
      </AtomWrapper>
    </AtomWrapper>
  )
});

const AtomLyric: FC<Props> = (props) => {
  const colorBackground = useAtomValue(COLORS_ATOM);
  const [currentTime, setCurrentTime] = useAtom(timerAtom);
  const dispatch = useSetAtom(REDUCER_LYRIC_ATOM);
  return typeLyric({
    ...props,
    colorBackground,
    dispatch,
    currentTime,
    setCurrentTime
  })[props.type ?? 'read']();
};

export default AtomLyric;
