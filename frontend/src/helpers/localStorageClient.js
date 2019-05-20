const LOCAL_STORAGE_TOKEN = 'token';
const LOCAL_STORAGE_USERNAME = 'username';

class localStorageClient {
  constructor() {
    this.useLocalStorage = typeof localStorage !== 'undefined';

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
      this.username = localStorage.getItem(LOCAL_STORAGE_USERNAME);
    }
  }

  setTokenAndUsername(token, username) {
    this.token = token;
    this.username = username;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
    }
  }

  removeTokenAndUsername() {
    this.token = null;
    this.username = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      localStorage.removeItem(LOCAL_STORAGE_USERNAME);
    }
  }
}

export const localStore = new localStorageClient();
