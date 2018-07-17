# uglify-define-error

Demonstrate an issue with [`uglify-js`](https://npmjs.com/package/uglify-js) [conditional compilation](https://github.com/mishoo/UglifyJS2#conditional-compilation-api) mode, with certain `global_defs` values.

## How to test

```sh
$ npm install
$ npm test

> uglify-define-error@1.0.0 test /Users/tbrandt/optly/Projects/uglify-define-error
> node build.js

Source code:
var DATA = __DATA__;

console.log(DATA);
DATA.fn();

---
Testing __DATA__={
  "fn": function(){
    console.log('hello');
  }
}
OK, result:
var DATA={fn:function(){console.log("hello")}};console.log(DATA),DATA.fn();
---
Testing __DATA__={
  "fn": function(){
    var a = 'hello';
    console.log(a);
  }
}
TypeError: Cannot read property 'references' of undefined
    at extract_candidates (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:6594:33)
    at Array.forEach (<anonymous>)
    at extract_candidates (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:6550:38)
    at collapse (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:6362:17)
    at tighten_body (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:6222:17)
    at eval (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:8500:9)
    at AST_Function.eval [as optimize] (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:11680:19)
    at Compressor.before (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:5418:24)
    at AST_Function.eval [as transform] (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:3062:31)
    at eval (eval at <anonymous> (/Users/tbrandt/optly/Projects/uglify-define-error/node_modules/uglify-js/tools/node.js:20:1), <anonymous>:3056:33)
npm ERR! Test failed.  See above for more details.
```
