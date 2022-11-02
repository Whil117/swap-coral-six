import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { atom, useAtomValue } from 'jotai';
import { FC, ReactNode, useRef } from 'react';

type Props = {
  children?: ReactNode;
};

export const ISBOTTOM_ATOM = atom({
  callback: () => {}
});

const VIEWPUBLICEFFECTS: FC<Props> = (props) => {
  const scrollRef = useRef<HTMLDivElement>();
  const bottomView = useAtomValue(ISBOTTOM_ATOM);
  return (
    <AtomWrapper
      id="view"
      ref={scrollRef as any}
      onScroll={async () => {
        if (scrollRef.current) {
          if (
            scrollRef?.current?.scrollTop + scrollRef?.current?.clientHeight >=
            scrollRef?.current?.scrollHeight - 1
          ) {
            bottomView.callback();
          }
        }
      }}
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
        {props.children}
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default VIEWPUBLICEFFECTS;
