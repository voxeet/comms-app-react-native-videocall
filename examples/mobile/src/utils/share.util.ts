import {SHARE_PATH, SHARE_SCHEME} from '../App';

export const getShareURL = (id: string, token: string) => {
  return `${SHARE_SCHEME + SHARE_PATH}?id=${encodeURIComponent(
    id,
  )}&token=${token}`;
};
