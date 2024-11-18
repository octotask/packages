import { Octotask } from "octotask";

export default (app: Octotask) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    await context.octokit.issues.createComment(issueComment);
  });
  // For more information on building apps:
  // https://octotask.github.io/docs/

  // To get your app running against GitHub, see:
  // https://octotask.github.io/docs/development/
};
