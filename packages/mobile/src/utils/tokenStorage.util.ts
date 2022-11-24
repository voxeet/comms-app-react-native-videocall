import EncryptedStorage from 'react-native-encrypted-storage';

export const tokenStorage = () => {
  async function storeToken(tokenValue: string) {
    try {
      await EncryptedStorage.setItem('access_token', tokenValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error during saving token: ${error}`);
    }
  }

  async function retrieveToken() {
    try {
      const savedToken = await EncryptedStorage.getItem('access_token');
      return savedToken;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`error during retrieving token: ${error}`);
    }
    return '';
  }

  return { storeToken, retrieveToken };
};

export default tokenStorage;
