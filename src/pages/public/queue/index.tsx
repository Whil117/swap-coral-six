import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IImage, ISong } from '@Types/index';
import { useAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const QueuePage: NextPageFCProps = () => {
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [favorites, setFavorite] = useAtom(MY_FAVORITES_REDUCER_ATOM);

  const TOTALTRACKSCONTEXT = controls?.context?.length as number;
  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page="Queue"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'Queue']}
        description={`Swap Coral Six - Queue is avaible now!`}
      />
      <AtomWrapper
        padding="25px"
        maxWidth="1440px"
        flexDirection="column"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
        `}
      >
        <h1>Queue</h1>
        <AtomWrapper>
          <AtomText color="white" fontSize="16px" fontWeight="bold">
            Now Playing
          </AtomText>
          <AtomTrack
            type="playlist"
            key={controls?.currentTrack?.id}
            onPlay={() => {
              dispatch({
                type: 'SET_TRACK',
                payload: {
                  currentTrack: {
                    ...controls?.currentTrack
                  },
                  context: controls?.context
                }
              });
            }}
            onFavorite={() => {
              const isFavorite = favorites?.some(
                (favorites) => favorites.id === controls?.currentTrack?.id
              );
              if (isFavorite) {
                setFavorite((prev) =>
                  prev.filter(
                    (favorite) => favorite.id !== controls?.currentTrack?.id
                  )
                );
              } else {
                setFavorite((prev) => [
                  ...prev,
                  {
                    ...controls?.currentTrack,
                    // artists: data?.albumById?.artists,
                    images: controls?.currentTrack?.images as IImage[],
                    album: controls?.currentTrack?.album,
                    track_number: favorites.length + 1,
                    destination: {
                      type: 'album',
                      id: controls?.currentTrack?.album?.id as string
                    }
                  }
                ]);
              }
            }}
            album={controls?.currentTrack as ISong}
          />
        </AtomWrapper>
        <AtomText color="white" fontSize="16px" fontWeight="bold">
          Next Up
        </AtomText>
        <AtomWrapper>
          {controls?.context
            ?.filter((item) => {
              const CURRENTTRACKNUMBER = controls?.currentTrack
                ?.track_number as number;
              return (item?.track_number as number) > CURRENTTRACKNUMBER;
            })
            ?.sort(function (a, b) {
              if (b.track_number) {
                if ((a.track_number as number) > b.track_number) return 1;
                if ((a.track_number as number) < b.track_number) return -1;
              }
              return 0;
            })
            ?.map((item) => (
              <AtomTrack
                type="playlist"
                key={item?.id}
                onPlay={() => {
                  dispatch({
                    type: 'SET_TRACK',
                    payload: {
                      currentTrack: {
                        ...item,
                        // artists: data?.albumById?.artists,
                        images: item?.images as IImage[],
                        album: item?.album,
                        destination: {
                          type: 'album',
                          id: item?.album?.id as string
                        }
                      },
                      context: controls?.context
                    }
                  });
                }}
                onFavorite={() => {
                  const isFavorite = favorites?.some(
                    (favorites) => favorites.id === item?.id
                  );
                  if (isFavorite) {
                    setFavorite((prev) =>
                      prev.filter((favorite) => favorite.id !== item?.id)
                    );
                  } else {
                    setFavorite((prev) => [
                      ...prev,
                      {
                        ...item,
                        // artists: data?.albumById?.artists,
                        images: item?.images as IImage[],
                        album: item?.album,
                        track_number: favorites.length + 1,
                        destination: {
                          type: 'album',
                          id: item?.id as string
                        }
                      }
                    ]);
                  }
                }}
                album={item as ISong}
              />
            ))}
          {(controls?.currentTrack?.track_number as number) <=
            TOTALTRACKSCONTEXT && (
            <>
              {controls?.context
                ?.filter((item) => {
                  const CURRENTTRACKNUMBER = controls?.currentTrack
                    ?.track_number as number;
                  return (item?.track_number as number) < CURRENTTRACKNUMBER;
                })
                ?.sort(function (a, b) {
                  if (b.track_number) {
                    if ((a.track_number as number) > b.track_number) return 1;
                    if ((a.track_number as number) < b.track_number) return -1;
                  }
                  return 0;
                })
                ?.map((item) => (
                  <AtomTrack
                    type="playlist"
                    key={item?.id}
                    onPlay={() => {
                      dispatch({
                        type: 'SET_TRACK',
                        payload: {
                          currentTrack: {
                            ...item,
                            // artists: data?.albumById?.artists,
                            images: item?.images as IImage[],
                            album: item?.album,
                            destination: {
                              type: 'album',
                              id: item?.album?.id as string
                            }
                          },
                          context: controls?.context
                        }
                      });
                    }}
                    onFavorite={() => {
                      const isFavorite = favorites?.some(
                        (favorites) => favorites.id === item?.id
                      );
                      if (isFavorite) {
                        setFavorite((prev) =>
                          prev.filter((favorite) => favorite.id !== item?.id)
                        );
                      } else {
                        setFavorite((prev) => [
                          ...prev,
                          {
                            ...item,
                            // artists: data?.albumById?.artists,
                            images: item?.images as IImage[],
                            album: item?.album,
                            track_number: favorites.length + 1,
                            destination: {
                              type: 'album',
                              id: item?.id as string
                            }
                          }
                        ]);
                      }
                    }}
                    album={item as ISong}
                  />
                ))}
            </>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};
export async function getServerSideProps() {
  QueuePage.SEO = {
    title: 'Queue',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Queue is avaible now!`,
    keywords: ['swapcoralsix', 'Queue']
  };

  return {
    props: {}
  };
}
QueuePage.Layout = 'public';

export default QueuePage;
