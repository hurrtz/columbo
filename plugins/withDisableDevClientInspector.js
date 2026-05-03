const { withPodfileProperties } = require("@expo/config-plugins");

module.exports = function withDisableDevClientInspector(config) {
  return withPodfileProperties(config, (config) => {
    config.modResults["EX_DEV_CLIENT_NETWORK_INSPECTOR"] = "false";
    return config;
  });
};
