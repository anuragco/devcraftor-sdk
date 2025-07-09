import Payment from '../modules/payment.mjs';
import Gaming from '../modules/gaming.mjs';
import Ai from '../modules/ai.mjs';

class DevCraftorSDK {
  static version = '2.0.0';

  constructor() {
    this.services = {
      payment: null,
      gaming: null,
      ai: null
    };
  }

  initPayment({ token, apiKey, secret }) {
    this.services.payment = new Payment(token, apiKey, secret); 
  }

  initGaming({ key, secret }) {
    this.services.gaming = new Gaming(key, secret);
  }

  initAi({ key }) {
    this.services.ai = new Ai(key);
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

export default DevCraftorSDK;
export { DevCraftorSDK };