(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DevCraftorSDK = factory());
})(this, (function () { 'use strict';

  const axios$2 = require('axios');

  class PaymentModule {
    constructor(token) {
      this.token = token;
      this.baseUrl = "https://pay.color31.com/order";
    }

    async createPayment({ orderId, txnAmount, txnNote, cust_Mobile, cust_Email }) {
      return axios$2.post(`${this.baseUrl}/api/create_payment`, {
        token: this.token,
        orderId,
        txnAmount,
        txnNote,
        cust_Mobile,
        cust_Email
      });
    }

    async checkStatus(orderId) {
      return axios$2.post(`${this.baseUrl}/status`, {
        token: this.token,
        orderId
      });
    }
  }

  const axios$1 = require('axios');

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
      return axios$1.post(`${this.baseUrl}/user/register`, data, {
        headers: this.headers()
      });
    }

    getBalance(mobile) {
      return axios$1.get(`${this.baseUrl}/balance/${mobile}`, {
        headers: this.headers()
      });
    }

    deposit({ mobile, amount, transaction_id }) {
      return axios$1.post(`${this.baseUrl}/wallet/deposit`, {
        mobile,
        amount,
        transaction_id
      }, {
        headers: this.headers()
      });
    }

    withdraw({ mobile, amount, transaction_id }) {
      return axios$1.post(`${this.baseUrl}/wallet/withdraw`, {
        mobile,
        amount,
        transaction_id
      }, {
        headers: this.headers()
      });
    }

    generateGameUrl({ username, password, gameType }) {
      return axios$1.post(`${this.baseUrl}/auth/generate-url`, {
        username,
        password
      }, {
        headers: this.headers({ "X-Game-Type": gameType })
      });
    }
  }

  const axios = require('axios');

  class AiModule {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://api.checkscript.site/api/v3/window/ai";
    }

    solve(prompt) {
      return axios.post(this.baseUrl, { prompt }, {
        headers: {
          apikey: this.apiKey
        }
      });
    }
  }

  // core/sdk.mjs

  class DevCraftorSDK {
     static version = '1.0.0';
    constructor() {
      this.services = {
        payment: null,
        gaming: null,
        ai: null,
      };
    }

    enablePaymentModule({ token }) {
      this.services.payment = new PaymentModule(token);
    }

    enableGamingModule({ apiKey, apiSecret }) {
      this.services.gaming = new GamingModule(apiKey, apiSecret);
    }

    enableAiModule({ apiKey }) {
      this.services.ai = new AiModule(apiKey);
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

  return DevCraftorSDK;

}));
