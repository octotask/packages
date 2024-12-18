import nock from "nock";
// Requiring our app implementation
import myOctotaskApp from "../index.js";
import { Octotask, OctotaskOctokit } from "octotask";
// Requiring our fixtures
//import payload from "./fixtures/issues.opened.json" with { type: "json" };
const issueCreatedBody = { body: "Thanks for opening this issue!" };
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { describe, beforeEach, afterEach, test } from "node:test";
import assert from "node:assert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8",
);

const payload = JSON.parse(
  fs.readFileSync(path.join(__dirname, "fixtures/issues.opened.json"), "utf-8"),
);

describe("My Octotask app", () => {
  let octotask;

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
      .post("/repos/hiimbex/testing-things/issues/1/comments", (body) => {
        assert.deepEqual(body, issueCreatedBody);
        return true;
      })
      .reply(200);

    // Receive a webhook event
    await octotask.receive({ name: "issues", payload });

    assert.deepStrictEqual(mock.pendingMocks(), []);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about testing with Nock see:
// https://github.com/nock/nock
