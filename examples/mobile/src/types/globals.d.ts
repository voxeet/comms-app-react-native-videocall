import {Routes} from './routes.types';

// type RootStackParamList = typeof Routes;

export type RootStackParamList = Record<Routes, undefined>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
