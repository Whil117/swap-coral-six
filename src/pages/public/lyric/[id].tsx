/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import client from '@Apollo/client/notWSS';
import { LYRICBYTRACKID } from '@Apollo/client/query/lyricById';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomLyric from '@Components/@atoms/AtomLyric';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import { timerAtom } from '@Hooks/useTimerTrack';
import { IQueryFilter } from '@Types/index';
import isBackDark from '@Utils/isBlackOrWhite';
import { useAtomValue } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

const LyricByID: NextPageFC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const color = UseColor(controls?.currentTrack?.images?.[0]?.url as string);
  const { data, loading } = useQuery<IQueryFilter<'lyricByTrackId'>>(
    LYRICBYTRACKID,
    {
      skip: !id,
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          id: id
        }
      }
    }
  );
  const currentTime = useAtomValue(timerAtom);

  useEffect(() => {
    if (router?.asPath?.includes('/lyric')) {
      router
        ?.push({
          pathname: '/public/lyric/[id]',
          query: {
            id: controls?.currentTrack?.id
          }
        })
        .then(() => {
          document?.getElementById('view')?.scroll({
            top: 0,
            behavior: 'smooth'
          });
        });
    }
  }, [controls]);
  useMemo(() => {
    const sectionId = document.getElementById(`${currentTime}`);
    if (sectionId) {
      const position = sectionId.getBoundingClientRect();
      sectionId?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      if (position.top >= 0 && position.bottom <= window.innerHeight) {
        console.log(
          'Element is fully visible in screen',
          position.top >= 0 && position.bottom <= window.innerHeight
        );
      }

      // checking for partial visibility
      if (position.top < window.innerHeight && position.bottom >= 0) {
        console.log(
          'Element is partially visible in screen0',
          position.top < window.innerHeight && position.bottom >= 0
        );
      }
    }
  }, [currentTime]);

  return (
    <AtomWrapper
      backgroundColor={color?.[0]?.hex as string}
      width="100%"
      height={loading ? '100%' : 'auto'}
      customCSS={css`
        ${typeof data === 'undefined' &&
        css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        `}
      `}
    >
      <AtomSEO
        title="Swap Coral Six"
        page={`${data?.lyricByTrackId?.name} - ${data?.lyricByTrackId?.artists
          ?.map((item) => item?.name)
          .join(' ,')}`}
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'Lyrics']}
        description={`Swap Coral Six - Lyrics is avaible now!`}
      />
      <AtomWrapper
        padding="45px"
        height={loading ? '100%' : 'auto'}
        customCSS={css`
          scroll-behavior: smooth; /* <--- */
          scroll-margin-top: 1000px;
          display: flex;
          flex-direction: ${loading ? 'row' : 'column'};
          justify-content: center;
          align-items: ${loading ? 'center' : 'flex-start'};
          ${typeof data === 'undefined' &&
          css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          `}
        `}
      >
        {loading ? (
          <AtomLoader type="small" colorLoading="white" isLoading />
        ) : (
          <>
            {typeof data === 'undefined' && (
              <AtomText
                color={isBackDark(color?.[0]?.hex)}
                fontSize="25px"
                fontWeight="bold"
              >
                This track doesnt have a lyric, Sorry!
              </AtomText>
            )}
            <AtomWrapper flexDirection="row" alignItems="center" gap="10px">
              {data?.lyricByTrackId?.artists?.map((item, index) => (
                <AtomText
                  key={item?.id}
                  fontWeight="bold"
                  fontSize="30px"
                  color={isBackDark(color?.[0]?.hex)}
                >
                  {index === 0 ? item?.name : `, ${item?.name}`}
                </AtomText>
              ))}
              <AtomText
                fontWeight="bold"
                fontSize="30px"
                color={isBackDark(color?.[0]?.hex)}
              >
                -
              </AtomText>
              <AtomText
                fontWeight="bold"
                fontSize="30px"
                color={isBackDark(color?.[0]?.hex)}
              >
                {data?.lyricByTrackId?.name}
              </AtomText>
            </AtomWrapper>

            {data?.lyricByTrackId?.lyrics?.map((paragraph) => (
              <>
                {paragraph?.start ? (
                  <AtomLyric
                    key={paragraph?.id}
                    type="read"
                    phrase={paragraph?.phrase as string}
                    id={paragraph?.id as string}
                    start={paragraph?.start as number}
                    artists={paragraph?.artists}
                    notifies={paragraph?.notifies}
                    translates={paragraph?.translates}
                  />
                ) : (
                  <AtomLyric
                    key={paragraph?.id}
                    type="view"
                    phrase={paragraph?.phrase as string}
                    id={paragraph?.id as string}
                    start={paragraph?.start as number}
                    artists={paragraph?.artists}
                    notifies={paragraph?.notifies}
                    translates={paragraph?.translates}
                  />
                )}
              </>
            ))}

            <AtomText
              fontSize="16px"
              fontWeight="bold"
              color={isBackDark(color?.[0]?.hex)}
              customCSS={css`
                ${typeof data === 'undefined' &&
                css`
                  text-align: center;
                `}
              `}
            >
              WhiL!
            </AtomText>
          </>
        )}
      </AtomWrapper>
    </AtomWrapper>
  );
};

LyricByID.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  const lyric = await client
    .query<IQueryFilter<'lyricByTrackId'>>({
      query: LYRICBYTRACKID,
      variables: {
        filter: {
          id: id
        }
      }
    })
    ?.then((res) => res.data?.lyricByTrackId)
    .catch((res) => console.log(res));

  LyricByID.SEO = {
    title: `${lyric?.name} - ${lyric?.artists
      ?.map((item) => item?.name)
      .join(' ,')}`,
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Lyrics is avaible now!`,
    keywords: ['swapcoralsix', 'Feed']
  };

  return {
    props: {
      id
    }
  };
}

export default LyricByID;
