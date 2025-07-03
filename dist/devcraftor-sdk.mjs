import axios from 'axios';

class Payment {
  constructor(token) {
    this.token = token;
    this.apiBase = 'https://api.devcraftor.in/order';
  }

  async createPayment({ orderId, txnAmount, txnNote, cust_Mobile, cust_Email }) {
    try {
      const res = await axios.post(`${this.apiBase}/api/create_payment`, {
        token: this.token,
        orderId,
        txnAmount,
        txnNote,
        cust_Mobile,
        cust_Email
      });

      return res.data;
    } catch (error) {
      return {
        success: false,
        message: 'Payment API request failed',
        error: error?.response?.data || error.message
      };
    }
  }

  async checkPaymentStatus(orderId) {
    try {
      const res = await axios.post(`${this.apiBase}/status`, {
        token: this.token,
        orderId
      });

      return res.data;
    } catch (error) {
      return {
        success: false,
        message: 'Status API request failed',
        error: error?.response?.data || error.message
      };
    }
  }
}

class GamingModule {
  constructor(apiKey, apiSecret) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = "https://play.DevCraftor.in/api/v1/partner";
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

// modules/ai.mjs

class AiModule {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://api.checkscript.site/api/v3/window/ai";
  }

  async ask(prompt) {
    const res = await axios.post(this.baseUrl, { prompt }, {
      headers: {
        apikey: this.apiKey
      }
    });

    return res.data;
  }
}

class DevCraftorSDK {
  static version = '1.0.0';

  constructor() {
    this.services = {
      payment: null,
      gaming: null,
      ai: null
    };
  }

  initPayment({ key }) {
    this.services.payment = new Payment(key); // 'key' maps to 'token' inside
  }

  initGaming({ key, secret }) {
    this.services.gaming = new GamingModule(key, secret);
  }

  initAi({ key }) {
    this.services.ai = new AiModule(key);
  }

  get payment() {
    return this.services.payment;
  }

  get gaming() {
    return this.services.gaming;
  }

  get ai() {
    return this.services.ai;
  }
}

// browser.js

// Also expose it on the window object for browser
if (typeof window !== 'undefined') {
  window.DevCraftorSDK = DevCraftorSDK;
}

export { DevCraftorSDK as default };
