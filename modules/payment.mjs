import axios from 'axios';

export default class Payment {
  constructor(token, apiKey, apiSecret) {
    this.token = token;
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.apiBase = 'https://connect.devcraftor.in/api';
  }

  headers(extra = {}) {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': this.apiKey,
      'X-API-Secret': this.apiSecret,
      ...extra
    };
  }

   async createPayment({ orderId, txnAmount, txnNote, cust_Mobile, cust_Email }) {
    try {
      const res = await axios.post(`${this.apiBase}/v2/partner/payment_links`, {
        token: this.token,
        orderId,
        txnAmount,
        txnNote,
        cust_Mobile,
        cust_Email
      }, {
        headers: this.headers() 
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
      const res = await axios.post(`${this.apiBase}/v2/partner/order/status`, {
        token: this.token,
        orderId
      }, {
        headers: this.headers() 
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
