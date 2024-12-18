## Contributing

[![Build Status](https://travis-ci.org/octotask/auth-routes.svg?branch=master)](https://travis-ci.org/octotask/auth-routes) [![Codecov](https://img.shields.io/codecov/c/github/octotask/auth-routes.svg)](https://codecov.io/gh/octotask/auth-routes/)

[fork]: https://github.com/octotask/auth-routes/fork
[pr]: https://github.com/octotask/auth-routes/compare
[style]: https://standardjs.com/
[code-of-conduct]: CODE_OF_CONDUCT.md
[good-first-issue-search]: https://github.com/search?utf8=%E2%9C%93&q=topic%3Aoctotask+topic%3Aoctotask-app+good-first-issues%3A%3E0&type=
[linter]: https://github.com/octotask/auth-routes/blob/ts-readme/tslint.json

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Submitting a pull request

1. [Fork][fork] and clone the repository
1. Configure and install the dependencies: `npm install`
1. Make sure the tests pass on your machine: `npm test`, note: these tests also apply the [linter][linter] and run the TypeScript compiler (`tsc`) to check for type errors, so there's no need to run these commands separately.
1. Create a new branch: `git checkout -b my-branch-name`
1. Make your change, add tests, and make sure the tests still pass
1. Push to your fork and [submit a pull request][pr]
1. Pat your self on the back and wait for your pull request to be reviewed and merged.

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Follow the [style guide][style] which is using standard. Any linting errors should be shown when running `npm test`
- Write and update tests.
- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

Work in Progress pull requests are also welcome to get feedback early on, or if there is something that blocked you.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)
