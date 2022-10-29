/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomButton from '@Components/@atoms/AtomButton';
import AtomIcon from '@Components/@atoms/AtomIcon';
import AtomImage from '@Components/@atoms/AtomImage';
import AtomLINK from '@Components/@atoms/AtomLink';
import AtomPlayTrack from '@Components/@atoms/AtomPlayTrack';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useTime from '@Hooks/useTime';
import { IImage } from '@Types/index';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import {
  DRAGENTER_ATOM,
  DRAGSTART_ATOM,
  REORDER_DRAGANDROP_ATOM
} from '_jotai/favoritesSongs/draggable';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const MyFavorites: NextPageFCProps = () => {
  const [favorites, setFavorites] = useAtom(MY_FAVORITES_REDUCER_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const router = useRouter();
  const setReorder = useSetAtom(REORDER_DRAGANDROP_ATOM);
  const [dragStartItem, setDragStart] = useAtom(DRAGSTART_ATOM);
  const [dragEnterOver, setDragEnter] = useAtom(DRAGENTER_ATOM);
  const color = useAtomValue(COLORS_ATOM);

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
        {favorites?.map((item, index) => {
          const isFavorite = favorites?.some(
            (favorites) => favorites.id === item?.id
          );
          return (
            <AtomWrapper
              onDragStart={() => {
                setDragStart(index);
              }}
              onDragEnter={() => {
                setDragEnter(index);
              }}
              onDragEnd={() => {
                setReorder({
                  list: favorites,
                  dragEnter: dragEnterOver,
                  dragStart: dragStartItem,
                  callback: (values) => {
                    dispatch({
                      type: 'SET_TRACK',
                      payload: {
                        currentTrack: values?.find(
                          (item) => item.id === controls.currentTrack?.id
                        ),
                        context: values,
                        origin: router
                      }
                    });
                  }
                });
              }}
              key={index}
              draggable
              customCSS={css`
                /* margin-bottom: 1rem; */
                padding: 0.5rem;
                display: grid;
                grid-template-columns: 50px 1fr 1fr auto auto;
                &:hover {
                  background-color: #222229;
                }
                /* z-index: 9999999; */
                gap: 10px;
                /* width: 100%; */
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
                ${dragEnterOver === index &&
                css`
                  background-color: #222229;
                  border-bottom: 2px solid ${color?.[0]?.hex};
                `}
              `}
            >
              <AtomPlayTrack
                {...item}
                trackNumber={index + 1}
                onPlay={() => {
                  dispatch({
                    type: 'SET_TRACK',
                    payload: {
                      currentTrack: {
                        ...item,
                        // artists: data?.albumById?.artists,
                        images: item?.album?.images as IImage[],
                        track_number: index + 1,
                        album: item?.album,
                        destination: {
                          type: 'album',
                          id: item?.album?.id as string
                        }
                      },
                      context: favorites.map((item, index) => ({
                        ...item,
                        track_number: index + 1
                      })),
                      origin: router
                    }
                  });
                }}
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
                {item?.album?.images?.[0]?.url && (
                  <AtomImage
                    src={item?.album?.images?.[0]?.url}
                    alt="xd"
                    width="50px"
                    height="50px"
                  />
                )}
                <AtomWrapper>
                  <AtomText as="p" color="white" width="auto">
                    {item?.name}
                  </AtomText>
                  {item?.artists?.length !== 0 && (
                    <AtomWrapper
                      flexDirection="row"
                      justifyContent="flex-start"
                    >
                      {item?.artists?.map((artist, index) => (
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
                            width="auto"
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
                link={`/public/album/${item.album?.id}`}
                textDecoration="underline"
                width="auto"
              >
                <AtomText color="white" textDecoration="underline" width="auto">
                  {item?.album?.name}
                </AtomText>
              </AtomLINK>

              <AtomWrapper
                gap="10px"
                customCSS={css`
                  width: auto;
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
                  onClick={() => {
                    setFavorites((prev) =>
                      prev.filter((favorites) => favorites.id !== item.id)
                    );

                    toast.error('Removed from your Favorites Songs');
                  }}
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
                    duration_ms: item?.duration_ms
                  })}
                </AtomText>
              </AtomWrapper>
            </AtomWrapper>
          );
        })}
      </AtomWrapper>
    </AtomWrapper>
  );
};
MyFavorites.Layout = 'public';
export async function getServerSideProps() {
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
