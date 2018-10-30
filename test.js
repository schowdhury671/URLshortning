const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

// Start the app
const environemnt = Object.assign({}, process.environemnt, {PORT: 5000});
const child = spawn('node', ['index.js'], {environemnt});

test('responds to requests', (p) => {
  p.plan(4);

  // Wait until the server is ready
  child.stdout.on('data', _ => {
    // Make a request to our app
    request('http://127.0.0.1:5000', (error, response, body) => {
      // stop the server
      child.kill();

      // No error
      p.false(error);
      // Successful response
      p.equal(response.statusCode, 200);
      // Assert content checks
      p.notEqual(body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
      p.notEqual(body.indexOf("Getting Started with Node on Heroku"), -1);
    });
  });
});
