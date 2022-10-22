/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { addLeadingZeros } from '@Hooks/useTime';
import useTimer, { timerAtom } from '@Hooks/useTimerTrack';
import convertToSecondsAndMinutes from '@Utils/convertToSecontsAndMinutes';
import useIframe from '@Utils/useRefIframe';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomInput from '../AtomInput';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

export const PLAY_IFRAME_ATOM = atom(false);

const AtomPlayerIframe: FC = () => {
  const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [currentTime, setCurrentTime] = useAtom(timerAtom);
  const colors = useAtomValue(COLORS_ATOM);
  const spotifyEmbedWindow = useIframe();
  const router = useRouter();
  const CURRTRACK = (controls?.currentTrack?.duration_ms as number) / 1000;
  useTimer({
    ms: 1000,
    start: 0,
    end: CURRTRACK,
    play: playIFRAME,
    repeat: controls?.controls?.repeat,
    onCompleted: (returnCOn) => {
      if (controls.controls?.repeatByOne) {
        setCurrentTime(0);
        setPlayIFRAME(true);
        spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
        spotifyEmbedWindow.postMessage(
          {
            command: 'seek',
            timestamp: 0
          },
          '*'
        );
      } else if (returnCOn?.controls?.repeat) {
        setCurrentTime(0);
        setPlayIFRAME(true);
        dispatch({
          type: 'CHANGE_TRACK',
          payload: {
            currentTrack: {
              track_number:
                (returnCOn?.currentTrack?.track_number as number) + 1
            }
          }
        });
      } else {
        setCurrentTime(0);
        setPlayIFRAME(false);
      }
    }
  });

  return (
    <>
      <AtomWrapper
        height="90px"
        customCSS={css`
          padding: 10px;
          grid-column: 1 / -1;
          grid-row: 2;
          background-color: #191922;
          display: grid;
          grid-template-columns: 0.7fr 1fr 0.7fr;
          gap: 10px;
          @media (max-width: 980px) {
            grid-template-columns: 1fr auto;
            padding: 0 15px 15px 15px;
          }
        `}
      >
        <AtomWrapper
          gap="20px"
          alignItems="center"
          justifyContent="flex-start"
          flexDirection="row"
          height="100%"
        >
          <iframe
            src={`https://open.spotify.com/embed/track/${controls?.currentTrack?.id}?utm_source=generator`}
            width="auto"
            height="80px"
            id="IFRAMEPLAYER"
            frameBorder="0"
            allowTransparency
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture;"
          ></iframe>
          <AtomButton
            width="auto"
            backgroundColor="transparent"
            padding="0px"
            onClick={() => {
              router
                .push({
                  pathname: `/public/album/[id]`,
                  query: {
                    id: controls?.currentTrack?.album?.id
                  }
                })
                .then(() => {
                  document?.getElementById('view')?.scroll({
                    top: 0
                  });
                });
            }}
          >
            <AtomIcon
              width="25px"
              height="25px"
              customCSS={css`
                svg {
                  path {
                    stroke: white;
                  }
                }
              `}
              icon={
                router.asPath.includes('video')
                  ? 'https://res.cloudinary.com/whil/image/upload/v1661706864/PREVVIDEO_icmtkr.svg'
                  : 'https://res.cloudinary.com/whil/image/upload/v1661706864/TOVIDEO_j3jb2e.svg'
              }
            />
          </AtomButton>
        </AtomWrapper>
        <AtomWrapper justifyContent="center">
          <AtomWrapper>
            <AtomWrapper
              flexDirection="row"
              height="100%"
              alignItems="center"
              justifyContent="center"
              gap="20px"
            >
              <AtomButton
                backgroundColor="transparent"
                padding="0px"
                onClick={() => {
                  if (!controls.controls?.repeatByOne) {
                    dispatch({
                      type: 'SET_REPEAT',
                      payload: {}
                    });
                  }
                  if (controls.controls?.repeat) {
                    dispatch({
                      type: 'SET_REPEATBYONE',
                      payload: {}
                    });
                  }
                  if (controls.controls?.repeatByOne) {
                    dispatch({
                      type: 'SET_REPEATBYONE',
                      payload: {}
                    });
                  }
                }}
                customCSS={css`
                  @media (max-width: 980px) {
                    display: none;
                  }
                `}
              >
                <AtomIcon
                  icon={
                    controls.controls?.repeatByOne === false
                      ? 'https://res.cloudinary.com/whil/image/upload/v1661401540/repeatt_yet17i.svg'
                      : 'https://res.cloudinary.com/whil/image/upload/v1666418101/repeate-one_genumq.svg'
                  }
                  width="22px"
                  height="22px"
                  customCSS={css`
                    svg {
                      path {
                        stroke: ${controls.controls?.repeat ||
                        controls.controls?.repeatByOne
                          ? colors?.[0]?.hex
                          : 'white'};
                      }
                    }
                  `}
                />
              </AtomButton>
              <AtomButton
                backgroundColor="transparent"
                padding="0px"
                onClick={() => {
                  // spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
                  setCurrentTime(0);
                  setPlayIFRAME(true);
                  dispatch({
                    type: 'CHANGE_TRACK',
                    payload: {
                      currentTrack: {
                        track_number:
                          (controls?.currentTrack?.track_number as number) - 1
                      }
                    }
                  });
                }}
                customCSS={css`
                  @media (max-width: 980px) {
                    display: none;
                  }
                `}
              >
                <AtomIcon
                  icon="https://res.cloudinary.com/whil/image/upload/v1661401539/previous_sqclao.svg"
                  width="22px"
                  height="22px"
                  customCSS={css`
                    svg {
                      path {
                        stroke: white;
                      }
                    }
                  `}
                />
              </AtomButton>
              <AtomButton
                backgroundColor="transparent"
                padding="0px"
                onClick={() => {
                  setPlayIFRAME((prev) => !prev);
                  spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
                }}
              >
                <AtomIcon
                  width="45px"
                  height="45px"
                  customCSS={css`
                    svg {
                      path {
                        stroke: white;
                      }
                    }
                  `}
                  icon={
                    playIFRAME
                      ? 'https://res.cloudinary.com/whil/image/upload/v1661674261/pause-circle_yw7s3n.svg'
                      : 'https://res.cloudinary.com/whil/image/upload/v1661674252/play-circle_tq6brv.svg'
                  }
                />
              </AtomButton>
              <AtomButton
                backgroundColor="transparent"
                padding="0px"
                onClick={async () => {
                  setCurrentTime(0);
                  setPlayIFRAME(true);
                  dispatch({
                    type: 'CHANGE_TRACK',
                    payload: {
                      currentTrack: {
                        track_number:
                          (controls?.currentTrack?.track_number as number) + 1
                      }
                    }
                  });
                }}
                customCSS={css`
                  @media (max-width: 980px) {
                    display: none;
                  }
                `}
              >
                <AtomIcon
                  icon="https://res.cloudinary.com/whil/image/upload/v1661401538/next_mudtaa.svg"
                  width="22px"
                  height="22px"
                  customCSS={css`
                    svg {
                      path {
                        stroke: white;
                      }
                    }
                  `}
                />
              </AtomButton>
              <AtomButton
                backgroundColor="transparent"
                padding="0px"
                onClick={() => {
                  dispatch({
                    type: 'SET_ALEATORY',
                    payload: {
                      controls: {
                        aleatory: !controls.controls?.aleatory
                      }
                    }
                  });
                }}
                customCSS={css`
                  @media (max-width: 980px) {
                    display: none;
                  }
                `}
              >
                <AtomIcon
                  icon="https://res.cloudinary.com/whil/image/upload/v1661632351/aleatory_fql0tl.svg"
                  width="22px"
                  height="22px"
                  customCSS={css`
                    svg {
                      path {
                        stroke: ${controls.controls?.aleatory
                          ? colors?.[0]?.hex
                          : 'white'};
                      }
                    }
                  `}
                />
              </AtomButton>
            </AtomWrapper>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              width: 100%;
              grid-row: 2;
              display: grid;
              gap: 10px;
              grid-template-columns: auto 1fr auto;
              align-items: center;
              @media (max-width: 980px) {
                grid-row: 2;
              }
            `}
          >
            <AtomText
              as="p"
              color="white"
              customCSS={css`
                margin: 0;
                grid-column: 1;
                @media (max-width: 980px) {
                  display: none;
                }
              `}
            >
              {convertToSecondsAndMinutes(currentTime)?.minutes}:
              {addLeadingZeros(
                convertToSecondsAndMinutes(currentTime)?.seconds
              )}
            </AtomText>
            <AtomInput
              id="player-reproductor"
              type="range"
              min="0"
              max={Math.floor(CURRTRACK)}
              value={currentTime}
              onClick={(event: any) => {
                const timeDuration = Number(event.target.value);

                setCurrentTime(Number(event.target.value));
                spotifyEmbedWindow.postMessage(
                  {
                    command: 'seek',
                    timestamp: timeDuration
                  },
                  '*'
                );
              }}
              onChange={(event) => {
                setCurrentTime(Number(event.target.value));
              }}
              customCSS={css`
                height: 6px;
                grid-column: 2;
                outline: none;
                -webkit-appearance: none;
                cursor: pointer;
                background: rgb(92 86 86 / 60%);
                border: none;
                border-radius: 5px;
                background-image: linear-gradient(
                  ${colors?.[0]?.hex},
                  ${colors?.[0]?.hex}
                );
                background-repeat: no-repeat;

                background-size: ${Math.floor(
                    ((currentTime * 100) / CURRTRACK || 0) as number as number
                  )}%
                  100%;
                &::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  height: 15px;
                  width: 15px;
                  border-radius: 50%;
                  background: ${colors?.[0]?.hex};
                  cursor: pointer;
                  box-shadow: 0 0 2px 0 #555;
                  transition: background 0.3s ease-in-out;
                }
                &::-moz-range-thumb {
                  -webkit-appearance: none;
                  height: 20px;
                  border-radius: 50%;
                  background: ${colors?.[0]?.hex};
                  cursor: pointer;
                  box-shadow: 0 0 2px 0 #555;
                  transition: background 0.3s ease-in-out;
                }
                &::-ms-thumb {
                  -webkit-appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 50%;
                  background: ${colors?.[0]?.hex};
                  cursor: ew-resize;
                  box-shadow: 0 0 2px 0 #555;
                  transition: background 0.3s ease-in-out;
                }
                &::-webkit-slider-thumb:hover {
                  background: ${colors?.[0]?.hex};
                }
                &::-moz-range-thumb:hover {
                  background: ${colors?.[0]?.hex};
                }
                &::-ms-thumb:hover {
                  background: ${colors?.[0]?.hex};
                }

                &::-webkit-slider-runnable-track {
                  -webkit-appearance: none;
                  box-shadow: none;
                  border: none;
                  background: transparent;
                }
                &::-moz-range-track {
                  -webkit-appearance: none;
                  box-shadow: none;
                  border: none;
                  background: transparent;
                }
                &::-ms-track {
                  -webkit-appearance: none;
                  box-shadow: none;
                  border: none;
                  background: transparent;
                }
                @media (max-width: 980px) {
                  height: 2px;
                  grid-row: 1 / -1;
                  grid-column: 1 / -1;
                  ::-webkit-slider-thumb {
                    margin-top: -6.95px;
                    width: 100%;
                    height: 23px;
                    opacity: 0;
                    background: rgba(241, 86, 209, 0.1);
                    border: 2.5px solid #83e584;
                    border-radius: 12px;
                    cursor: pointer;
                    -webkit-appearance: none;
                  }
                }
              `}
            />
            <AtomText
              as="p"
              color="white"
              customCSS={css`
                margin: 0;
                grid-column: 3;
                @media (max-width: 980px) {
                  display: none;
                }
              `}
            >
              {convertToSecondsAndMinutes(CURRTRACK)?.minutes}:
              {addLeadingZeros(convertToSecondsAndMinutes(CURRTRACK)?.seconds)}
            </AtomText>
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          customCSS={css`
            gap: 15px;
            margin-right: 25px;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomButton
            backgroundColor="transparent"
            padding="0px"
            customCSS={css`
              ${router?.asPath?.includes('/lyric') &&
              css`
                border-bottom: 2px solid ${colors?.[0]?.hex};
                padding-bottom: 10px;
              `}
            `}
            onClick={() => {
              router?.asPath?.includes('/lyric')
                ? router.back()
                : router
                    ?.push({
                      pathname: '/public/lyric/[id]',
                      query: {
                        id: controls?.currentTrack?.id
                      }
                    })
                    .then(() => {
                      document?.getElementById('view')?.scroll({
                        top: 0,
                        behavior: 'smooth'
                      });
                    });
            }}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661655095/microphone_pnd062.svg"
              width="22px"
              height="22px"
              color={
                router?.asPath?.includes('/lyric')
                  ? (colors?.[0]?.hex as string)
                  : 'white'
              }
            />
          </AtomButton>
          <AtomButton
            padding="0px"
            backgroundColor="transparent"
            onClick={() => {
              router.asPath.includes('/queue')
                ? router.back()
                : router.push('/public/queue').then(() => {
                    document?.getElementById('view')?.scroll({
                      top: 0,
                      behavior: 'smooth'
                    });
                  });
            }}
            customCSS={css`
              @media (max-width: 980px) {
                display: none;
              }
              ${router?.asPath?.includes('/queue') &&
              css`
                border-bottom: 2px solid ${colors?.[0]?.hex};
                padding-bottom: 10px;
              `}
            `}
          >
            <AtomIcon
              icon="https://res.cloudinary.com/whil/image/upload/v1661401538/music-filter_pfws7j.svg"
              width="22px"
              height="22px"
              customCSS={css`
                svg {
                  path {
                    stroke: ${router?.asPath?.includes('/queue')
                      ? (colors?.[0]?.hex as string)
                      : 'white'};
                  }
                }
              `}
            />
          </AtomButton>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default AtomPlayerIframe;
