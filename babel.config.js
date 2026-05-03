module.exports = function (api) {
  const isProduction = api.env('production');
  api.cache.using(() => isProduction);
  return {
    presets: ['babel-preset-expo'],
    plugins: isProduction
      ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
      : [],
  };
};
