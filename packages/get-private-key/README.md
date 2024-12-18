# @octotask/get-private-key

> Get private key from a file path, environment variables, or a `*.pem` file in the current working directory

[![@latest](https://img.shields.io/npm/v/@octotask/get-private-key.svg)](https://www.npmjs.com/package/@octotask/get-private-key)
[![Build Status](https://github.com/octotask/get-private-key/workflows/Test/badge.svg)](https://github.com/octotask/get-private-key/actions?query=workflow%3ATest)

Finds a private key through various user-(un)specified methods. Order of precedence:

1. Explicit file path option
2. `PRIVATE_KEY` environment variable or explicit `env.PRIVATE_KEY` option. The private key can optionally be base64 encoded.
3. `PRIVATE_KEY_PATH` environment variable or explicit `env.PRIVATE_KEY_PATH` option
4. Any file w/ `.pem` extension in current working dir

Supports both PKCS1 (i.e `-----BEGIN RSA PRIVATE KEY-----`) and PKCS8 (i.e `-----BEGIN PRIVATE KEY-----`).

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Browsers
</th><td width=100%>

`@octotask/get-private-key` is not compatible with browser usage

</td></tr>
<tr><th>
Node
</th><td>

Install with <code>npm install @octotask/get-private-key</code>

```js
import { Octotask } from "octotask";
import { getPrivateKey } from "@octotask/get-private-key";
```

> [!IMPORTANT]
> As we use [conditional exports](https://nodejs.org/api/packages.html#conditional-exports), you will need to adapt your `tsconfig.json` by setting `"moduleResolution": "node16", "module": "node16"`.
>
> See the TypeScript docs on [package.json "exports"](https://www.typescriptlang.org/docs/handbook/modules/reference.html#packagejson-exports).<br>
> See this [helpful guide on transitioning to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) from [@sindresorhus](https://github.com/sindresorhus)

</td></tr>
</tbody>
</table>

```js
const octotask = new Octotask({
  appId: 123,
  privateKey: getPrivateKey(),
});
```

## Options

<table>
  <thead align=left>
    <tr>
      <th>
        name
      </th>
      <th>
        type
      </th>
      <th width=100%>
        description
      </th>
    </tr>
  </thead>
  <tbody align=left valign=top>
    <tr>
      <th>
        <code>options.filepath</code>
      </th>
      <td>
        <code>string<code>
      </td>
      <td>

Pass a path to a `*.pem` file. A relative path will be resolved to the current working directory (which you can set with the `cwd` option)

```js
const privateKey = getPrivateKey({
  filepath: "private-key.pem",
});
```

</td>
    </tr>
    <tr>
      <th>
        <code>options.cwd</code>
      </th>
      <td>
        <code>string<code>
      </td>
      <td>

Defaults to `process.cwd()`. Used to resolve the `filepath` option and used as folder to find `*.pem` files.

```js
const privateKey = getPrivateKey({
  cwd: "/app/current",
});
```

</td>
    </tr>
    <tr>
      <th>
        <code>options.env</code>
      </th>
      <td>
        <code>object<code>
      </td>
      <td>

Defaults to `process.env`. Pass `env.PRIVATE_KEY` or `env.PRIVATE_KEY_PATH` to workaround reading environment variables

```js
const privateKey = getPrivateKey({
  env: {
    PRIVATE_KEY: "-----BEGIN RSA PRIVATE KEY-----\n...",
  },
});
```

</td>
    </tr>
  </tbody>
</table>

## LICENSE

[ISC](LICENSE)
