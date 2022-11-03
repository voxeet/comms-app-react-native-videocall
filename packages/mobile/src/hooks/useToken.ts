import { useContext } from 'react';

import { CommsContext } from '../providers/CommsProvider';

const useToken = () => {
  const { token, setToken } = useContext(CommsContext);

  return { token, setToken };
};

export default useToken;
