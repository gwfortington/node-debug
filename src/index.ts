let debug: boolean = false;
let debugLevel: number = Number.MAX_SAFE_INTEGER;

export default {
  initialise: async (value: any = false) => {
    if (typeof value !== 'boolean' || value == true) {
      debug = true;
    }
    if (debug && typeof value == 'number') {
      debugLevel = value;
    }
  },
  write: (message: string, level = 1) => {
    if (debug && level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
