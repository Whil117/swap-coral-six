/* eslint-disable no-unused-vars */
import { ILyric } from '@Types/index';
import { atom } from 'jotai';

export const initialState = {
  id: '',
  name: '',
  lyrics: [] as ILyric[],
  openSetting: false,
  duration: 0,
  editLyric: {} as ILyric
};

type INITIALSTATE = {
  id?: string;
  name?: string;
  lyrics?: ILyric[];
  openSetting?: boolean;
  duration?: number;
  editLyric?: ILyric;
};

type typesReducers = {
  [key: string]: (state: INITIALSTATE, payload: INITIALSTATE) => INITIALSTATE;
};

const typesReducers: typesReducers = {
  SETLYRIC: (state: INITIALSTATE, payload: INITIALSTATE) => {
    return {
      ...state,
      ...payload
    };
  },
  EDITLYRIC: (state: INITIALSTATE, payload: INITIALSTATE) => {
    return {
      ...state,
      lyrics: state?.lyrics?.map((lyric) => {
        if (lyric?.id === payload.id) {
          return {
            ...lyric,
            ...payload
          };
        }
        return lyric;
      })
    };
  },
  OPENBYLYRIC: (state: INITIALSTATE, payload: INITIALSTATE) => {
    return {
      ...state,
      openSetting: payload.openSetting,
      editLyric: payload.editLyric,
      lyrics: state?.lyrics?.map((lyric) => {
        if (lyric?.id === payload.editLyric?.id) {
          return {
            ...lyric,
            ...payload.editLyric
          };
        }
        return lyric;
      })
    };
  },
  CLOSEBYLYRIC: (state: INITIALSTATE, payload: INITIALSTATE) => {
    return {
      ...state,
      openSetting: payload.openSetting,
      editLyric: {}
    };
  },
  DELETEARTISTBYLYRIC: (state: INITIALSTATE, payload: INITIALSTATE) => {
    return {
      ...state,
      editLyric: {
        ...state.editLyric,
        artists: state?.editLyric?.artists?.filter(
          (artist) => artist?.id !== payload?.id
        )
      }
    };
  }
};

export type ACTIONLYRIC = {
  type: keyof typeof typesReducers;
  payload?: INITIALSTATE;
};

export const REDUCERLYRIC = (
  state = initialState as INITIALSTATE,
  action: ACTIONLYRIC
) => {
  const { type, payload } = action;
  const handler = typesReducers[type];
  const newState = handler ? handler(state, payload as INITIALSTATE) : state;
  return newState as INITIALSTATE;
};

export const CONTROLSLYRIC = atom(initialState as INITIALSTATE);

const REDUCER_LYRIC_ATOM = (
  reducer: (v: INITIALSTATE, a: ACTIONLYRIC) => INITIALSTATE
) => {
  const CREATENEWATOM = atom(
    (get) => get(CONTROLSLYRIC),
    (get, set, action: ACTIONLYRIC) =>
      set(CONTROLSLYRIC, reducer(get(CONTROLSLYRIC), action))
  );
  return CREATENEWATOM;
};

export default REDUCER_LYRIC_ATOM(REDUCERLYRIC);
