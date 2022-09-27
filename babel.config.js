module.exports = (api) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  api.cache(true);
  return {
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      [
        'module-resolver',
        {
          alias: {
            '~': './src',
          },
          root: ['./'],
        },
      ],
    ],
    presets: ['babel-preset-expo'],
    // presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  };
};
