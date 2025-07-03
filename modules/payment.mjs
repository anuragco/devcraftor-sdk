import axios from 'axios';

export default class Payment {
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
