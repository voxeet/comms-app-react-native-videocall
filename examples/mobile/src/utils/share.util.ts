export const SHARE_LINK = 'https://experience.dolby.io/';
export const SHARE_PATH = 'videocall/';

export const getShareURL = (id: string, token: string) => {
  return `${SHARE_LINK + SHARE_PATH}?id=${encodeURIComponent(
    id,
  )}&token=${token}`;
};
