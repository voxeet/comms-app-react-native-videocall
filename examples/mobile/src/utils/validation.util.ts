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
