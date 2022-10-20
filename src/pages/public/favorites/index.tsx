/* eslint-disable no-unused-vars */
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import useTimerDrag, { DragPagesAtom } from '@Hooks/useTimerDrag';
import { IImage, ISong } from '@Types/index';
import { AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { useAtom, useSetAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';
import MY_FAVORITES_REDUCER_ATOM from '_jotai/favoritesSongs/reducer';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const MyFavorites: NextPageFCProps = () => {
  const [favorites, setFavorites] = useAtom(MY_FAVORITES_REDUCER_ATOM);
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const router = useRouter();
  const setDrag = useSetAtom(DragPagesAtom);
  const dragControls = useDragControls();
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
        <Reorder.Group
          axis="y"
          values={favorites}
          onReorder={setFavorites}
          dragControls={dragControls}
        >
          <AnimatePresence>
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
                // dragListener={false}
                onDrag={() => {
                  setDrag(true);
                  setTimer(0);
                }}
              >
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
          </AnimatePresence>
        </Reorder.Group>
      </AtomWrapper>
    </AtomWrapper>
  );
};
MyFavorites.Layout = 'public';

export default MyFavorites;
