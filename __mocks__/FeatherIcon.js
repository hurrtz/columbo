const React = require("react");
const { Text } = require("react-native");

function FeatherIcon({ name, color, testID }) {
  return React.createElement(
    Text,
    { style: { color }, testID: testID ?? `icon-${name}` },
    `icon:${name}`,
  );
}

module.exports = FeatherIcon;
module.exports.default = FeatherIcon;
