import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomButton from '@Components/@atoms/AtomButton';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import {
  IAlbumType,
  IArtist,
  IlistPlaylistsBySlug,
  IQueryFilter
} from '@Types/index';
import Greetings from '@Utils/Grettings';
import isBackDark from '@Utils/isBlackOrWhite';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ISBOTTOM_ATOM } from 'layout/public/VIEW';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';

type ATOM = {
  [key: string]: IAlbumType[] | IArtist[] | IlistPlaylistsBySlug[];
};

const LISTBYTYPE_ATOM = atom<ATOM>({
  albums: [],
  artists: [],
  playlist: []
});

type MODESDATA = 'artists' | 'albums' | 'playlist';

const TYPEMODE = atom<MODESDATA>('artists');

const TYPEESE: MODESDATA[] = ['artists', 'albums', 'playlist'];

const Public: NextPageFCProps = () => {
  const [loading, setLoading] = useState(true);
  const [STATE, SETSTATE] = useAtom(LISTBYTYPE_ATOM);
  const [TYPE, SETTYPE] = useAtom(TYPEMODE);
  const setBottomView = useSetAtom(ISBOTTOM_ATOM);
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const colors = UseColor(controls?.currentTrack?.images?.[0]?.url as string);
  const router = useRouter();
  const { refetch } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    fetchPolicy: 'network-only',
    skip: !TYPE,
    variables: {
      type: [TYPE],
      limit: 24
    },
    onCompleted: (data) => {
      setBottomView({
        callback: () => {
          refetch();
          setLoading(true);
        }
      });
      const AAAA = data?.listByType?.[TYPE] as
        | IAlbumType[]
        | IArtist[]
        | IlistPlaylistsBySlug[];
      SETSTATE((prev) => ({
        [TYPE]: [...(prev?.[TYPE] ?? []), ...(AAAA ?? [])]
      }));
      setLoading(false);
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page="Feed"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'Feed']}
        description={`Swap Coral Six - Feed is avaible now!`}
      />
      <AtomWrapper
        customCSS={css`
          min-height: 320px;
          align-items: flex-start;
          padding: 0px 45px;
          justify-content: center;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${colors?.[0]?.hex ?? '#0072ff'};
          @media (max-width: 980px) {
            justify-content: center;
            /* width: 100%; */
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomText fontWeight="bold" fontSize="42px" color="white">
          {Greetings()}!
        </AtomText>
      </AtomWrapper>
      <AtomWrapper
        padding="0px 45px"
        maxWidth="1440px"
        flexDirection="column"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
        `}
      >
        <AtomWrapper flexDirection="row" gap="15px" margin="25px 0px">
          {TYPEESE?.map((item) => (
            <AtomButton
              onClick={() => {
                SETTYPE(item);
                refetch();
                setLoading(true);
              }}
              key={item}
              customCSS={css`
                border: 1.5px solid ${colors?.[0]?.hex ?? '#0072ff'};
                background-color: transparent;
                border-radius: 20px;
                color: ${colors?.[0]?.hex ?? '#0072ff'};
                ${item === TYPE &&
                css`
                  color: ${isBackDark(colors?.[0]?.hex)};
                  background-color: ${colors?.[0]?.hex ?? '#0072ff'};
                `}
              `}
            >
              {item}
            </AtomButton>
          ))}
        </AtomWrapper>

        {typeSearch?.map((item) => (
          <>
            {TYPE !== item ? null : (
              <>
                {STATE?.[item as keyof typeof STATE]?.length ? (
                  <>
                    <AtomText color="white" fontWeight="bold">
                      {item}
                    </AtomText>
                  </>
                ) : null}
                <AtomWrapper
                  width="100%"
                  flexDirection="row"
                  flexWrap="wrap"
                  customCSS={css`
                    display: flex;
                    gap: 10px;
                  `}
                >
                  {STATE?.[item as keyof typeof STATE]?.map((props) => (
                    <AtomCard
                      key={props?.id}
                      {...props}
                      image={props?.images?.[0]?.url as string}
                      onClick={() => {
                        router.push({
                          pathname: `/public/${props?.type}/[id]`,
                          query: {
                            id: props?.id
                          }
                        });
                      }}
                    />
                  ))}
                </AtomWrapper>
              </>
            )}
          </>
        ))}
        {loading && <AtomLoader type="small" isLoading colorLoading="white" />}
      </AtomWrapper>
    </AtomWrapper>
  );
};
const typeSearch = ['artists', 'albums', 'playlist'];

export async function getServerSideProps() {
  Public.SEO = {
    title: 'Feed',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Feed is avaible now!`,
    keywords: ['swapcoralsix', 'Feed']
  };

  return {
    props: {}
  };
}
Public.Layout = 'public';

export default Public;
