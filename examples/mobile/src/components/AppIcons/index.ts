import dolby from '../../../assets/images/dolby.svg';
import welcomeDark from '../../../assets/images/welcomeDark.svg';
import welcomeLight from '../../../assets/images/welcomeLight.svg';

const AppIcons = {
  dolby,
  welcomeLight,
  welcomeDark,
};

export default AppIcons;
export type AppIconComponentName = keyof typeof AppIcons;
