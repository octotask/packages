      # How to contribute

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.

## Creating an Issue

Before you create a new Issue:

1. Please make sure there is no [open issue](https://github.com/octotask/octokit-plugin-config/issues?utf8=%E2%9C%93&q=is%3Aissue) yet.
2. If it is a bug report, include the steps to reproduce the issue and please create a reproducible test case on [runkit.com](https://runkit.com/). Example: https://runkit.com/gr2m/5aa034f1440b420012a6eebf
3. If it is a feature request, please share the motivation for the new feature, what alternatives you tried, and how you would implement it.
4. Please include links to the corresponding github documentation.

## Setup the repository locally

First, fork the repository.

Setup the repository locally. Replace `<your account name>` with the name of the account you forked to.

```shell
git clone https://github.com/<your account name>/octokit-plugin-config.git
cd octokit-plugin-config
npm install
```

Run the tests before making changes to make sure the local setup is working as expected

```shell
npm test
```

## Submitting the Pull Request

- Create a new branch locally.
- Make your changes in that branch and push them to your fork
- Submit a pull request from your topic branch to the main branch on the `octotask/octokit-plugin-config` repository.
- Be sure to tag any issues your pull request is taking care of / contributing to. Adding "Closes #123" to a pull request description will automatically close the issue once the pull request is merged in.

## Testing a pull request from github repo locally:

You can install `@octotask/octokit-plugin-config` from each pull request. Replace `[PULL REQUEST NUMBER]`:

```
npm install https://github.pika.dev/octotask/octokit-plugin-config/pr/[PULL REQUEST NUMBER]
```

Once you are done testing, you can revert back to the default module `@octotask/octokit-plugin-config` from npm with `npm install @octotask/octokit-plugin-config`

## Merging the Pull Request & releasing a new version

Releases are automated using [semantic-release](https://github.com/semantic-release/semantic-release).
The following commit message conventions determine which version is released:

1. `fix: ...` or `fix(scope name): ...` prefix in subject: bumps fix version, e.g. `1.2.3` → `1.2.4`
2. `feat: ...` or `feat(scope name): ...` prefix in subject: bumps feature version, e.g. `1.2.3` → `1.3.0`
3. `BREAKING CHANGE:` in body: bumps breaking version, e.g. `1.2.3` → `2.0.0`

Only one version number is bumped at a time, the highest version change trumps the others.
Besides publishing a new version to npm, semantic-release also creates a git tag and release
on GitHub, generates changelogs from the commit messages and puts them into the release notes.

Before the publish it runs the `npm run build` script which creates a `pkg/` folder with distributions for browsers, node and Typescript definitions. The contents of the `pkg/` folder are published to the npm registry.

If the pull request looks good but does not follow the commit conventions, use the <kbd>Squash & merge</kbd> button.
