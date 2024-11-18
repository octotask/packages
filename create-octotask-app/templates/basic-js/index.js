/**
 * This is the main entrypoint to your Octotask app
 * @param {import('octotask').Octotask} app
 */
export default (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });

  // For more information on building apps:
  // https://octotask.github.io/docs/

  // To get your app running against GitHub, see:
  // https://octotask.github.io/docs/development/
};
