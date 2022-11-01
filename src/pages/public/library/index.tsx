import AtomBanner from '@Components/@atoms/AtomBanner';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { IAlbumType, IlistPlaylistsBySlug } from '@Types/index';
import { atomWithStorage, useAtomValue } from 'jotai/utils';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';

export const LISTFAVORITES_PLAYLISTS_ATOM = atomWithStorage(
  'SWAPLISTFAVOPLAYLIST',
  [] as IlistPlaylistsBySlug[]
);

export const LISTFAVORITES_ALBUMS_ATOM = atomWithStorage(
  'SWAPLISTFAVOALBUMS',
  [] as IAlbumType[]
);

const PageLibrary: NextPageFCProps = () => {
  const albums = useAtomValue(LISTFAVORITES_ALBUMS_ATOM);
  const playlists = useAtomValue(LISTFAVORITES_PLAYLISTS_ATOM);
  const router = useRouter();
  return (
    <AtomWrapper>
      <AtomSEO
        title="Swap Coral Six"
        page="My Library"
        image="https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png"
        keywords={['swapcoralsix', 'My Library']}
        description={`Swap Coral Six - My Library is avaible now!`}
      />
      <AtomBanner type="library" />
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
        {albums?.length ? (
          <>
            <AtomText color="white" fontWeight="bold">
              Albums
            </AtomText>
            <AtomWrapper
              width="100%"
              flexDirection="row"
              flexWrap="wrap"
              customCSS={css`
                display: flex;
                gap: 10px;
              `}
            >
              {albums?.map((props) => (
                <AtomCard
                  key={props?.id}
                  {...props}
                  image={props?.images?.[0]?.url as string}
                  type="album"
                  onClick={() => {
                    router.push({
                      pathname: `/public/album/[id]`,
                      query: {
                        id: props?.id
                      }
                    });
                  }}
                />
              ))}
            </AtomWrapper>
          </>
        ) : null}
        {playlists?.length ? (
          <>
            <AtomText color="white" fontWeight="bold">
              Playlists
            </AtomText>
            <AtomWrapper
              width="100%"
              flexDirection="row"
              flexWrap="wrap"
              customCSS={css`
                display: flex;
                gap: 10px;
              `}
            >
              {playlists?.map((props) => (
                <AtomCard
                  key={props?.id}
                  {...props}
                  image={props?.images?.[0]?.url as string}
                  type="album"
                  onClick={() => {
                    router.push({
                      pathname: `/public/playlist/[id]`,
                      query: {
                        id: props?.id
                      }
                    });
                  }}
                />
              ))}
            </AtomWrapper>
          </>
        ) : null}
      </AtomWrapper>
    </AtomWrapper>
  );
};

export async function getServerSideProps() {
  PageLibrary.SEO = {
    title: 'Library',
    image:
      'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
    description: `Swap Coral Six - Library is avaible now!`,
    keywords: ['swapcoralsix', 'Library']
  };

  return {
    props: {}
  };
}
PageLibrary.Layout = 'public';

export default PageLibrary;
