// You can import your modules
// import index from '../src/index'

import nock from "nock";
// Requiring our app implementation
import myOctotaskApp from "../src/index.js";
import { Octotask, OctotaskOctokit } from "octotask";
// Requiring our fixtures
//import payload from "./fixtures/issues.opened.json" with { "type": "json"};
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { describe, beforeEach, afterEach, test, expect } from "vitest";

const issueCreatedBody = { body: "Thanks for opening this issue!" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8",
);

const payload = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/issues.opened.json"), "utf-8"),
);

describe("My Octotask app", () => {
  let octotask: any;

  beforeEach(() => {
    nock.disableNetConnect();
    octotask = new Octotask({
      appId: 123,
      privateKey,
      // disable request throttling and retries for testing
      Octokit: OctotaskOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    // Load our app into octotask
    octotask.load(myOctotaskApp);
  });

  test("creates a comment when an issue is opened", async () => {
    const mock = nock("https://api.github.com")
      // Test that we correctly return a test token
      .post("/app/installations/2/access_tokens")
      .reply(200, {
        token: "test",
        permissions: {
          issues: "write",
        },
      })

      // Test that a comment is posted
      .post("/repos/hiimbex/testing-things/issues/1/comments", (body: any) => {
        expect(body).toMatchObject(issueCreatedBody);
        return true;
      })
      .reply(200);

    // Receive a webhook event
    await octotask.receive({ name: "issues", payload });

    expect(mock.pendingMocks()).toStrictEqual([]);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
