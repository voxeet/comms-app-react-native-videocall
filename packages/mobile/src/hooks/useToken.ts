import { useContext } from 'react';

import { TokenContext } from '../providers/TokenProvider';

const useToken = () => {
  const { token, setToken } = useContext(TokenContext);

  return { token, setToken };
};

export default useToken;
