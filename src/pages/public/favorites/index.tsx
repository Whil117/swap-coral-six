/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import useTimerDrag, { DragPagesAtom } from '@Hooks/useTimerDrag';
import { IImage } from '@Types/index';
import { Reorder } from 'framer-motion';
import { atom, useAtom, useSetAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import { Item } from './ADF';

const initialItems = atom([
  '🍅 Tomato',
  '🥒 Cucumber',
  '🧀 Cheese',
  '🥬 Lettuce'
]);

const MyFavorites: NextPageFCProps = () => {
  const [favorites, setFavorites] = useAtom(MY_FAVORITES_REDUCER_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const router = useRouter();
  const setDrag = useSetAtom(DragPagesAtom);
  const { setTimer } = useTimerDrag({
    end: 1,
    callback: () => {
      setDrag(false);
      const newStateTracks = favorites.map((item, index) => ({
        ...item,
        track_number: index + 1
      }));
      dispatch({
        type: 'SET_TRACK',
        payload: {
          currentTrack: newStateTracks?.find(
            (item) => item.id === controls.currentTrack?.id
          ),
          context: newStateTracks,
          origin: router
        }
      });
    }
  });

  return (
    <AtomWrapper>
      <AtomBanner type="likedSongs" />
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
        <Reorder.Group axis="y" onReorder={setFavorites} values={favorites}>
          {favorites.map((item, index) => (
            <Item
              key={item?.id}
              trackNumberByPosition={index + 1}
              item={item}
              onDrag={() => {
                setDrag(true);
                setTimer(0);
              }}
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
              onFavorite={() => {
                setFavorites((prev) =>
                  prev.filter((favorites) => favorites.id !== item.id)
                );
              }}
            />
          ))}
        </Reorder.Group>
        {/* <Reorder.Group axis="y" values={favorites} onReorder={setFavorites}>
          {favorites?.map((item, index) => (
            <Reorder.Item
              key={item.track_number}
              value={item}
              style={{
                color: 'transparent'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              dragListener={false}
              dragControls={dragControls}
              onDrag={() => {
                setDrag(true);
                setTimer(0);
              }}
            >
              <AtomIcon
                width="20px"
                height="30px"
                color="#f33131"
                icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/IXU-0001/icons/sideBar/reorder-icon.svg"
                onPointerDown={(event) => {
                  dragControls.start(event);
                }}
                customCSS={css`
                  padding: 0 10px;
                  cursor: pointer;
                  align-self: center;
                `}
              />
              <AtomTrack
                type="dragable"
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
                onFavorite={() => {
                  setFavorites((prev) =>
                    prev.filter((favorites) => favorites.id !== item.id)
                  );
                }}
                album={{
                  ...(item as ISong),
                  track_number: index + 1
                }}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group> */}
      </AtomWrapper>
    </AtomWrapper>
  );
};
MyFavorites.Layout = 'public';

export default MyFavorites;
