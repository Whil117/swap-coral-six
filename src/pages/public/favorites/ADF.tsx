import AtomButton from '@Components/@atoms/AtomButton';
import AtomIcon from '@Components/@atoms/AtomIcon';
import AtomImage from '@Components/@atoms/AtomImage';
import AtomLINK from '@Components/@atoms/AtomLink';
import AtomPlayTrack from '@Components/@atoms/AtomPlayTrack';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useTime from '@Hooks/useTime';
import { ISong } from '@Types/index';
import {
  DragControls,
  Reorder,
  useDragControls,
  useMotionValue
} from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';

interface Props {
  item: ISong;
  onPlay: () => void;
  trackNumberByPosition: number;
  onDrag: () => void;
  onFavorite: () => void;
}
interface Prop2s {
  dragControls: DragControls;
}

export function ReorderIcon({ dragControls }: Prop2s) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 39"
      width="25"
      height="25"
      style={{
        zIndex: 999
      }}
      onPointerDown={(event) => dragControls.start(event)}
    >
      <path
        d="M 5 0 C 7.761 0 10 2.239 10 5 C 10 7.761 7.761 10 5 10 C 2.239 10 0 7.761 0 5 C 0 2.239 2.239 0 5 0 Z"
        fill="white"
      ></path>
      <path
        d="M 19 0 C 21.761 0 24 2.239 24 5 C 24 7.761 21.761 10 19 10 C 16.239 10 14 7.761 14 5 C 14 2.239 16.239 0 19 0 Z"
        fill="white"
      ></path>
      <path
        d="M 33 0 C 35.761 0 38 2.239 38 5 C 38 7.761 35.761 10 33 10 C 30.239 10 28 7.761 28 5 C 28 2.239 30.239 0 33 0 Z"
        fill="white"
      ></path>
      <path
        d="M 33 14 C 35.761 14 38 16.239 38 19 C 38 21.761 35.761 24 33 24 C 30.239 24 28 21.761 28 19 C 28 16.239 30.239 14 33 14 Z"
        fill="white"
      ></path>
      <path
        d="M 19 14 C 21.761 14 24 16.239 24 19 C 24 21.761 21.761 24 19 24 C 16.239 24 14 21.761 14 19 C 14 16.239 16.239 14 19 14 Z"
        fill="white"
      ></path>
      <path
        d="M 5 14 C 7.761 14 10 16.239 10 19 C 10 21.761 7.761 24 5 24 C 2.239 24 0 21.761 0 19 C 0 16.239 2.239 14 5 14 Z"
        fill="white"
      ></path>
      <path
        d="M 5 28 C 7.761 28 10 30.239 10 33 C 10 35.761 7.761 38 5 38 C 2.239 38 0 35.761 0 33 C 0 30.239 2.239 28 5 28 Z"
        fill="white"
      ></path>
      <path
        d="M 19 28 C 21.761 28 24 30.239 24 33 C 24 35.761 21.761 38 19 38 C 16.239 38 14 35.761 14 33 C 14 30.239 16.239 28 19 28 Z"
        fill="white"
      ></path>
      <path
        d="M 33 28 C 35.761 28 38 30.239 38 33 C 38 35.761 35.761 38 33 38 C 30.239 38 28 35.761 28 33 C 28 30.239 30.239 28 33 28 Z"
        fill="white"
      ></path>
    </svg>
  );
}

import { animate, MotionValue } from 'framer-motion';
import { useEffect } from 'react';

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)';

export function useRaisedShadow(value: MotionValue<number>) {
  const boxShadow = useMotionValue(inactiveShadow);

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive;
      if (latest !== 0) {
        isActive = true;
        if (isActive !== wasActive) {
          animate(boxShadow, '5px 5px 10px rgba(0,0,0,0.3)');
        }
      } else {
        isActive = false;
        if (isActive !== wasActive) {
          animate(boxShadow, inactiveShadow);
        }
      }
    });
  }, [value, boxShadow]);

  return boxShadow;
}

export const Item = ({
  item,
  onFavorite,
  onPlay,
  trackNumberByPosition,
  onDrag
}: Props) => {
  const props = item;
  const color = useAtomValue(COLORS_ATOM);
  const favorites = useAtomValue(MY_FAVORITES_REDUCER_ATOM);
  const dragControls = useDragControls();
  const router = useRouter();
  const isFavorite = favorites?.some(
    (favorites) => favorites.id === props?.album?.id
  );
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragListener={false}
      onDrag={onDrag}
      style={{ boxShadow, y, listStyleType: 'none' }}
      dragControls={dragControls}
    >
      <AtomWrapper
        customCSS={css`
          margin-bottom: 1rem;
          padding: 0.5rem;
          display: grid;
          grid-template-columns: 50px 1fr 1fr auto auto;
          &:hover {
            background-color: #222229;
          }
          gap: 10px;
          width: 100%;
          align-items: center;
          cursor: pointer;
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
          .hoverPlay {
            text-align: center;
            height: 0;
            opacity: 0;
            color: white;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            font-size: 180%;
            line-height: 120%;
            transition: all 0.3s ease-in-out;
          }
          :hover {
            .hoverPlay {
              height: max-content;
              opacity: 1;
              transition: all 0.3s ease-in-out;
            }
            .onHide {
              display: none;
            }
          }
          z-index: -1;
        `}
        key={props?.album?.id}
      >
        <AtomPlayTrack
          {...props}
          trackNumber={trackNumberByPosition}
          onPlay={onPlay}
        />
        <AtomWrapper
          flexDirection="row"
          customCSS={css`
            grid-column: 2;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            @media (max-width: 980px) {
              grid-column: 1 / -1;
            }
          `}
        >
          {props?.album?.images?.[0]?.url && (
            <AtomImage
              src={props?.album?.images?.[0]?.url}
              alt="xd"
              width="50px"
              height="50px"
            />
          )}
          <AtomWrapper>
            <AtomText as="p" color="white">
              {props?.name}
            </AtomText>
            {props?.artists?.length !== 0 && (
              <AtomWrapper flexDirection="row" justifyContent="flex-start">
                {props?.artists?.map((artist, index) => (
                  <AtomButton
                    key={artist?.id}
                    backgroundColor="transparent"
                    padding="0px"
                    onClick={() => {
                      router
                        .push({
                          pathname: `/public/artist/[id]`,
                          query: {
                            id: artist?.id
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
                    <AtomText
                      key={artist?.id}
                      fontSize="14px"
                      opacity="0.5"
                      color="white"
                      customCSS={css`
                        &:hover {
                          text-decoration: underline;
                        }
                      `}
                    >
                      {index === 0 ? artist?.name : `, ${artist?.name}`}
                    </AtomText>
                  </AtomButton>
                ))}
              </AtomWrapper>
            )}
          </AtomWrapper>
        </AtomWrapper>
        <AtomLINK
          link={`/public/album/${props.album?.id}`}
          textDecoration="underline"
        >
          <AtomText color="white" textDecoration="underline">
            {props?.album?.name}
          </AtomText>
        </AtomLINK>

        <AtomWrapper
          gap="10px"
          customCSS={css`
            grid-column: 4;
            align-self: center;
            justify-self: center;
            display: grid;
            grid-template-columns: 1fr 1fr;
            @media (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomButton
            padding="0px"
            backgroundColor="transparent"
            onClick={onFavorite}
          >
            <AtomIcon
              width="25px"
              height="25px"
              customCSS={css`
                border-radius: 10px;
              `}
              color={isFavorite ? color?.[0]?.hex : 'white'}
              icon="https://res.cloudinary.com/whil/image/upload/v1665959363/love_vwgqq4.svg"
            />
          </AtomButton>
          <AtomText as="p" color="white">
            {useTime({
              duration_ms: props?.duration_ms
            })}
          </AtomText>
        </AtomWrapper>
        <ReorderIcon dragControls={dragControls} />
      </AtomWrapper>
    </Reorder.Item>
  );
};
