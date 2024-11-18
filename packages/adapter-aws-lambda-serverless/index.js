const OctotaskExports = require("octotask");
const lambdaFunction = require("./lambda-function");

module.exports = { ...OctotaskExports, createLambdaFunction };

/**
 *
 * @param {import('octotask').ApplicationFunction} app
 * @param { { octotask: import('octotask').Octotask } } options
 */
function createLambdaFunction(app, { octotask }) {
  // load app once outside of the function to prevent double
  // event handlers in case of container reuse
  octotask.load(app);

  return lambdaFunction.bind(null, octotask);
}
