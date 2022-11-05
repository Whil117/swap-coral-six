import { useMutation, useQuery } from '@apollo/client';
import { UPDATELYRICBYTRACKID } from '@Apollo/client/mutation/lyrics';
import { LYRICBYTRACKID } from '@Apollo/client/query/lyricById';
import AtomButton from '@Components/@atoms/AtomButton';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomLyric from '@Components/@atoms/AtomLyric';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import { ILyric, IQueryFilter } from '@Types/index';
import isBackDark from '@Utils/isBlackOrWhite';
import { useAtom, useAtomValue } from 'jotai';
import { NextPageContext, NextPageFC } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { CONTROLS_PLAYER_ATOM } from '_jotai/player/reducer';
import REDUCER_LYRIC_ATOM from '../../../../_jotai/lyrics';

const EditLyric: NextPageFC<{ id: string }> = ({ id }) => {
  const controls = useAtomValue(CONTROLS_PLAYER_ATOM);
  const colorBackground = UseColor(
    controls?.currentTrack?.images?.[0].url as string
  );
  const [lyrics, setLyrics] = useAtom(REDUCER_LYRIC_ATOM);
  const router = useRouter();

  const [EXECUTECREATESYNCRONOUNSTRACK, { loading }] = useMutation(
    UPDATELYRICBYTRACKID,
    {
      onCompleted: () => {
        toast.success('Lyrics synced successfully'),
          router.push({
            pathname: '/swap/lyric/[id]',
            query: { id }
          });
      }
    }
  );
  const { data, loading: LoadLyric } = useQuery<IQueryFilter<'lyricByTrackId'>>(
    LYRICBYTRACKID,
    {
      skip: !id,
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          id: id
        }
      },
      onCompleted: (data) => {
        setLyrics({
          type: 'SETLYRIC',
          payload: {
            id: data?.lyricByTrackId?.id as string,
            name: data?.lyricByTrackId?.name as string,
            lyrics: data?.lyricByTrackId?.lyrics?.map((paragraph) => ({
              id: paragraph?.id as string,
              phrase: paragraph?.phrase as string,
              start: paragraph?.start as number,
              translates: paragraph?.translates,
              notifies: paragraph?.notifies,
              artists: paragraph?.artists?.map((artist) => ({
                id: artist?.id as string,
                name: artist?.name as string,
                image: artist?.image as string,
                color: artist?.color as string
              }))
            })) as ILyric[],
            editLyric: {},
            openSetting: false,
            duration: data?.lyricByTrackId?.duration as number
          }
        });
      }
    }
  );

  return (
    <>
      <AtomWrapper
        customCSS={css`
          display: grid;
          grid-template-columns: 1fr;
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
          backgroundColor={colorBackground?.[0]?.hex as string}
          customCSS={css`
            display: flex;
            flex-direction: ${loading || LoadLyric ? 'row' : 'column'};
            justify-content: center;
            align-items: ${loading || LoadLyric ? 'center' : 'flex-start'};
          `}
        >
          <AtomWrapper flexDirection="row" alignItems="center" gap="10px">
            {data?.lyricByTrackId?.artists?.map((item, index) => (
              <AtomText
                key={item?.id}
                fontWeight="bold"
                fontSize="30px"
                color={isBackDark(colorBackground?.[0]?.hex)}
              >
                {index === 0 ? item?.name : `, ${item?.name}`}
              </AtomText>
            ))}
            <AtomText
              fontWeight="bold"
              fontSize="30px"
              color={isBackDark(colorBackground?.[0]?.hex)}
            >
              -
            </AtomText>
            <AtomText
              fontWeight="bold"
              fontSize="30px"
              color={isBackDark(colorBackground?.[0]?.hex)}
            >
              {data?.lyricByTrackId?.name}
            </AtomText>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              margin-top: 20px;
              font-family: 'Open Sans', sans-serif;
              font-size: 2rem;
              width: 100%;
              color: ${isBackDark(colorBackground?.[0]?.hex as string)};
            `}
          >
            {lyrics?.lyrics?.map((paragraph) => (
              <AtomLyric
                key={paragraph?.id}
                type="edit"
                phrase={paragraph?.phrase as string}
                id={paragraph?.id as string}
                start={paragraph?.start as number}
                artists={paragraph?.artists}
                notifies={paragraph?.notifies}
                translates={paragraph?.translates}
              />
            ))}
          </AtomWrapper>
          {loading || LoadLyric ? (
            <AtomLoader type="small" colorLoading="white" />
          ) : (
            <AtomButton
              padding="10px"
              backgroundColor="#0072ff"
              margin="25px 0px"
              onClick={() => {
                EXECUTECREATESYNCRONOUNSTRACK({
                  variables: {
                    input: {
                      id: id,
                      lyrics: lyrics?.lyrics,
                      duration: lyrics?.duration,
                      name: lyrics?.name
                    }
                  }
                });
              }}
            >
              Save Synchronously
            </AtomButton>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};
EditLyric.Layout = 'public';
export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  return {
    props: {
      id
    }
  };
}

export default EditLyric;
