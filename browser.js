import DevCraftorSDK from './core/sdk.mjs';
export default DevCraftorSDK;

// Also expose it on the window object for browser
if (typeof window !== 'undefined') {
  window.DevCraftorSDK = DevCraftorSDK;
}
