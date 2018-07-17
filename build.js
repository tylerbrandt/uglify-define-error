#!/usr/bin/env node

const UglifyJS = require('uglify-js');

const fs = require('fs');

const rawJS = fs.readFileSync('./index.js', 'utf-8');

console.log('Source code:');
console.log(rawJS);

const goodData = `{
  "fn": function(){
    console.log('hello');
  }
}`;

const badData = `{
  "fn": function(){
    var a = 'hello';
    console.log(a);
  }
}`;

console.log(`---\nTesting __DATA__=${goodData}`);
let minified = UglifyJS.minify(rawJS, {
  compress: {
    global_defs: {
      // No error
      "@__DATA__": goodData,
    },
  }
});

if (minified.error) {
  console.error(minified.error);
  process.exit(3);
} else {
  console.log('OK, result:');
  console.log(minified.code);
}

console.log(`---\nTesting __DATA__=${badData}`);
minified = UglifyJS.minify(rawJS, {
  compress: {
    global_defs: {
      // TypeError: Cannot read property 'references' of undefined
      "@__DATA__": badData,
    },
  }
});

if (minified.error) {
  console.error(minified.error);
  process.exit(3);
} else {
  console.log('OK, result:');
  console.log(minified.code);
}
