import dotenv from 'dotenv';

const variablePrefixPattern = /^[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*$/;

let debugLevel: number;

export default {
  initialise: async (variablePrefix?: string) => {
    if (variablePrefix && !variablePrefixPattern.test(variablePrefix)) {
      console.error(
        `Variable prefix must match pattern "${variablePrefixPattern.source}"`
      );
      process.exit(1);
    }
    dotenv.config({ path: `${process.cwd()}/.debug.env` });
    const packageJSON = (await import(`${process.cwd()}/package.json`)).default;
    const variable = `${
      variablePrefix ? `${variablePrefix}_` : ''
    }${packageJSON.name.toUpperCase().replace(/-/g, '_')}_DEBUG`;
    const value = parseInt(process.env[variable] || '');
    debugLevel = Number.isInteger(value) ? value : 0;
  },
  write: (message: string, level = 1) => {
    if (level <= debugLevel) {
      console.log(`[debug-${level}] ${message}`);
    }
  },
};
