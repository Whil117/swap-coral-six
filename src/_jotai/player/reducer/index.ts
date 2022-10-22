import { getRandomTrack } from '@Components/@atoms/AtomPlayByAlbum&Playlist';
import { IAlbumType, IImage, ISong } from '@Types/index';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { NextRouter } from 'next/router';

/* eslint-disable no-unused-vars */

export type PropsWithTypes<T> = T & {
  images?: IImage[];
  album?: IAlbumType;
  destination?: {
    type: 'album' | 'playlist' | '';
    id: string;
  };
};

export type InitialState = {
  currentTrack?: PropsWithTypes<ISong>;
  controls?: {
    aleatory?: boolean;
    repeat?: boolean;
    repeatByOne?: boolean;
  };
  context?: PropsWithTypes<ISong>[];
  origin?: NextRouter;
};

export const initialState: InitialState = {
  currentTrack: {
    id: '',
    name: 'XDDD',
    artists: [],
    destination: {
      type: '',
      id: ''
    }
  },
  controls: {
    aleatory: false,
    repeat: false,
    repeatByOne: false
  },
  context: [],
  origin: {} as NextRouter
};

type typesReducers = {
  [key: string]: (state: InitialState, payload: InitialState) => InitialState;
};

const typesReducers: typesReducers = {
  SET_TRACK: (STATE, PAYLOAD) => ({
    ...STATE,
    currentTrack: PAYLOAD.currentTrack,
    context: PAYLOAD.context?.sort(function (a, b) {
      if (b.track_number) {
        if ((a.track_number as number) > b.track_number) return 1;
        if ((a.track_number as number) < b.track_number) return -1;
      }
      return 0;
    }),
    origin: PAYLOAD.origin ?? STATE.origin
  }),
  CHANGE_TRACK: (STATE, PAYLOAD) => {
    const TRACKNUMBER = STATE.controls?.aleatory
      ? (getRandomTrack(STATE.context as PropsWithTypes<ISong>[])
          ?.track_number as number)
      : (PAYLOAD?.currentTrack?.track_number as number);
    const isValidTrackNumber = STATE?.context?.some(
      (item) => item.track_number === TRACKNUMBER
    );
    if (isValidTrackNumber) {
      return {
        ...STATE,
        currentTrack: STATE?.context
          ?.sort(function (a, b) {
            if (b.track_number) {
              if ((a.track_number as number) > b.track_number) return 1;
              if ((a.track_number as number) < b.track_number) return -1;
            }
            return 0;
          })
          ?.find((item) => item.track_number === TRACKNUMBER)
      };
    }
    if (TRACKNUMBER <= 0) {
      return {
        ...STATE,
        currentTrack: STATE?.context?.[STATE?.context.length - 1]
      };
    }
    return {
      ...STATE,
      currentTrack: STATE?.context?.[0]
    };
  },
  SET_REPEAT: (STATE, PAYLOAD) => ({
    ...STATE,
    controls: {
      ...STATE.controls,
      repeat: !STATE.controls?.repeat as boolean
    } as any
  }),
  SET_ALEATORY: (STATE, PAYLOAD) => ({
    ...STATE,
    controls: {
      ...STATE.controls,
      aleatory: PAYLOAD.controls?.aleatory as boolean
    }
  }),
  SET_REPEATBYONE: (STATE, PAYLOAD) => ({
    ...STATE,
    controls: {
      ...STATE.controls,
      repeatByOne: !STATE.controls?.repeatByOne as boolean
    } as any
  }),
  SET_CONTEXT: (state, payload) => ({
    ...state,
    context: payload.context
  })
};

export type ActionPlayer = {
  type: keyof typeof typesReducers;
  payload?: InitialState;
};

export const REDUCER_PLAYER = (
  state = initialState as InitialState,
  action: ActionPlayer
) => {
  const { type, payload } = action;
  const handler = typesReducers[type];
  const newState = handler ? handler(state, payload as InitialState) : state;
  return newState as InitialState;
};

export const CONTROLS_PLAYER_ATOM = atomWithStorage(
  'SWAPPLAYER',
  initialState as InitialState
);
export const REDUCER_PLAYER_ATOM = (
  reducer: (v: InitialState, a: ActionPlayer) => InitialState
) => {
  const CREATENEWATOM = atom(
    (get) => get(CONTROLS_PLAYER_ATOM),
    (get, set, action: ActionPlayer) =>
      set(CONTROLS_PLAYER_ATOM, reducer(get(CONTROLS_PLAYER_ATOM), action))
  );
  return CREATENEWATOM;
};

const CONTROLS_PLAYER_WITH_REDUCER_ATOM = REDUCER_PLAYER_ATOM(REDUCER_PLAYER);

export default CONTROLS_PLAYER_WITH_REDUCER_ATOM;
