import { AtomText } from '@Components/@atoms/AtomText';
import AtomTrack from '@Components/@atoms/AtomTrack';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IImage, ISong } from '@Types/index';
import { useAtom } from 'jotai';
import { NextPageFCProps } from 'next';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const QueuePage: NextPageFCProps = () => {
  const [controls, dispatch] = useAtom(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  return (
    <AtomWrapper width="100%">
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
        <h1>QueuePage</h1>
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
            album={controls?.currentTrack as ISong}
          />
        </AtomWrapper>
        <AtomText color="white" fontSize="16px" fontWeight="bold">
          Next Up
        </AtomText>
        <AtomWrapper>
          {controls?.context
            ?.filter((item) => item?.id !== controls?.currentTrack?.id)
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
                album={item as ISong}
              />
            ))}
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
