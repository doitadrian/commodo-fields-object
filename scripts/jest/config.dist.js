const baseConfig = require("./config.base");

// Create a module map to point packages to the build output
const moduleNameMapper = {};

moduleNameMapper["^commodo-fields-object/(.*)$"] = "<rootDir>dist/$1";
moduleNameMapper["^commodo-fields-object$"] = "<rootDir>dist";

module.exports = Object.assign({}, baseConfig, {
    moduleNameMapper
});
