import AtomLoader from '@Components/@atoms/AtomLoader';
import AtomPlayerIframe from '@Components/@atoms/AtomPlayerIframe';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import OrganismNavbar from '@Components/@organims/public/OrganismNavBar';
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';

const PublicLayout: FC = (props) => {
  const [first, setfirst] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setfirst(true);
    }, 500);
  }, []);

  
  useEffect(() => {
    setTimeout(() => {
      setfirst(true);
    }, 500);
  }, []);

me saldre ahora y te fijas  let whil = 'j';
  como me salgo?
   jaja
  
  "ok okok<

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
          <AtomWrapper
            id="view"
            customCSS={css`
              width: auto;
              grid-column: 2;
              grid-row: 1 /2;
              position: relative;
              overflow: hidden;
              overflow-y: scroll;
              display: flex;
              flex-direction: column;
              overflow: auto;
              align-items: flex-start;
              ::-webkit-scrollbar {
                width: 10px;
              }

              ::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #b3b3b3;
                box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
              }
              @media (max-width: 980px) {
                margin: 2rem;
                grid-column: 1/ -1;
                overflow-x: hidden;
                margin-left: 0;
                margin: 0;
              }
            `}
          >
            <AtomWrapper
              customCSS={css`
                height: 100%;
                width: 100%;
                overflow-x: clip;
                z-index: 1;
                top: 0;
                @media (max-width: 980px) {
                  grid-column: 1 / -1;
                }
              `}
            >
              {props?.children}
            </AtomWrapper>
          </AtomWrapper>
          <AtomPlayerIframe />
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
