let debugLevel: number;

export default {
  initialise: async () => {
    const packageJSON = (await import(`${process.cwd()}/package.json`)).default;
    const variable = `${packageJSON.name
      .toUpperCase()
      .replace(/-/g, '_')}_DEBUG`;
    const value = parseInt(process.env[variable] || '');
    debugLevel = Number.isInteger(value) ? value : 0;
  },
  write: (message: string, level = 1) => {
    if (level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
