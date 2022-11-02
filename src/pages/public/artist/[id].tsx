import { useQuery } from '@apollo/client';
import client from '@Apollo/client/notWSS';
import { ARTISTBYID } from '@Apollo/client/query/artistById';
import { LISTALBUMSBYARTISTID } from '@Apollo/client/query/listAlbums';
import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomSEO from '@Components/@atoms/AtomSeo';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IAlbumType, IQueryFilter } from '@Types/index';
import { useSetAtom } from 'jotai';
import { ISBOTTOM_ATOM } from 'layout/public/VIEW';
import { NextPageContext, NextPageFC } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const paginationInitial = {
  total: 0,
  offset: 0,
  page: 0,
  limit: 50
};

const PublicArtist: NextPageFC<{ id: string }> = (props) => {
  const [pagination, setPagination] = useState(paginationInitial);
  const [ALBUMS, SETALBUMARTIST] = useState([] as IAlbumType[]);
  const router = useRouter();
  const setBottomView = useSetAtom(ISBOTTOM_ATOM);
  const { data, loading } = useQuery<IQueryFilter<'artistById'>>(ARTISTBYID, {
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      id: props?.id
    }
  });
  const { loading: LoadingAlbums, refetch } = useQuery<
    IQueryFilter<'listAlbums'>
  >(LISTALBUMSBYARTISTID, {
    skip: !props.id,
    fetchPolicy: 'no-cache',
    variables: {
      filter: {
        offset: pagination.offset,
        limit: pagination?.limit,
        page: pagination.page,
        artist: {
          id: props?.id
        }
      }
    },
    onCompleted: (data) => {
      setBottomView({
        callback: () => {
          if (data?.listAlbums?.hasNextPage) {
            refetch();
            setPagination((prev) => ({
              ...prev,
              page: (data?.listAlbums?.page as number) + 1,
              offset: (((data?.listAlbums?.page as number) + 1) as number) * 50
            }));
          }
        }
      });
      setPagination({
        total: data?.listAlbums?.total as number,
        limit: data?.listAlbums?.limit as number,
        offset: data?.listAlbums?.offset as number,
        page: pagination.page
      });
      SETALBUMARTIST((prev) => [
        ...prev,
        ...((data?.listAlbums?.items as IAlbumType[]) ?? [])
      ]);
    }
  });

  return (
    <AtomWrapper width="100%">
      <AtomSEO
        title="Swap Coral Six"
        page={data?.artistById?.name}
        image={data?.artistById?.images?.[0]?.url}
        keywords={[data?.artistById?.name as string]}
        description={data?.artistById?.name}
      />
      {loading ? (
        <AtomWrapper alignItems="center" justifyContent="center">
          <AtomLoader type="small" isLoading colorLoading="white" />
        </AtomWrapper>
      ) : (
        <AtomBanner type="artist" artist={data?.artistById} />
      )}

      <AtomWrapper
        padding="45px 90px"
        maxWidth="1440px"
        flexDirection="column"
        flexWrap="wrap"
        customCSS={css`
          display: flex;
          gap: 10px;
          @media (max-width: 980px) {
            padding: 0px 30px;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          flexWrap="wrap"
          gap="10px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
            }
          `}
        >
          {ALBUMS?.map((item) => (
            <AtomCard
              key={item?.id}
              {...item}
              image={item?.images?.[0]?.url as string}
              type={item?.album_type}
              onClick={() => {
                router.push({
                  pathname: '/public/album/[id]',
                  query: {
                    id: item?.id
                  }
                });
              }}
            />
          ))}
        </AtomWrapper>
        <AtomWrapper alignItems="center" justifyContent="center">
          {LoadingAlbums && (
            <AtomLoader type="small" isLoading colorLoading="white" />
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

PublicArtist.Layout = 'public';

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const artist = await client
    .query<IQueryFilter<'artistById'>>({
      query: ARTISTBYID,
      variables: {
        id: id
      }
    })
    ?.then((res) => res.data?.artistById);
  PublicArtist.SEO = {
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

export default PublicArtist;
