export const SHARE_SCHEME = 'dolbyio://';
export const SHARE_LINK = 'https://experience.dolby.io/';
export const SHARE_PATH = 'videocall/';

export const getShareURL = (id: string, token: string) => {
  return `${SHARE_SCHEME + SHARE_PATH}?id=${encodeURIComponent(
    id,
  )}&token=${encodeURIComponent(token)}`;
};
