/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomSEO from '@Components/@atoms/AtomSeo';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { IImage, ISong } from '@Types/index';
import axios from 'axios';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ISBOTTOM_ATOM } from 'layout/public/VIEW';
import { NextPageContext, NextPageFCProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const getLikedSongs = async (
  accessToken: string,
  url: string,
  setUrl?: (newurl: string) => void
): Promise<SpotifyApi.UsersSavedTracksResponse> => {
  const songs = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  songs.data.next !== null && setUrl && setUrl(songs?.data?.next);
  return songs.data;
};

const SONGS_ATOM = atom([] as ISong[]);

const INFOSONGS_ATOM = atom({} as SpotifyApi.UsersSavedTracksResponse);

const MyFavorites: NextPageFCProps = ({}) => {
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const user = useSession();
  const color = useAtomValue(COLORS_ATOM);
  const [songsLiked, setSongsLiked] = useAtom(SONGS_ATOM);
  const [config, setConfig] = useAtom(INFOSONGS_ATOM);
  const router = useRouter();
  const setBottomView = useSetAtom(ISBOTTOM_ATOM);
  useEffect(() => {
    getLikedSongs(
      user?.data?.accessToken as string,
      'https://api.spotify.com/v1/me/tracks?limit=50&locale=en,es-419;q=0.9,es;q=0.8'
    ).then((res) => {
      setSongsLiked(
        res.items?.map((item) => ({
          ...item.track
        })) as ISong[]
      );
      setConfig(res);
    });
  }, [user]);

  useEffect(() => {
    setBottomView({
      callback: () => {
        getLikedSongs(
          user?.data?.accessToken as string,
          config.next as string
        ).then((resitem) => {
          setSongsLiked((prev) => [
            ...prev,
            ...(resitem.items?.map((item) => ({
              ...item.track
            })) as ISong[])
          ]);
          setConfig(resitem);
        });
      }
    });
  }, [user, config]);

  return (
    <AtomWrapper>
      <AtomSEO
        title="Swap Coral Six"
        page="My Favorites Songs"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'My Favorites Songs']}
        description={`Swap Coral Six - My Favorites Songs is avaible now!`}
      />
      <AtomBanner type="likedSongs" />
      <AtomWrapper
        padding="0px 90px"
        // width="1440px"
        flexDirection="column"
        customCSS={css`
          display: flex;
          gap: 20px;
          margin-bottom: 35px;
        `}
      >
        {songsLiked?.map((item, index) => {
          return (
            <AtomTrack
              type="album"
              key={item?.id}
              onFavorite={() => {}}
              onPlay={() => {
                dispatch({
                  type: 'SET_TRACK',
                  payload: {
                    currentTrack: {
                      ...item,
                      // artists: data?.albumById?.artists,
                      images: item?.album?.images as IImage[],
                      album: item?.album,
                      destination: {
                        type: 'album',
                        id: item?.album?.id as string
                      }
                    },
                    context: songsLiked?.map((item) => ({
                      ...item,
                      album: item?.album,
                      images: item?.album?.images as IImage[],
                      destination: {
                        type: 'album',
                        id: item?.album?.id
                      }
                    })) as ISong[],
                    origin: router
                  }
                });
              }}
              // onFavorite={() => {
              //   const isFavorite = favorites?.some(
              //     (favorites) => favorites.id === item?.id
              //   );
              //   if (isFavorite) {
              //     setFavorite((prev) =>
              //       prev.filter((favorite) => favorite.id !== id)
              //     );
              //   } else {
              //     setFavorite((prev) => [
              //       ...prev,
              //       {
              //         ...item,
              //         // artists: data?.albumById?.artists,
              //         images: data?.albumById?.images as IImage[],
              //         album: data?.albumById,
              //         track_number: favorites.length + 1,
              //         destination: {
              //           type: 'album',
              //           id: id
              //         }
              //       }
              //     ]);
              //   }
              // }}
              album={{
                ...(item as ISong),
                track_number: index + 1,
                album: item.album
              }}
            />
          );
        })}
      </AtomWrapper>
    </AtomWrapper>
  );
};
MyFavorites.Layout = 'public';
export async function getServerSideProps(context: NextPageContext) {
  MyFavorites.SEO = {
    title: 'My Favorites Songs',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - My Favorites Songs is avaible now!`,
    keywords: ['swapcoralsix', 'My Favorites Songs']
  };

  return {
    props: {}
  };
}

export default MyFavorites;
