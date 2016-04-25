import { get, post } from 'axios';
import { observable, computed } from 'mobx';
import jwt from 'jsonwebtoken';
import singleton from 'singleton';

import Storage from 'services/Storage';

class Auth extends singleton {
  @observable user = null;

  constructor() {
    super();

    const token = Storage.get('token');

    if (token) {
      this.user = jwt.verify(token, JWT_SECRET);
    }
  }

  @computed get isLoggedIn() {
    return !!this.user;
  }

  login(username, password) {
    return post('/api/auth/login', {
      username, password
    })
    .then((res) => {
      this.user = res.data.user;
      Storage.set('token', res.data.token);
      return res;
    });
  }

  logout() {
    Storage.remove('token');
    this.user = null;
    return get('/api/auth/logout');
  }
}

export default Auth.get();
