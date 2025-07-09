import axios from 'axios';

class GamingModule {
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = "https://connect.devcraftor.in/api/v2/partner";
  }

  headers(extra = {}) {
    return {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      "X-API-Secret": this.apiSecret,
      ...extra
    };
  }

  registerUser(data) {
    return axios.post(`${this.baseUrl}/user/register`, data, {
      headers: this.headers()
    });
  }

  getBalance(mobile) {
    return axios.get(`${this.baseUrl}/balance/${mobile}`, {
      headers: this.headers()
    });
  }

  deposit({ mobile, amount, transaction_id }) {
    return axios.post(`${this.baseUrl}/wallet/deposit`, {
      mobile,
      amount,
      transaction_id
    }, {
      headers: this.headers()
    });
  }

  withdraw({ mobile, amount, transaction_id }) {
    return axios.post(`${this.baseUrl}/wallet/withdraw`, {
      mobile,
      amount,
      transaction_id
    }, {
      headers: this.headers()
    });
  }

  generateGameUrl({ username, password, gameType }) {
    return axios.post(`${this.baseUrl}/auth/generate-url`, {
      username,
      password
    }, {
      headers: this.headers({ "X-Game-Type": gameType })
    });
  }
}

export default GamingModule;
