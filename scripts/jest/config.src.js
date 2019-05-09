const baseConfig = require("./config.base");

// Create a module map to point packages to the build output
const moduleNameMapper = {};

moduleNameMapper["^commodo-fields-object/(.*)$"] = "<rootDir>src/$1";
moduleNameMapper["^commodo-fields-object$"] = "<rootDir>src";

module.exports = Object.assign({}, baseConfig, {
    moduleNameMapper,
    coverageReporters: ["lcov", "html"],
    coveragePathIgnorePatterns: ["__tests__", "/node_modules/"]
});
