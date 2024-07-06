import dotenv from 'dotenv';

let debugLevel: number;

export default {
  initialise: async () => {
    dotenv.config({ path: `${process.cwd()}/.debug.env` });
    const debugLevelValue = parseInt(process.env.DEBUG_LEVEL || '');
    debugLevel = Number.isInteger(debugLevelValue) ? debugLevelValue : 0;
  },
  write: (message: string, level = 1) => {
    if (level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
