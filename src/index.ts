import dotenv from 'dotenv';

let debug: boolean;
let debugLevel: number;

export default {
  initialise: async () => {
    dotenv.config({ path: `${process.cwd()}/.debug.env` });
    debug = (process.env.DEBUG || 'false') == 'true';
    const debugLevelValue = parseInt(process.env.DEBUG_LEVEL || '');
    debugLevel = Number.isInteger(debugLevelValue)
      ? debugLevelValue
      : Number.MAX_SAFE_INTEGER;
  },
  write: (message: string, level = 1) => {
    if (debug && level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
