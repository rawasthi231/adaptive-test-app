const JavaScriptObfuscator = require('webpack-obfuscator');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push(
        new JavaScriptObfuscator({
          rotateStringArray: true,
        }, [])
      );
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
