// modules/ai.mjs
import axios from 'axios';

export default class AiModule {
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
