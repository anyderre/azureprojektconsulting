const { alias } = require('react-app-rewire-alias');
const {} = require('react-app-rewired');

module.exports = function override(config) {
  alias({
    '@/components': 'src/components',
    '@/config': 'src/config',
    '@/features': 'src/features',
    '@/lib': 'src/lib',
    '@/providers': 'src/providers',
    '@/routes': 'src/routes',
    '@/stores': 'src/stores',
    '@/utils': 'src/utils',
    '@/assets': 'assets',
    '@/data': 'src/data',
  })(config);

  return config;
};
