let maximumLevel: number;

export default {
  initialise: async () => {
    const packageJSON = (await import(`${process.cwd()}/package.json`)).default;
    const variable = `${packageJSON.name
      .toUpperCase()
      .replace(/-/g, '_')}_DEBUG`;
    const value = parseInt(process.env[variable] || '');
    maximumLevel = Number.isInteger(value) ? value : 0;
  },
  write: (message: string, level = 1) => {
    if (level <= maximumLevel) {
      console.log(`Debug-${level}: ${message}`);
    }
  },
};
