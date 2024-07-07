import dotenv from 'dotenv';

let debug: boolean;
let debugLevel: number;

export default {
  initialise: async () => {
    dotenv.config({ path: `${process.cwd()}/.debug.env` });
    debug = (process.env.DEBUG || 'false') == 'true';
    const debugLevelValue = Number(process.env.DEBUG_LEVEL || 'default');
    debugLevel = isNaN(debugLevelValue)
      ? Number.MAX_SAFE_INTEGER
      : debugLevelValue;
  },
  write: (message: string, level = 1) => {
    if (debug && level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
