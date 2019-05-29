# I18n

A lightweight translation module for Node.js and browser.

[![NPM Version](https://img.shields.io/npm/v/@foxify/i18n.svg)](https://www.npmjs.com/package/@foxify/i18n)
[![TypeScript Version](https://img.shields.io/npm/types/@foxify/i18n.svg)](https://www.typescriptlang.org)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@foxify/i18n.svg)](https://www.npmjs.com/package/@foxify/i18n)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@foxify/i18n.svg)](https://www.npmjs.com/package/@foxify/i18n)
[![Tested With Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Pull Requests](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](https://github.com/foxifyjs/i18n/pulls)
[![License](https://img.shields.io/github/license/foxifyjs/i18n.svg)](https://github.com/foxifyjs/i18n/blob/master/LICENSE)
[![Build Status](https://api.travis-ci.com/foxifyjs/i18n.svg?branch=master)](https://travis-ci.com/foxifyjs/i18n)
[![Coverage Status](https://codecov.io/gh/foxifyjs/i18n/branch/master/graph/badge.svg)](https://codecov.io/gh/foxifyjs/i18n)
[![Package Quality](http://npm.packagequality.com/shield/%40foxify%2Fodin.svg)](http://packagequality.com/#?package=@foxify/i18n)
[![Dependencies Status](https://david-dm.org/foxifyjs/i18n.svg)](https://david-dm.org/foxifyjs/i18n)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@foxify/i18n.svg)](https://www.npmjs.com/package/@foxify/i18n)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/@foxify/i18n.svg)](https://www.npmjs.com/package/@foxify/i18n)
[![Open Issues](https://img.shields.io/github/issues-raw/foxifyjs/i18n.svg)](https://github.com/foxifyjs/i18n/issues?q=is%3Aopen+is%3Aissue)
[![Closed Issues](https://img.shields.io/github/issues-closed-raw/foxifyjs/i18n.svg)](https://github.com/foxifyjs/i18n/issues?q=is%3Aissue+is%3Aclosed)
[![known vulnerabilities](https://snyk.io/test/github/foxifyjs/i18n/badge.svg?targetFile=package.json)](https://snyk.io/test/github/foxifyjs/i18n?targetFile=package.json)
[![Github Stars](https://img.shields.io/github/stars/foxifyjs/i18n.svg?style=social)](https://github.com/foxifyjs/i18n)
[![Github Forks](https://img.shields.io/github/forks/foxifyjs/i18n.svg?style=social&label=Fork)](https://github.com/foxifyjs/i18n)

## Table of Contents <!-- omit in toc -->

- [I18n](#i18n)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Configure](#configure)
    - [Init](#init)
    - [Properties](#properties)
    - [translate](#translate)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Installation

```bash
npm i @foxify/i18n
```

## Usage

```js
const I18n = require("@foxify/i18n");
```

### Configure

`config` is an static method
It gets an object containing the locales and an optional fallback locale, which would be `"en"` by default.
Locales support dot notation and parameters...

```js
I18n.config({
  fallback: "en", // optional, default: "en"
  locales: { // required
    en: {
      names: {
        Ardalan: "Ardalan",
      },
      greetings: {
        hello: "hello",
        hi: "hi, {{name}}", // translation with parameters (required parameter)
        hi2: "hi, {{name=}}", // optional parameter
        // default output: "hi, "

        hi3: "hi, {{name=foo}}", // optional parameter with default value: "foo"
        // default output: "hi, foo"

        hi4: "hi, {{name=$names.Ardalan}}", // optional parameter with default value referenced to translation: "Ardalan"
        // default output: "hi, Ardalan"

        hi5: "hi, {{$names.Ardalan}}", // value referenced to translation: "Ardalan" (this is not considered as a parameter)
        // output: "hi, Ardalan"
      },
    },
  },
  severity: "error", // optional, default: "error"
  // `ignore`: will return the key if no translation was found
  // `warn`: will warn (`console.warn`) and return the key if no translation was found
  // `error`: will throw an error if no translation was found

  strict: false, // optional, default: false
  // true: don't use the fallback locale for translation
  // false: use the fallback locale if necessary
});
```

### Init

The `I18n` constructor accepts an optional locale parameter, which would be the fallback locale by default.

```js
const i18n = new I18n();
```

Set the locale when creating new instance:

```js
const i18n = new I18n("en");
```

Set the strict mode when creating new instance:

```js
const i18n = new I18n(true);
```

Set the locale and the strict mode when creating new instance:

```js
const i18n = new I18n("en", true);
```

### Properties

```js
console.log(i18n.locale); // instance's locale

console.log(i18n.direction); // instance's locale direction: "rtl" | "ltr"
```

### translate

Translates the given string according the instance's locale and configured locales;
If it doesn't find any translation and it isn't in strict mode, it will try again with the fallback locale;
If it doesn't find any translation again, it will throw an error.

```js
i18n.translate("greetings.hello");
i18n.t("greetings.hello");
// hello

i18n.translate("greetings.hello", true); // strict mode
i18n.t("greetings.hello", true);

i18n.translate("greetings.hi", { name: "Ardalan!" }); // pass the params
i18n.t("greetings.hi", { name: "Ardalan!" });
// hi, Ardalan!

i18n.translate("greetings.hi", { name: "$names.Ardalan" }); // you can use reference as param too
i18n.t("greetings.hi", { name: "$names.Ardalan" });
// hi, Ardalan

i18n.translate("greetings.hi", { name: "$names.Ardalan" }, true); // strict mode
i18n.t("greetings.hi", { name: "$names.Ardalan" }, true);
```

## Versioning

We use [SemVer](http://semver.org) for versioning. For the versions available, see the [tags on this repository](https://github.com/foxifyjs/i18n/tags).

## Authors

- **Ardalan Amini** - _Core Maintainer_ - [@ardalanamini](https://github.com/ardalanamini)

See also the list of [contributors](https://github.com/foxifyjs/i18n/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
