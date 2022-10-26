//KEYS
const TOKEN = "token";
const USER = "user";

class Storage {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : item;
  }

  remove(key) {
    localStorage.removeItem(key);
  }
}

class LoginCache {
  _keys = [USER, TOKEN];
  storage = new Storage();

  save(user, token) {
    this.storage.setItem(USER, user);
    this.storage.setItem(TOKEN, token);
  }

  fetch() {
    return this._keys.map((key) => this.storage.getItem(key));
  }

  fetchToken() {
    return this.storage.getItem(TOKEN);
  }

  clear() {
    this._keys.forEach((key) => this.storage.remove(key));
  }
}

export const loginCache = new LoginCache();
