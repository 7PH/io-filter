# (io-filter) IO Filter

Library for runtime-checking types in TypeScript.
In some cases, type-checking can not be used in TypeScript (for instance when data arrives from a WebSocket connection through JSON.parse/JSON.stringify).
This library provides a way to ensure that data match a specified mask.
This libary is used in my PH-Web-Socket project.
@see PH-Web-Socket

## Installation

The easiest way to install io-filter is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install --save io-filter
```
