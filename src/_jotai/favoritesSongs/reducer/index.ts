/* eslint-disable no-unused-vars */
import { ISong } from '@Types/index';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { PropsWithTypes } from '_jotai/player/reducer';

const initialState = [] as InitialStateFavorites[];

export type InitialStateFavorites = PropsWithTypes<ISong>;

type typesReducers = {
  [key: string]: (
    state: InitialStateFavorites[],
    payload: InitialStateFavorites
  ) => InitialStateFavorites[];
};

const typesReducers: typesReducers = {
  SET_FAVORITE: (state, payload) => [...state, payload],
  REMOVE_FAVORITE: (state, payload) =>
    state.filter((favorite) => favorite.id !== payload.id)
};

export type ActionPlayer = {
  type: keyof typeof typesReducers;
  payload?: InitialStateFavorites;
};

export const REDUCER_FAVORITES = (
  state = initialState as InitialStateFavorites[],
  action: ActionPlayer
) => {
  const { type, payload } = action;
  const handler = typesReducers[type];
  const newState = handler
    ? handler(state, payload as InitialStateFavorites)
    : state;
  return newState as InitialStateFavorites[];
};

export const MYFAVORITES_ATOMWITHSTORAGE = atomWithStorage(
  'SWAPFAVORITES',
  initialState as InitialStateFavorites[]
);
export const REDUCER_PLAYER_ATOM = (
  reducer: (
    v: InitialStateFavorites[],
    a: ActionPlayer
  ) => InitialStateFavorites[]
) => {
  const CREATENEWATOM = atom(
    (get) => get(MYFAVORITES_ATOMWITHSTORAGE),
    (get, set, action: ActionPlayer) =>
      set(
        MYFAVORITES_ATOMWITHSTORAGE,
        reducer(get(MYFAVORITES_ATOMWITHSTORAGE), action)
      )
  );
  return CREATENEWATOM;
};

const MY_FAVORITES_REDUCER_ATOM = atomWithStorage(
  'SWAPFAVORITES',
  [] as InitialStateFavorites[]
);

export default MY_FAVORITES_REDUCER_ATOM;
