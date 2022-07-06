import HttpClient from './utils/HttpClient';

class UsersService {
  constructor() {
    this.httpClient = new HttpClient('https://randomuser.me/api');
    this.results = '&results=';
    this.includedFields = '?inc=name,location,registered,picture,phone,login';
    this.seed = '&seed=abc';
  }

  async listUsers(numberOfUsers) {
    return this.httpClient
      .get(`${this.includedFields}${this.results}${numberOfUsers}${this.seed}`);
  }
}

export default new UsersService();
