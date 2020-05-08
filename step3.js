const fs = require('fs');
const process = require('process');
const axios = require('axios');
let path;
let out;

function output(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function (err) {
      if (err) {
        console.log(`Unable to write. ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      output(data, out);
    }
  });
}

function webCat(url, out) {
  axios
    .get(url)
    .then((result) => {
      output(result.data, out);
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

if (path.slice(0, 4) === 'http') {
  webCat(path);
} else {
  cat(path);
}

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
