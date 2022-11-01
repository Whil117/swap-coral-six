import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import { IAlbumType, IlistPlaylistsBySlug, ISong } from '@Types/index';
import clipBoard from '@Utils/clipBoard';
import useIframe from '@Utils/useRefIframe';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import {
  LISTFAVORITES_ALBUMS_ATOM,
  LISTFAVORITES_PLAYLISTS_ATOM
} from 'pages/public/library';
import { FC } from 'react';
import { toast } from 'react-toastify';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import { PLAY_IFRAME_ATOM } from '../AtomPlayerIframe';
import AtomWrapper from '../Atomwrapper';

type Props = {
  context: IAlbumType | IlistPlaylistsBySlug;
  type: 'playlist' | 'album';
  onDispatch: () => void;
};

export function getRandomTrack(list: ISong[]) {
  return list[Math.floor(Math.random() * list.length)];
}

const AtomPlayByAlbumPlaylist: FC<Props> = (props) => {
  const router = useRouter();
  const colors = useAtomValue(COLORS_ATOM);
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
  const [playIFRAME, setPlayIFRAME] = useAtom(PLAY_IFRAME_ATOM);
  const isValidContext = controls?.origin?.query?.id === router.query?.id;
  const spotifyEmbedWindow = useIframe();
  const [favoritesPlaylists, setFavoritePlaylist] = useAtom(
    LISTFAVORITES_PLAYLISTS_ATOM
  );
  const [favoritesAlbums, setFavoritesALbums] = useAtom(
    LISTFAVORITES_ALBUMS_ATOM
  );

  const ACCDATA = [...favoritesPlaylists, ...favoritesAlbums];
  const findFavorite = ACCDATA?.some((data) => data?.id === props?.context?.id);

  const pathPlaylist = router.asPath?.includes('playlist');
  const pathAlbum = router.asPath?.includes('album');

  return (
    <AtomWrapper
      padding="45px 90px"
      maxWidth="1440px"
      flexDirection="row"
      alignItems="center"
      flexWrap="wrap"
      customCSS={css`
        gap: 25px;
        @media (max-width: 980px) {
          padding: 0px 30px;
        }
      `}
    >
      <AtomButton
        padding="10px"
        borderRadius="50%"
        backgroundColor={colors?.[0]?.hex}
        width="60px"
        height="60px"
        onClick={() => {
          if (isValidContext) {
            setPlayIFRAME((prev) => !prev);
            spotifyEmbedWindow.postMessage({ command: 'toggle' }, '*');
          } else {
            setPlayIFRAME(true);
            props?.onDispatch();
          }
        }}
      >
        <AtomIcon
          icon={
            isValidContext && playIFRAME
              ? 'https://res.cloudinary.com/whil/image/upload/v1663126781/pause2_bsfjh5.svg'
              : 'https://res.cloudinary.com/whil/image/upload/v1663125500/play_azdkls.svg'
          }
          width="30px"
          height="30px"
          customCSS={css`
            svg {
              path {
                fill: none !important;
                stroke: #ffffff;
              }
            }
          `}
        />
      </AtomButton>
      <AtomButton
        padding="0px"
        backgroundColor="transparent"
        onClick={() => {
          if (pathPlaylist) {
            if (findFavorite) {
              setFavoritePlaylist((prev) =>
                prev?.filter((item) => item.id !== props?.context?.id)
              );
              toast.error('Removed from your Favorites Playlists');
            } else {
              toast.success('Added to your Favorites Playlists');
              setFavoritePlaylist((prev) => [
                ...prev,
                props.context as IlistPlaylistsBySlug
              ]);
            }
          }
          if (pathAlbum) {
            if (findFavorite) {
              setFavoritesALbums((prev) =>
                prev?.filter((item) => item.id !== props?.context?.id)
              );
              toast.error('Removed from your Favorites Albums');
            } else {
              toast.success('Added to your Favorites Albums');
              setFavoritesALbums((prev) => [
                ...prev,
                props.context as IAlbumType
              ]);
            }
          }
        }}
      >
        <AtomIcon
          customCSS={css`
            border-radius: 10px;
          `}
          color={findFavorite ? colors?.[0]?.hex : '#fdfdfd'}
          icon="https://res.cloudinary.com/whil/image/upload/v1665959363/love_vwgqq4.svg"
        />
      </AtomButton>
      <AtomButton
        backgroundColor="transparent"
        padding="0px"
        onClick={() => {
          const host = location.host;
          const url = router.asPath;
          clipBoard(`https://${host}${url}`);
        }}
      >
        <AtomIcon
          width="30px"
          height="30px"
          icon="https://res.cloudinary.com/whil/image/upload/v1663216371/link-2_quh3bv.svg"
          customCSS={css`
            svg {
              path {
                fill: none !important;
                stroke: #ffffff;
              }
            }
          `}
        />
      </AtomButton>
    </AtomWrapper>
  );
};

export default AtomPlayByAlbumPlaylist;
