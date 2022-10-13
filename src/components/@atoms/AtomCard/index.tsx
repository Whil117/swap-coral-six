/* eslint-disable no-unused-vars */
import client from '@Apollo/client/notWSS';
import { albumByID } from '@Apollo/client/query/albumByID';
import { PLAYLISTBYID } from '@Apollo/client/query/playlistById';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { IImage, IQueryFilter, ISong } from '@Types/index';
import convertDateWithOptions from '@Utils/convertDateWithOptions';
import { useAtom, useAtomValue } from 'jotai';
import { NextRouter, useRouter } from 'next/router';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM, {
  ActionPlayer
} from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomImage from '../AtomImage';
import { getRandomTrack } from '../AtomPlayByAlbum&Playlist';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';
type Card = {
  id?: string;
  type?: string;
  image?: string;
  name?: string;
  release_date?: string;
  onClick?: () => void;
};
const ImageTypes = ['track', 'playlist', 'single', 'compilation', 'album'];

const TYPEMETHOD = {
  album: async (
    id: string,
    dispatch: (update: ActionPlayer) => void,
    router: NextRouter
  ) => {
    const data = await client
      .query<IQueryFilter<'albumById'>>({
        query: albumByID,
        variables: {
          id: id
        }
      })
      .then((res) => res.data);
    const randomTrack = getRandomTrack(
      data?.albumById?.tracks?.items as ISong[]
    );
    dispatch({
      type: 'SET_TRACK',
      payload: {
        currentTrack: {
          ...randomTrack,
          // artists: data?.albumById?.artists,
          album: randomTrack?.album,
          images: randomTrack?.album?.images as IImage[],
          destination: {
            type: 'playlist',
            id: id
          }
        },
        context: data?.albumById?.tracks?.items?.map((item) => ({
          ...item,
          images: item?.album?.images as IImage[],
          destination: {
            type: 'playlist',
            id: id
          }
        })),
        origin: router
      }
    });
  },
  playlist: async (
    id: string,
    dispatch: (update: ActionPlayer) => void,
    router: NextRouter
  ) => {
    const data = await client
      .query<IQueryFilter<'playListById'>>({
        query: PLAYLISTBYID,
        variables: {
          id: id
        }
      })
      .then((res) => res.data);
    const randomTrack = getRandomTrack(
      data?.playListById?.tracks?.items as ISong[]
    );

    dispatch({
      type: 'SET_TRACK',
      payload: {
        currentTrack: {
          ...randomTrack,
          // artists: data?.albumById?.artists,
          album: randomTrack?.album,
          images: randomTrack?.album?.images as IImage[],
          destination: {
            type: 'playlist',
            id: id
          }
        },
        context: data?.playListById?.tracks?.items?.map((item) => ({
          ...item,
          images: item?.album?.images as IImage[],
          destination: {
            type: 'playlist',
            id: id
          }
        })),
        origin: router
      }
    });
  }
};
const AtomCard = (props: Card) => {
  const router = useRouter();
  const colors = useAtomValue(COLORS_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  return (
    <AtomButton
      onClick={() => {
        if (props?.onClick) {
          props?.onClick();
        }
        document?.getElementById('view')?.scroll({
          top: 0,
          behavior: 'smooth'
        });
      }}
      customCSS={css`
        position: relative;
        cursor: pointer;
        z-index: 1;
        transition: all 0.3s ease;
        align-items: flex-start;
        justify-content: space-between;
        color: white;
        padding: 10px;
        background-color: #3b3b462b;
        border-radius: 5px;
        width: 200px;
        height: 270px;
        .hoverPlay {
          text-align: center;
          opacity: 0;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 180%;
          line-height: 120%;
          transition: all 0.3s ease-in-out;
          position: absolute;
          z-index: 2;
          right: 15px;
          bottom: 85px;
        }
        :hover {
          .hoverPlay {
            height: max-content;
            opacity: 1;
            z-index: 9999;
            transition: all 0.3s ease-in-out;
          }
          .onHide {
            display: none;
          }
        }
        &:hover {
          box-shadow: 0px 0px 10px #0000003f;
          background: #32323d;
        }
        @media (max-width: 520px) {
          width: 190px;
          height: 240px;
          margin: 0px;
        }
        @media (max-width: 465px) {
          width: 180px;
        }
        @media (max-width: 445px) {
          width: 150px;
        }
        @media (max-width: 425px) {
          width: 150px;
          height: 220px;
        }
        @media (max-width: 375px) {
          width: 130px;
          height: 220px;
        }
      `}
    >
      <AtomWrapper width="100%">
        <AtomImage
          src={props?.image as string}
          alt={props?.name as string}
          width="100%"
          height="180px"
          borderRadius={
            ImageTypes.includes(props?.type as string) ? '5px' : '50%'
          }
          customCSS={css`
            @media (max-width: 520px) {
              width: -webkit-fill-available;
              height: 170px;
            }
            @media (max-width: 445px) {
              width: -webkit-fill-available;
              height: 130px;
            }
            @media (max-width: 425px) {
              width: -webkit-fill-available;
              height: 130px;
            }
          `}
        />
        {ImageTypes.includes(props.type as string) && (
          <AtomButton
            className="hoverPlay"
            padding="10px"
            backgroundColor={colors?.[0]?.hex}
            borderRadius="50%"
            onClick={async () => {
              await TYPEMETHOD[props?.type as keyof typeof TYPEMETHOD](
                props?.id as string,
                dispatch,
                router
              );
            }}
          >
            <AtomIcon
              width="30px"
              height="30px"
              icon={
                false
                  ? 'https://res.cloudinary.com/whil/image/upload/v1661401538/pause_he3p5p.svg'
                  : 'https://res.cloudinary.com/whil/image/upload/v1661401539/play_obtqfo.svg'
              }
              color="white"
              customCSS={css`
                svg {
                  path {
                    /* fill: white; */
                    stroke: white;
                  }
                }
              `}
            />
          </AtomButton>
        )}
      </AtomWrapper>
      {(props?.name?.length as number) > 35 ? (
        <AtomText
          as="h4"
          color="white"
          customCSS={css`
            width: 100%;
            line-height: 1.2;
            text-align: left;
            font-size: 1rem;
          `}
        >
          {props?.name?.slice(0, 35)}...
        </AtomText>
      ) : (
        <AtomText
          as="h4"
          color="white"
          customCSS={css`
            width: 100%;
            line-height: 1.2;
            text-align: left;
            font-size: 1rem;
          `}
        >
          {props?.name}
        </AtomText>
      )}
      <AtomText color="white" opacity="0.5">
        {(props?.type?.charAt(0)?.toUpperCase() as string) +
          props?.type?.slice(1)}
        {props?.release_date
          ? ` • ${convertDateWithOptions(
              props?.release_date as string,
              'en-US',
              {
                year: 'numeric'
              }
            )}`
          : ''}
      </AtomText>
    </AtomButton>
  );
};

export default AtomCard;
