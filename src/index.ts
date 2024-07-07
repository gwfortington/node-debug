import dotenv from 'dotenv';

let debug: boolean;
let debugLevel: number;

export default {
  initialise: async () => {
    dotenv.config({ path: `${process.cwd()}/.debug.env` });
    debug = (process.env.DEBUG || 'false') == 'true';
    const _debugLevel = Number(process.env.DEBUG_LEVEL || 'default');
    debugLevel = isNaN(_debugLevel)
      ? Number.MAX_SAFE_INTEGER
      : Math.trunc(_debugLevel);
  },
  write: (message: string, level = 1) => {
    if (debug && level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
