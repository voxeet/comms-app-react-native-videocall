import jwt_decode, {JwtPayload} from 'jwt-decode';

const base = `^(?! )(?!.*\\s$)(?!.* {2})[a-zA-Za-åa-ö-w-я 0-9/@%!#?_.]`;

export const isValidUserName = (
  value: string,
  minimumCharacterLength: number,
) => {
  const regex = new RegExp(`${base}{${minimumCharacterLength},30}$`);
  return regex.test(value);
};

export const isValidMeetingTitle = (
  value: string,
  minimumCharacterLength: number,
) => {
  const regex = new RegExp(`${base}{${minimumCharacterLength},30}$`);
  return regex.test(value);
};

export const validateToken = (token: string): boolean => {
  try {
    const decodedToken = jwt_decode<JwtPayload>(token);
    if (!decodedToken.exp) return false;
    const tokenExpiration = new Date(decodedToken.exp * 1000);
    return tokenExpiration.getTime() > new Date().getTime();
  } catch (error) {
    return false;
  }
};
