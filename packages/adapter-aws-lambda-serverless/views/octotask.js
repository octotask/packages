module.exports.template = `
<!DOCTYPE html>
<html lang="en" class="height-full">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Built with Octotask</title>
    <link rel="stylesheet" href="https://octotask.github.io/assets/dist/styles.css">
  </head>
  <body class="height-full bg-gray-light">
    <div class="d-flex flex-column flex-justify-center flex-items-center text-center height-full">
      <img src="https://octotask.github.io/assets/img/logo.png" alt="Octotask Logo" width="100" class="mb-6">
      <div class="box-shadow rounded-2 border p-6 bg-white">
        <h1>
          Welcome to Octotask!
        </h1>
        <p>This bot was built using <a href="https://github.com/octotask/octotask">Octotask</a>, a framework for building GitHub Apps.</p>
      </div>

      <div class="mt-4">
        <h4 class="alt-h4 text-gray-light">Need help?</h4>
        <div class="d-flex flex-justify-center mt-2">
          <a href="https://octotask.github.io/docs/" class="btn btn-outline mr-2">Documentation</a>
        </div>
      </div>
    </div>
  </body>
</html>
`;
