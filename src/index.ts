import dotenv from 'dotenv';

let debug: boolean;
let debugLevel: number = Number.MAX_SAFE_INTEGER;

export default {
  initialise: async (value?: any) => {
    debug = typeof value !== 'undefined' ? true : false;
    debugLevel = typeof value == 'number' ? value : Number.MAX_SAFE_INTEGER;
  },
  write: (message: string, level = 1) => {
    if (debug && level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
