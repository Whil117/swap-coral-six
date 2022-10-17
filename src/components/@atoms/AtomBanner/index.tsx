/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@apollo/client';
import { ARTISTBYPLAYLISTANDALBUM } from '@Apollo/client/query/artistById';
import { css } from '@emotion/react';
import UseColor from '@Hooks/useColor';
import useTime from '@Hooks/useTime';
import {
  IAlbumType,
  IArtist,
  IlistPlaylistsBySlug,
  IQueryFilter,
  ISong
} from '@Types/index';
import convertDateWithOptions from '@Utils/convertDateWithOptions';
import convertWithCommas from '@Utils/numberWithCommas';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { FC } from 'react';
import CONTROLS_PLAYER_WITH_REDUCER_ATOM from '_jotai/player/reducer';
import AtomButton from '../AtomButton';
import AtomIcon from '../AtomIcon';
import AtomImage from '../AtomImage';
import { AtomText } from '../AtomText';
import AtomWrapper from '../Atomwrapper';

const sizeFontByTitle = (title: string) => {
  const lengthTitle = title?.length;
  if (lengthTitle >= 60) {
    return css`
      font-size: 30px;
      width: 100%;
      overflow: hidden;
      text-overflow: Ellipsis;
      word-wrap: break-word;
      @media (max-width: 980px) {
        text-align: center;
      }
    `;
  }

  if (lengthTitle >= 50) {
    return css`
      font-size: 32px;
      width: 100%;
      overflow: hidden;
      text-overflow: Ellipsis;
      word-wrap: break-word;
      @media (max-width: 980px) {
        text-align: center;
      }
    `;
  }
  if (lengthTitle <= 50) {
    return css`
      font-size: 32px;
      width: 100%;
      overflow: hidden;
      text-overflow: Ellipsis;
      word-wrap: break-word;
      @media (max-width: 980px) {
        text-align: center;
      }
    `;
  }
};

const typeBanners = {
  artist: (props: AtomProps) => {
    const color = UseColor(props.artist?.images?.[0]?.url as string);
    return (
      <AtomWrapper
        id="background-dynamic-color"
        justifyContent="center"
        customCSS={css`
          min-height: 500px;
          align-items: flex-start;
          display: flex;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex};
          @media (max-width: 980px) {
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          maxWidth="1440px"
          gap="20px"
          padding="0px 90px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props?.artist?.images?.[0]?.url as string}
            width="260px"
            height="260px"
            alt={props?.artist?.name as string}
            borderRadius="50%"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 100%;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
                display: flex;
                align-items: center;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              color="white"
              fontSize="16px"
              customCSS={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              color="white"
              id="headerBarScrollTitle"
              fontWeight="bold"
              fontSize="26px"
              customCSS={css`
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
              `}
            >
              {props?.artist?.name}
            </AtomText>
            {props?.artist?.followers && (
              <AtomText as="p" color="white" opacity="0.5" fontSize="18px">
                {convertWithCommas(props?.artist?.followers?.total as number)}
              </AtomText>
            )}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  album: (props: AtomProps) => {
    const router = useRouter();
    const color = UseColor(props?.album?.images?.[0]?.url as string);

    const { data: ArtistById, loading } = useQuery<IQueryFilter<'artistById'>>(
      ARTISTBYPLAYLISTANDALBUM,
      {
        skip: !props?.album?.artists?.[0]?.id,
        fetchPolicy: 'no-cache',
        variables: {
          id: props?.album?.artists?.[0]?.id
        }
      }
    );
    return (
      <AtomWrapper
        id="background-dynamic-color"
        justifyContent="center"
        alignItems="flex-start"
        customCSS={css`
          min-height: 500px;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex};
          @media (max-width: 980px) {
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          maxWidth="1440px"
          gap="20px"
          padding="0px 90px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props?.album?.images?.[0]?.url as string}
            width="260px"
            height="260px"
            alt={props?.album?.name as string}
            borderRadius="10px"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 100%;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              color="white"
              fontSize="16px"
              customCSS={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.album?.album_type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              color="white"
              id="headerBarScrollTitle"
              fontWeight="bold"
              fontSize="26px"
              customCSS={css`
                cursor: text;
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
                ${sizeFontByTitle(props?.album?.name as string)}
              `}
            >
              {props?.album?.name}
            </AtomText>
            <AtomWrapper
              flexDirection="row"
              gap="5px"
              customCSS={css`
                align-items: center;
                @media (max-width: 980px) {
                  justify-content: center;
                  align-items: center;
                }
              `}
            >
              <AtomWrapper flexDirection="row">
                {loading ? (
                  <AtomWrapper
                    customCSS={css`
                      border: 4px solid #f3f3f3;
                      border-radius: 50%;
                      border-top: 4px solid ${color?.[0]?.hex};
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
                ) : (
                  <AtomButton
                    backgroundColor="transparent"
                    padding="0px"
                    fontSize="16px"
                    fontWeight="bold"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    customCSS={css`
                      gap: 5px;
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                    onClick={() => {
                      router.push({
                        pathname: '/public/artist/[id]',
                        query: {
                          id: ArtistById?.artistById?.id
                        }
                      });
                    }}
                  >
                    <AtomImage
                      src={ArtistById?.artistById?.images?.[0]?.url as string}
                      alt={ArtistById?.artistById?.name as string}
                      width="35px"
                      borderRadius="50%"
                      height="35px"
                    />
                    {ArtistById?.artistById?.name}
                  </AtomButton>
                )}

                {/* {props?.album?.artists?.map((item, index) => (
                  <AtomButton
                    key={item?.id}
                    backgroundColor="transparent"
                    padding="0px"
                    fontSize="16px"
                    fontWeight="bold"
                    customCSS={css`
                      &:hover {
                        text-decoration: underline;
                      }
                    `}
                    onClick={() => {
                      router.push({
                        pathname: '/public/artist/[id]',
                        query: {
                          id: item?.id
                        }
                      });
                    }}
                  >
                    {index === 0 ? item?.name : `, ${item?.name}`}
                  </AtomButton>
                ))}{' '} */}
              </AtomWrapper>
              <AtomText color="white" fontSize="16px">
                -{' '}
                {convertDateWithOptions(
                  props?.album?.release_date as string,
                  'en-US',
                  {
                    year: 'numeric'
                  }
                )}{' '}
                • {props?.album?.total_tracks || 0} Tracks -{' '}
                {useTime({
                  tracks: props?.album?.tracks?.items as ISong[]
                })}
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  playlist: (props: AtomProps) => {
    const router = useRouter();
    const color = UseColor(props?.playlist?.images?.[0]?.url as string);
    return (
      <AtomWrapper
        id="background-dynamic-color"
        justifyContent="center"
        alignItems="flex-start"
        customCSS={css`
          min-height: 500px;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex};
          @media (max-width: 980px) {
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          maxWidth="1440px"
          gap="20px"
          padding="0px 90px"
          customCSS={css`
            @media (max-width: 980px) {
              padding: 0px 30px;
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomImage
            src={props?.playlist?.images?.[0]?.url as string}
            width="260px"
            height="260px"
            alt={props?.playlist?.name as string}
            borderRadius="10px"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 100%;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}
          >
            <AtomText
              as="p"
              fontWeight="bold"
              color="white"
              fontSize="16px"
              customCSS={css`
                @media (max-width: 778px) {
                  text-align: center;
                }
              `}
            >
              {props?.playlist?.type?.toUpperCase()}
            </AtomText>
            <AtomText
              as="h1"
              color="white"
              id="headerBarScrollTitle"
              fontWeight="bold"
              fontSize="26px"
              customCSS={css`
                cursor: text;
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
                ${sizeFontByTitle(props?.playlist?.name as string)}
              `}
            >
              {props?.playlist?.name}
            </AtomText>
            <AtomWrapper
              flexDirection="row"
              gap="5px"
              customCSS={css`
                @media (max-width: 980px) {
                  justify-content: center;
                  align-items: center;
                }
              `}
            >
              <AtomWrapper flexDirection="row">
                <AtomButton
                  key={props?.playlist?.owner?.id}
                  backgroundColor="transparent"
                  padding="0px"
                  fontSize="16px"
                  fontWeight="bold"
                  customCSS={css`
                    &:hover {
                      text-decoration: underline;
                    }
                  `}
                  onClick={() => {
                    router.push({
                      pathname: '/public/artist/[id]',
                      query: {
                        id: props?.playlist?.owner?.id
                      }
                    });
                  }}
                >
                  {props?.playlist?.owner?.display_name}
                </AtomButton>
              </AtomWrapper>
              <AtomText color="white" fontSize="16px">
                • {props?.playlist?.tracks?.total || 0} Tracks -{' '}
                {useTime({
                  tracks: props?.playlist?.tracks?.items as ISong[]
                })}
              </AtomText>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  },
  likedSongs: () => {
    const controls = useAtomValue(CONTROLS_PLAYER_WITH_REDUCER_ATOM);
    const color = UseColor(controls?.currentTrack?.images?.[0]?.url as string);

    return (
      <AtomWrapper
        id="background-dynamic-color"
        customCSS={css`
          min-height: 500px;
          align-items: flex-start;
          padding: 0px 90px;
          justify-content: center;
          transition: all 0.3s ease;
          background: linear-gradient(
              180deg,
              rgba(100, 100, 100, 0) 0%,
              #121216 100%
            ),
            ${color?.[0]?.hex ?? '#0072ff'};
          @media (max-width: 980px) {
            justify-content: center;
            width: 100%;
            height: 600px;
            padding: 0;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            width: 1440px;
            gap: 20px;

            @media (max-width: 980px) {
              flex-direction: column;
              width: auto;
              padding: 0;
            }
          `}
        >
          <AtomIcon
            width="100px"
            height="100px"
            customCSS={css`
              border-radius: 10px;
              background: ${color?.[0]?.hex ?? '#32323d'};
              padding: 60px;
            `}
            color="white"
            icon="https://res.cloudinary.com/whil/image/upload/v1665959363/love_vwgqq4.svg"
          />
          <AtomWrapper
            customCSS={css`
              max-width: 1160px;
              display: grid;
              gap: 10px;
              /* width: 900px; */
              @media (max-width: 1440px) {
                width: 500px;
              }
              @media (max-width: 1240px) {
                width: 350px;
              }
              @media (max-width: 980px) {
                width: auto;
                margin: 0 10px;
              }
            `}
          >
            <AtomText
              as="h1"
              id="headerBarScrollTitle"
              fontWeight="bold"
              color="white"
              customCSS={css`
                margin: 0;
                font-size: 48px;
                @media (max-width: 1440px) {
                  font-size: 36px;
                }
                @media (max-width: 890px) {
                  font-size: 28px;
                }
                @media (max-width: 778px) {
                  font-size: 22px;
                  text-align: center;
                }
              `}
            >
              My Favorites Songs
            </AtomText>
            <AtomWrapper
              alignItems="center"
              customCSS={css`
                width: auto;
                gap: 10px;
                display: flex;
                justify-content: flex-start;
              `}
            ></AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    );
  }
};

type AtomProps = {
  type: keyof typeof typeBanners;
  artist?: IArtist;
  album?: IAlbumType;
  playlist?: IlistPlaylistsBySlug;
};

const AtomBanner: FC<AtomProps> = (props) => typeBanners[props.type](props);

export default AtomBanner;
