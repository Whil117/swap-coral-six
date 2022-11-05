import AtomButton from '@Components/@atoms/AtomButton';
import AtomIcon from '@Components/@atoms/AtomIcon';
import AtomImage from '@Components/@atoms/AtomImage';
import AtomInput from '@Components/@atoms/AtomInput';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { useAtom, useAtomValue } from 'jotai';
import { FC, ReactNode, useEffect, useState } from 'react';
import { PROGRESSBAR_ATOM } from '_jotai/player';
import REDUCER_LYRIC_ATOM from '../../../../_jotai/lyrics';

type Props = {
  children?: ReactNode;
};

const OrganismEditPlayer: FC<Props> = (props) => {
  const colorBackground = useAtomValue(COLORS_ATOM);
  const [lyrics, setLyrics] = useAtom(REDUCER_LYRIC_ATOM);
  const totalTime = 0;
  const [currentTime, setCurrentTime] = useAtom(PROGRESSBAR_ATOM);

  const [startIn, setStartIn] = useState(0);

  useEffect(() => {
    // if (audio.current) {
    //   setStartIn(lyrics.editLyric?.start || 0);
    //   setCurrentTime(lyrics.editLyric?.start || 0);
    //   audio.current.currentTime = lyrics.editLyric?.start || 0;
    // }
  }, [lyrics.editLyric?.start]);

  return (
    <AtomWrapper
      gap="20px"
      //   width="100%"
      customCSS={css`
        grid-row: 1;
      `}
    >
      <AtomText as="h1" fontWeight="bold" color="white">
        Edit Lyric
      </AtomText>
      <AtomInput
        type="textarea"
        id="phrase"
        value={lyrics.editLyric?.phrase}
        label="Phrase"
        customLabelCSS={css`
          color: white;
        `}
        customCSS={css`
          background-color: #121216;
          color: white;
          height: 200px;
          resize: none;
          padding: 5px;
          width: auto;
        `}
      />
      <AtomWrapper gap="20px">
        <AtomText>Time</AtomText>
        <AtomText>
          Duration Total:{' '}
          {/* {Math.round(convertSecondsOptions(totalTime || 0).minutes || 0) ||
              0}
            :
            {Math.round(convertSecondsOptions(totalTime || 0).seconds || 0) < 10
              ? `0${
                  Math.round(
                    convertSecondsOptions(totalTime || 0).seconds || 0
                  ) || 0
                }`
              : Math.round(
                  convertSecondsOptions(totalTime || 0).seconds ?? 0
                ) || 0} */}
        </AtomText>
        <AtomText>
          {/* Start in: {convertSecondsOptions(startIn ?? 0).minutes}:
            {convertSecondsOptions(startIn ?? 0).seconds < 10
              ? `0${convertSecondsOptions(startIn ?? 0).seconds}`
              : convertSecondsOptions(startIn ?? 0).seconds} */}
        </AtomText>
        <AtomText
          as="p"
          customCSS={css`
            margin: 0;
            grid-column: 1;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          {/* {convertSecondsOptions(currentTime ? currentTime : 0).minutes}:
            {convertSecondsOptions(currentTime ? currentTime : 0).seconds < 10
              ? `0${
                  convertSecondsOptions(currentTime ? currentTime : 0).seconds
                }`
              : convertSecondsOptions(currentTime ? currentTime : 0).seconds} */}
        </AtomText>
        <AtomInput
          id="player-reproductor"
          type="range"
          min="0"
          max={10}
          value={currentTime}
          onChange={(event) => {
            //   if (audio.current) {
            //     audio.current.currentTime = Number(event.target.value);
            //   }
          }}
          onClick={(event: any) => {
            setLyrics({
              type: 'OPENBYLYRIC',
              payload: {
                openSetting: true,
                editLyric: {
                  id: lyrics?.editLyric?.id,
                  artists: lyrics?.editLyric?.artists,
                  start: Math.round(audio?.current?.currentTime ?? 0),
                  translates: lyrics?.editLyric?.translates,
                  phrase: lyrics?.editLyric?.phrase,
                  notifies: lyrics?.editLyric?.notifies
                }
              }
            });
            setStartIn(event.target.value);
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
              ${colorBackground?.[0]?.hex},
              ${colorBackground?.[0]?.hex}
            );
            background-repeat: no-repeat;
            background-size: ${Math.floor(
                ((((currentTime - 0) * 100) / totalTime ||
                  currentTime) as number as number) - 0
              )}%
              100%;
            ::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 15px;
              width: 15px;
              border-radius: 50%;
              background: ${colorBackground[0]?.hex};
              cursor: pointer;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-moz-range-thumb {
              -webkit-appearance: none;
              height: 20px;
              border-radius: 50%;
              background: ${colorBackground[0]?.hex};
              cursor: pointer;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-ms-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: ${colorBackground[0]?.hex};
              cursor: ew-resize;
              box-shadow: 0 0 2px 0 #555;
              transition: background 0.3s ease-in-out;
            }
            ::-webkit-slider-thumb:hover {
              background: ${colorBackground[0]?.hex};
            }
            ::-moz-range-thumb:hover {
              background: ${colorBackground[0]?.hex};
            }
            ::-ms-thumb:hover {
              background: ${colorBackground[0]?.hex};
            }

            ::-webkit-slider-runnable-track {
              -webkit-appearance: none;
              box-shadow: none;
              border: none;
              background: transparent;
            }
            ::-moz-range-track {
              -webkit-appearance: none;
              box-shadow: none;
              border: none;
              background: transparent;
            }
            ::-ms-track {
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
      </AtomWrapper>
      <AtomText color="white">Artists</AtomText>
      {lyrics.editLyric?.artists?.map((artist) => (
        <AtomWrapper
          key={artist?.id}
          flexDirection="row"
          gap="20px"
          alignItems="center"
          customCSS={css`
            display: grid;
            grid-template-columns: 1fr auto;
          `}
        >
          <AtomWrapper flexDirection="row" alignItems="center" gap="20px">
            <AtomImage
              src={artist?.image as string}
              alt={artist?.name as string}
              width="75px"
              height="75px"
              borderRadius="50%"
            />
            <AtomText
              as="p"
              fontWeight="bold"
              fontSize="18px"
              width="auto"
              color="white"
            >
              {artist?.name}
            </AtomText>
          </AtomWrapper>
          <AtomButton
            onClick={() => {
              setLyrics({
                type: 'OPENBYLYRIC',
                payload: {
                  editLyric: {
                    ...lyrics.editLyric,
                    artists: lyrics?.editLyric?.artists?.filter(
                      (item) => item?.id !== artist?.id
                    )
                  }
                }
              });
            }}
          >
            <AtomIcon
              customCSS={css`
                svg {
                  path {
                    stroke: white;
                  }
                }
              `}
              icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/ZZEV3WD/icons/close-circle.svg"
            />
          </AtomButton>
        </AtomWrapper>
      ))}
    </AtomWrapper>
  );
};

export default OrganismEditPlayer;
