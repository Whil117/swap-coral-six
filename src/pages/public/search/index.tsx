/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import { SEARCHQUERY } from '@Apollo/client/query/Search';
import AtomCard from '@Components/@atoms/AtomCard';
import AtomInput from '@Components/@atoms/AtomInput';
import AtomLoader from '@Components/@atoms/AtomLoader';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { COLORS_ATOM } from '@Hooks/useColor';
import useTimer, { loadTimerAtom } from '@Hooks/useTimer';
import useTimerHook from '@Hooks/useTimerHook';
import { IQueryFilter } from '@Types/index';
import { atom, useAtom, useAtomValue } from 'jotai';
import { NextPageFCProps } from 'next';
import { useRouter } from 'next/router';

const searchAtom = atom('');
const limitAtom = atom(10);
const wordAtom = atom('');

const SearchPage: NextPageFCProps = () => {
  const colors = useAtomValue(COLORS_ATOM);
  const [search, setSearch] = useAtom(searchAtom);
  const loadWriting = useAtomValue(loadTimerAtom);
  const [limit, setLimit] = useAtom(limitAtom);
  const [word, setword] = useAtom(wordAtom);
  const router = useRouter();
  const { setTimer } = useTimer({
    callback: () => {
      setSearch(word);
    }
  });

  const { setTimer: SETTER } = useTimerHook({
    callback: () => {
      console.log('TEST');
    }
  });
  const { data, loading } = useQuery<IQueryFilter<'Search'>>(SEARCHQUERY, {
    skip: !search,
    variables: {
      filter: {
        slug: search,
        limit: limit
      }
    }
  });

  return (
    <AtomWrapper width="100%" height="100%">
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
        <AtomWrapper>
          <h1>SearchPage</h1>
          <AtomWrapper
            flexDirection="row"
            gap="20px"
            customCSS={css`
              display: grid;
              grid-template-columns: 1fr auto;
            `}
          >
            <AtomWrapper
              gap="20px"
              customCSS={css`
                display: grid;
                grid-template-columns: 1fr auto;
              `}
            >
              <AtomInput
                type="text"
                id="search"
                placeholder="Search your favorite Artist, Album, Playlist..."
                customCSS={css`
                  width: 100%;
                `}
                value={word}
                onChange={(e) => {
                  setTimer(0);
                  SETTER(0);
                  setword(e.target.value);
                }}
              />
              {!loadWriting && (
                <AtomWrapper
                  customCSS={css`
                    border: 4px solid #f3f3f3;
                    border-radius: 50%;
                    border-top: 4px solid ${colors?.[0]?.hex};
                    width: 30px;
                    height: 30px;
                    -webkit-animation: spin 2s linear infinite; /* Safari */
                    animation: spin 2s linear infinite;

                    /* Safari */
                    @-webkit-keyframes spin {
                      0% {
                        -webkit-transform: rotate(0deg);
                      }
                      100% {
                        -webkit-transform: rotate(360deg);
                      }
                    }

                    @keyframes spin {
                      0% {
                        transform: rotate(0deg);
                      }
                      100% {
                        transform: rotate(360deg);
                      }
                    }
                  `}
                />
              )}
            </AtomWrapper>
            <select
              onChange={(e) => setLimit(Number(e.target.value))}
              value={limit}
              style={{ width: 'auto' }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          maxWidth="1440px"
          flexDirection="row"
          flexWrap="wrap"
          customCSS={css`
            display: flex;
            gap: 10px;
          `}
        >
          {loading ? (
            <AtomLoader type="small" isLoading colorLoading="white" />
          ) : (
            <>
              {typeSearch?.map((item) => (
                <>
                  {data?.Search?.[item as keyof typeof data.Search]?.length && (
                    <>
                      <AtomText color="white" fontWeight="bold">
                        {item}
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
                        {data?.Search?.[item as keyof typeof data.Search]?.map(
                          (props) => (
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
                          )
                        )}
                      </AtomWrapper>
                    </>
                  )}
                </>
              ))}
            </>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

const typeSearch = ['artists', 'albums', 'playlists'];

SearchPage.SEO = {
  title: 'Search',
  image:
    'https://res.cloudinary.com/whil/image/upload/v1662829817/swapcoralsix_s4th49.png',
  description: `Swap Coral Six - Search is avaible now!`,
  keywords: ['swapcoralsix', 'Feed']
};
SearchPage.Layout = 'public';
export default SearchPage;
