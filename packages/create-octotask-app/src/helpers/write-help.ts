import chalk from "chalk";
import path from "node:path";

export const green = chalk.green;
export const blue = chalk.blue;
export const red = chalk.red;
export const yellow = chalk.yellow;
export const bold = chalk.bold;

const helpLines = [
  "",
  `Argument ${blue("<destination>")} is required.`,
  "",
  "Example:",
  `  ${green("create-octotask-app")} ${blue("my-first-app")}`,
  "",
  `Run ${green("create-octotask-app")} --help to see all options.`,
];

function writeHelp(): void {
  helpLines.forEach((line) => {
    console.log(`  ${line}`);
  });
}

export function printSuccess(appName: string, destination: string) {
  console.log(`
Successfully created ${blue(appName)}.

Begin using your app with:

  ${green("cd")} ${path.relative(process.cwd(), destination)}
  npm start

Refer to your app's README for more usage instructions.

Visit the Octotask docs
  https://octotask.github.io/docs/

Get help from the community:
  https://octotask.github.io/community/

${green("Enjoy building your Octotask app!")}`);
}

export function printHelpAndFail(): void {
  console.log(
    `${green("create-octotask-app")} [options] ${blue("<destination>")} `,
  );
  writeHelp();
  process.exit(1);
}
