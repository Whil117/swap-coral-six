/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useTime from '@Hooks/useTime';
import { ISong } from '@Types/index';
import { DragControls } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import MY_FAVORITES_REDUCER_ATOM, {
  ActionPlayer
} from '_jotai/favoritesSongs/reducer';
import AtomButton from '../AtomButton';
import AtomDraggable from '../AtomDraggable';
import AtomIcon from '../AtomIcon';
import AtomImage from '../AtomImage';
import AtomLINK from '../AtomLink';
import AtomPlayTrack from '../AtomPlayTrack';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

type AlbumProps = ISong;

const typeTracks = {
  album: (props: AtomTrack) => {
    const router = useRouter();
    const color = useAtomValue(COLORS_ATOM);
    const isFavorite = props?.favorites?.some(
      (favorites) => favorites.id === props?.album?.id
    );

    return (
      <AtomWrapper
        customCSS={css`
          margin-bottom: 1rem;
          padding: 0.5rem;
          display: grid;
          grid-template-columns: 50px 1fr 1fr 50px;
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
        `}
        key={props?.album?.id}
      >
        <AtomPlayTrack
          {...props?.album}
          trackNumber={props?.album?.track_number}
          onPlay={props?.onPlay}
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
          {props?.album?.album?.images?.[0]?.url && (
            <AtomImage
              src={props?.album?.album?.images?.[0]?.url}
              alt="xd"
              width="50px"
              height="50px"
            />
          )}
          <AtomWrapper>
            <AtomText as="p" color="white">
              {props?.album?.name}
            </AtomText>
            {props?.album?.artists?.length !== 0 && (
              <AtomWrapper flexDirection="row" justifyContent="flex-start">
                {props?.album?.artists?.map((artist, index) => (
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
            onClick={props?.onFavorite}
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
              duration_ms: props?.album?.duration_ms
            })}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  playlist: (props: AtomTrack) => {
    const router = useRouter();
    const color = useAtomValue(COLORS_ATOM);
    const isFavorite = props?.favorites?.some(
      (favorites) => favorites?.id === props?.album?.id
    );

    return (
      <AtomWrapper
        customCSS={css`
          margin-bottom: 1rem;
          padding: 0.5rem;
          display: grid;
          grid-template-columns: 50px 1fr 1fr auto;
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
        `}
        key={props?.album?.id}
      >
        <AtomPlayTrack
          {...props?.album}
          trackNumber={props?.album?.track_number}
          onPlay={props?.onPlay}
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
          {props?.album?.album?.images?.[0]?.url && (
            <AtomImage
              src={props?.album?.album?.images?.[0]?.url}
              alt="xd"
              width="50px"
              height="50px"
            />
          )}
          <AtomWrapper>
            <AtomText as="p" color="white">
              {props?.album?.name}
            </AtomText>
            {props?.album?.artists?.length !== 0 && (
              <AtomWrapper flexDirection="row" justifyContent="flex-start">
                {props?.album?.artists?.map((artist, index) => (
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
          link={`/public/album/${props.album?.album?.id}`}
          textDecoration="underline"
        >
          <AtomText color="white" textDecoration="underline">
            {props?.album?.album?.name}
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
            onClick={props?.onFavorite}
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
              duration_ms: props?.album?.duration_ms
            })}
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  dragable: (props: AtomTrack) => {
    const router = useRouter();
    const color = useAtomValue(COLORS_ATOM);
    const isFavorite = props?.favorites?.some(
      (favorites) => favorites?.id === props?.album?.id
    );

    return (
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
        `}
        key={props?.album?.id}
      >
        <AtomPlayTrack
          {...props?.album}
          trackNumber={props?.album?.track_number}
          onPlay={props?.onPlay}
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
          {props?.album?.album?.images?.[0]?.url && (
            <AtomImage
              src={props?.album?.album?.images?.[0]?.url}
              alt="xd"
              width="50px"
              height="50px"
            />
          )}
          <AtomWrapper>
            <AtomText as="p" color="white">
              {props?.album?.name}
            </AtomText>
            {props?.album?.artists?.length !== 0 && (
              <AtomWrapper flexDirection="row" justifyContent="flex-start">
                {props?.album?.artists?.map((artist, index) => (
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
          link={`/public/album/${props.album?.album?.id}`}
          textDecoration="underline"
        >
          <AtomText color="white" textDecoration="underline">
            {props?.album?.album?.name}
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
            onClick={props?.onFavorite}
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
              duration_ms: props?.album?.duration_ms
            })}
          </AtomText>
        </AtomWrapper>
        <AtomDraggable dragControls={props?.dragControls as DragControls} />
      </AtomWrapper>
    );
  }
};

type AtomTrack = {
  type: keyof typeof typeTracks;
  onPlay: () => void;
  onFavorite: () => void;
  album?: AlbumProps;
  favorites?: ISong[];
  dragControls?: DragControls;
  dispatch?: (update: ActionPlayer) => void;
};

const AtomTrack: FC<AtomTrack> = (props) => {
  const favorites = useAtomValue(MY_FAVORITES_REDUCER_ATOM);
  return typeTracks[props.type]({
    ...props,
    favorites
  });
};

export default AtomTrack;
