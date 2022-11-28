import React, { createContext, ReactElement, useMemo, useState, useEffect } from 'react';

import sdkService from '../services/sdk';
import tokenStorage from '../utils/tokenStorage.util';

import { URL_TOKEN, URL_TOKEN_KEYS } from './TokenUrl';

const { retrieveToken } = tokenStorage();

type TokenContext = {
  token: string | null;
  setToken: (value: string | null) => void;
  refreshToken: (() => Promise<string>) | null;
};

type TokenProviderProps = {
  children: ReactElement;
  validateToken: (token: string) => boolean;
  fetch: {
    get(url: string): Promise<never>;
  };
};

export const TokenContext = createContext<TokenContext>({
  token: null,
} as TokenContext);

const TokenProvider: React.FC<TokenProviderProps> = ({ children, validateToken, fetch }) => {
  const [key, setKey] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // INITIALIZATION

  const getToken = async () => {
    const res: { access_token: string } = await fetch.get(`${URL_TOKEN}/${key}`);
    return res.access_token;
  };

  useEffect(() => {
    (async () => {
      if (URL_TOKEN_KEYS) {
        const keys: { [key: string]: string } = await fetch.get(URL_TOKEN_KEYS);
        setKey(Object.keys(keys)[2]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (key) {
        setToken(await getToken());
      } else {
        await retrieveToken().then((retrievedToken) => {
          if (retrievedToken !== null && validateToken(retrievedToken)) {
            setToken(retrievedToken);
          }
        });
      }
    })();
  }, [key]);

  useEffect(() => {
    (async () => {
      if (key && token) {
        await sdkService.initializeToken(token, getToken);
      } else if (token) {
        await sdkService.initializeToken(token, refreshToken);
      } else {
        // eslint-disable-next-line no-console
        console.log('No initialization params passed');
      }
    })();
  }, [token]);

  const refreshToken = async () => {
    if (token && token.length > 0) {
      return Promise.resolve(token);
    }

    // eslint-disable-next-line no-console
    console.log('ERROR - Failed to refresh the token');
    return Promise.reject();
  };

  const contextValue: TokenContext = useMemo(
    () => ({
      token,
      setToken,
      refreshToken,
    }),
    [token],
  );
  return <TokenContext.Provider value={contextValue}>{children}</TokenContext.Provider>;
};
export default TokenProvider;
