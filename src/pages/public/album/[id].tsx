import { useQuery } from '@apollo/client';
import client from '@Apollo/client/notWSS';
import { albumByID } from '@Apollo/client/query/albumByID';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomPlayByAlbumPlaylist, {
  getRandomTrack
} from '@Components/@atoms/AtomPlayByAlbum&Playlist';
import AtomSEO from '@Components/@atoms/AtomSeo';

import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IAlbumType, IImage, IQueryFilter, ISong } from '@Types/index';
import { useAtom, useSetAtom } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import { useRouter } from 'next/router';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const AlbumPublic: NextPageFC<{ id: string }> = ({ id }) => {
  const dispatch = useSetAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [favorites, setFavorite] = useAtom(MY_FAVORITES_REDUCER_ATOM);
  const router = useRouter();
  const { data, loading } = useQuery<IQueryFilter<'albumById'>>(albumByID, {
    skip: !id,
    fetchPolicy: 'no-cache',
    variables: {
      id: id
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page={data?.albumById?.name}
        image={data?.albumById?.images?.[0]?.url}
        keywords={[data?.albumById?.name as string]}
        description={data?.albumById?.name}
      />
      {loading ? (
        <AtomLoader type="small" isLoading colorLoading="white" />
      ) : (
        <>
          <AtomBanner type="album" album={data?.albumById} />
          <AtomPlayByAlbumPlaylist
            context={data?.albumById as IAlbumType}
            type="album"
            onDispatch={() => {
              const randomTrack = getRandomTrack(
                data?.albumById?.tracks?.items as ISong[]
              );
              dispatch({
                type: 'SET_TRACK',
                payload: {
                  currentTrack: {
                    ...randomTrack,
                    // artists: data?.albumById?.artists,
                    images: data?.albumById?.images as IImage[],

                    album: {
                      ...data?.albumById,
                      tracks: {
                        ...data?.albumById?.tracks,
                        items: []
                      }
                    },
                    destination: {
                      type: 'album',
                      id: data?.albumById?.id as string
                    }
                  },
                  context: data?.albumById?.tracks?.items?.map((item) => ({
                    ...item,
                    album: {
                      ...data?.albumById,
                      tracks: {
                        ...data?.albumById?.tracks,
                        items: []
                      }
                    },
                    images: data?.albumById?.images as IImage[],
                    destination: {
                      type: 'album',
                      id: data?.albumById?.id as string
                    }
                  })),
                  origin: router
                }
              });
            }}
          />
          <AtomWrapper
            padding="45px 90px"
            maxWidth="1440px"
            flexDirection="row"
            flexWrap="wrap"
            customCSS={css`
              gap: 10px;
              @media (max-width: 980px) {
                padding: 0px 30px;
              }
            `}
          >
            {data?.albumById?.tracks?.items?.map((item) => (
              <AtomTrack
                type="album"
                key={item?.id}
                onPlay={() => {
                  dispatch({
                    type: 'SET_TRACK',
                    payload: {
                      currentTrack: {
                        ...item,
                        // artists: data?.albumById?.artists,
                        images: data?.albumById?.images as IImage[],
                        album: data?.albumById,
                        destination: {
                          type: 'album',
                          id: id
                        }
                      },
                      context: data?.albumById?.tracks?.items?.map((item) => ({
                        ...item,
                        album: data?.albumById,
                        images: data?.albumById?.images as IImage[],
                        destination: {
                          type: 'album',
                          id: id
                        }
                      })),
                      origin: router
                    }
                  });
                }}
                onFavorite={() => {
                  const isFavorite = favorites?.some(
                    (favorites) => favorites.id === item?.id
                  );
                  if (isFavorite) {
                    setFavorite((prev) =>
                      prev.filter((favorite) => favorite.id !== id)
                    );
                  } else {
                    setFavorite((prev) => [
                      ...prev,
                      {
                        ...item,
                        // artists: data?.albumById?.artists,
                        images: data?.albumById?.images as IImage[],
                        album: data?.albumById,
                        track_number: favorites.length + 1,
                        destination: {
                          type: 'album',
                          id: id
                        }
                      }
                    ]);
                  }
                }}
                album={item as ISong}
              />
            ))}
          </AtomWrapper>
        </>
      )}
    </AtomWrapper>
  );
};
AlbumPublic.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const artist = await client
    .query<IQueryFilter<'albumById'>>({
      query: albumByID,
      variables: {
        id: id
      }
    })
    ?.then((res) => res.data?.albumById);
  AlbumPublic.SEO = {
    title: artist?.name,
    image: artist?.images?.[0]?.url,
    description: `Swap Coral Six - ${artist?.name} is avaible now!`,
    keywords: ['swapcoralsix', artist?.name as string]
  };

  return {
    props: {
      id
    }
  };
}

export default AlbumPublic;
