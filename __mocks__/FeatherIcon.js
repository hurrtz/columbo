const React = require("react");
const { Text } = require("react-native");

function FeatherIcon({ name }) {
  return React.createElement(Text, null, `icon:${name}`);
}

module.exports = FeatherIcon;
module.exports.default = FeatherIcon;
