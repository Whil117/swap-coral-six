import { useQuery } from '@apollo/client';
import { LISTBYTYPE } from '@Apollo/client/query/listByType';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import {
  IAlbumType,
  IArtist,
  IlistPlaylistsBySlug,
  IQueryFilter
} from '@Types/index';
import { atom, useAtom, useSetAtom } from 'jotai';
import { ISBOTTOM_ATOM } from 'layout/public/VIEW';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

type Props = {
  type: 'artists' | 'albums' | 'playlist';
};
type ATOM = {
  [key: string]: IAlbumType[] | IArtist[] | IlistPlaylistsBySlug[];
};

const LISTBYTYPE_ATOM = atom<ATOM>({
  albums: [],
  artists: [],
  playlist: []
});

const OrganismListByType: FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const setBottomView = useSetAtom(ISBOTTOM_ATOM);
  const [listByType, setListByType] = useAtom(LISTBYTYPE_ATOM);
  const router = useRouter();
  const { refetch } = useQuery<IQueryFilter<'listByType'>>(LISTBYTYPE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      type: [props.type],
      limit: 50
    },
    onCompleted: (data) => {
      setBottomView({
        callback: () => {
          refetch();
          setLoading(true);
        }
      });
      const TypeData = data?.listByType?.[props.type] as
        | IAlbumType[]
        | IArtist[]
        | IlistPlaylistsBySlug[];
      setListByType((prev) => ({
        [props.type]: [...(prev?.[props.type] ?? []), ...(TypeData ?? [])]
      }));
      setLoading(false);
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page="Artists"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'Artists']}
        description={`Swap Coral Six - Artists is avaible now!`}
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
        {[props.type]?.map((item) => (
          <>
            {!loading && (
              <AtomText color="white" fontWeight="bold">
                {item}
              </AtomText>
            )}
            <AtomWrapper
              width="100%"
              flexDirection="row"
              flexWrap="wrap"
              customCSS={css`
                display: flex;
                gap: 10px;
              `}
            >
              {listByType?.[item as keyof typeof listByType]?.map((props) => (
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
        ))}
        <AtomWrapper alignItems="center" justifyContent="center">
          {loading && (
            <AtomLoader type="small" isLoading colorLoading="white" />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default OrganismListByType;
