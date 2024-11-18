# `@octotask/adapter-aws-lambda-serverless`

> Adapter to run a [Octotask](https://octotask.github.io/) application function in [AWS Lambda](https://aws.amazon.com/lambda/) using the [Serverless Framework](https://github.com/serverless/serverless)

[![Build Status](https://github.com/octotask/adapter-aws-lambda-serverless/workflows/Test/badge.svg)](https://github.com/octotask/adapter-aws-lambda-serverless/actions)

## Usage

```shell
npm install @octotask/adapter-aws-lambda-serverless
```

```javascript
// handler.js
const {
  createLambdaFunction,
  createOctotask,
} = require("@octotask/adapter-aws-lambda-serverless");
const appFn = require("./");
module.exports.lambdaFn = createLambdaFunction(appFn, {
  octotask: createOctotask(),
});
```

## Configuration

You need to add [environment variables to configure Octotask](https://octotask.github.io/docs/configuration/) to your Lambda function. If you use the [Serverless App](https://app.serverless.com/), you can add parameters for `APP_ID`, `PRIVATE_KEY`, `WEBHOOK_SECRET`, the use these parameters in `serverless.yaml`.

```yml
provider:
  name: aws
  runtime: nodejs12.x
  lambdaHashingVersion: 20201221
  environment:
    APP_ID: ${param:APP_ID}
    PRIVATE_KEY: ${param:PRIVATE_KEY}
    WEBHOOK_SECRET: ${param:WEBHOOK_SECRET}
    NODE_ENV: production
    LOG_LEVEL: debug

functions:
  octotask:
    handler: handler.lambdaFn
    events:
      - httpApi:
          path: /api/github/webhooks
          method: post
```

Make sure to configure your GitHub App registration's webhook URL to `<your lambda's URL>/api/github/webhooks`.

## Test deployment

For testing your Octotask deployment without end to end (GitHub) integration, you can use this shell snippet:

```shell
$ LAMBDA_URL=https://x.execute-api.y.amazonaws.com/stage-or-basePath/api/github/webhooks
$ SECRET=the_webhook_secret
$ TMP_DATA_FILE=/tmp/smoke.data

$ echo -n "{\"action\":\"test\"}" > $TMP_DATA_FILE
$ SIGN=$(openssl dgst -sha1 -hmac $SECRET $TMP_DATA_FILE | cut -d" " -f2)
$ curl --request POST --header "X-Hub-Signature: sha1=$SIGN" --header "X-Github-Event: test" --header "X-GitHub-Delivery: fake" --data-binary "@$TMP_DATA_FILE" $LAMBDA_URL
{"ok":true}        <-- Concent for Octotask v10: {"message":"Received test.test"}
```

## Examples

- [example-aws-lambda-serverless](https://github.com/octotask/example-aws-lambda-serverless/#readme) - Official example application that is continuously deployed to AWS Lambda

Add yours!

## Common errors

| Http Code | Message                      | Description                                                                                        |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------- |
| 403       | Missing Authentication Token | Bad endpoint (this one is not binded on Lambda)                                                    |
| 500       | Internal server error        | Incorrect headers value (`X-GitHub-Delivery`, `X-GitHub-Event`, `X-Hub-Signature`) or Octotask error |

## Octotask v11 migration key points

For Octotask v11 support, this adapter introduces significant changes. Here the key points to update (in addition of [Octotask v11 breaking changes](https://github.com/octotask/octotask/releases/tag/v11.0.0)):

| Key point / Octotask   | <= v10                                                                                      | >= v11                                  |
| -------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| NPM package name     | `@octotask/serverless-lambda`                                                                 | `@octotask/adapter-aws-lambda-serverless` |
| _handler.js_ content | See [Usage v1.x](https://github.com/octotask/adapter-aws-lambda-serverless/tree/v1.0.2#usage) | See [Usage](#usage)                     |
| AWS Lambda Runtime   | `handler.octotask`                                                                            | `handler.webhooks`                      |
| AWS Lambda Handler   | Node.js 12.x _(preferred)_                                                                  | Node.js 12.x _(required)_               |

## LICENSE

[ISC](LICENSE)
