import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomPlayerIframe from '@Components/@atoms/AtomPlayerIframe';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import OrganismNavbar from '@Components/@organims/public/OrganismNavBar';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { FC, useEffect, useState } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import VIEWPUBLICEFFECTS from './VIEW';

const PublicLayout: FC = (props) => {
  const [first, setfirst] = useState(false);
  const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);

  useEffect(() => {
    setTimeout(() => {
      setfirst(true);
    }, 500);
  }, []);
  return (
    <>
      {first ? (
        <AtomWrapper
          customCSS={css`
            overflow: hidden;
            display: grid;
            grid-template-columns: 270px 1fr;
            grid-template-rows: 1fr auto;
            height: 100vh;
            @media (max-width: 980px) {
              grid-template-columns: 1fr;
            }
          `}
        >
          <OrganismNavbar />
          <VIEWPUBLICEFFECTS>{props?.children}</VIEWPUBLICEFFECTS>
          {controls?.currentTrack?.id ? <AtomPlayerIframe /> : null}
        </AtomWrapper>
      ) : (
        <AtomLoader
          type="fullscreen"
          colorLoading="white"
          isLoading
          backgroundColor="black"
        />
      )}
    </>
  );
};

export default PublicLayout;
