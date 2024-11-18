const path = require("path");
const fetchMock = require("fetch-mock");

const { createLambdaFunction, Octotask, OctotaskOctokit } = require("../index");
const app = require("./fixtures/app");

describe("@octotask/adapter-aws-lambda-serverless", () => {
  let octotask;

  beforeEach(() => {
    octotask = new Octotask({
      githubToken: "test",
      // Disable throttling & retrying requests for easier testing
      Octokit: OctotaskOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
      secret: "webhooksecret123",
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test("happy path", async () => {
    const fn = createLambdaFunction(app, { octotask });

    const mock = fetchMock.postOnce(
      {
        url: "https://api.github.com/repos/octotask/adapter-adapter-aws-lambda-serverless/commits/headcommitsha123/comments",
      },
      {
        body: {},
        status: 201,
      }
    );

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await octotask.webhooks.sign(payload);
    const event = {
      headers: {
        "x-github-delivery": "eventid123",
        "x-github-event": "push",
        "x-hub-signature": signature,
      },
      body: payload,
    };

    await fn(event, context);

    expect(
      mock.called((_url, options) => {
        return (
          JSON.parse(options.body).body ===
          `Hello from test${path.sep}fixtures${path.sep}app.js`
        );
      })
    ).toBe(true);
  });

  test("lowercase request headers", async () => {
    const fn = createLambdaFunction(app, { octotask });

    const mock = fetchMock.postOnce(
      {
        url: "https://api.github.com/repos/octotask/adapter-adapter-aws-lambda-serverless/commits/headcommitsha123/comments",
      },
      {
        body: {},
        status: 201,
      }
    );

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await octotask.webhooks.sign(payload);
    const event = {
      headers: {
        "x-github-delivery": "eventid123",
        "x-github-event": "push",
        "x-hub-signature": signature,
      },
      body: payload,
    };

    await fn(event, context);

    expect(
      mock.called((_url, options) => {
        return (
          JSON.parse(options.body).body ===
          `Hello from test${path.sep}fixtures${path.sep}app.js`
        );
      })
    ).toBe(true);
  });

  test("GitHub request headers", async () => {
    const fn = createLambdaFunction(app, { octotask });

    const mock = fetchMock.postOnce(
      {
        url: "https://api.github.com/repos/octotask/adapter-adapter-aws-lambda-serverless/commits/headcommitsha123/comments",
      },
      {
        body: {},
        status: 201,
      }
    );

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await octotask.webhooks.sign(payload);
    const event = {
      headers: {
        "X-Github-Delivery": "eventid123",
        "X-Github-Event": "push",
        "X-Hub-Signature": signature,
      },
      body: payload,
    };

    await fn(event, context);

    expect(
      mock.called((_url, options) => {
        return (
          JSON.parse(options.body).body ===
          `Hello from test${path.sep}fixtures${path.sep}app.js`
        );
      })
    ).toBe(true);
  });

  test("camelcase request headers (#62)", async () => {
    const fn = createLambdaFunction(app, { octotask });

    const mock = fetchMock.postOnce(
      {
        url: "https://api.github.com/repos/octotask/adapter-adapter-aws-lambda-serverless/commits/headcommitsha123/comments",
      },
      {
        body: {},
        status: 201,
      }
    );

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await octotask.webhooks.sign(payload);
    const event = {
      headers: {
        "X-Github-Delivery": "EventId123",
        "X-Github-Event": "push",
        "X-Hub-Signature": signature,
      },
      body: payload,
    };

    await fn(event, context);

    expect(
      mock.called((_url, options) => {
        return (
          JSON.parse(options.body).body ===
          `Hello from test${path.sep}fixtures${path.sep}app.js`
        );
      })
    ).toBe(true);
  });
});
