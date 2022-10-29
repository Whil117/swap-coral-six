/* eslint-disable no-unused-vars */
import { atom } from 'jotai';
import MY_FAVORITES_REDUCER_ATOM, {
  InitialStateFavorites
} from '_jotai/favoritesSongs/reducer';
export type PropsReturn = {
  list: InitialStateFavorites[];
  dragEnter: number | null;
  dragStart: number | null;
  callback: (values: InitialStateFavorites[]) => void;
};

export const DRAGSTART_ATOM = atom<number | null>(null);
export const DRAGENTER_ATOM = atom<number | null>(null);

export const REORDER_DRAGANDROP_ATOM = atom(
  (get) => ({
    list: get(MY_FAVORITES_REDUCER_ATOM),
    dragStart: get(DRAGSTART_ATOM),
    dragEnter: get(DRAGENTER_ATOM),
    callback: () => {}
  }),
  (get, set, args: PropsReturn) => {
    const { list, dragStart, dragEnter: dragOverItem } = args;
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragStart as number];
    copyListItems.splice(dragStart as number, 1);
    copyListItems.splice(dragOverItem as number, 0, dragItemContent);
    set(DRAGSTART_ATOM, null);
    set(DRAGENTER_ATOM, null);
    const newStateTracks = copyListItems.map((item, index) => ({
      ...item,
      track_number: index + 1
    }));
    set(MY_FAVORITES_REDUCER_ATOM, newStateTracks);
    setTimeout(() => {
      args?.callback(newStateTracks);
    }, 1000);
  }
);
