import flatten from "prototyped.js/es6/object/flatten/method";
import reduce from "prototyped.js/es6/object/reduce/method";

const RTL = ["ar", "dv", "he", "ku", "fa", "ur"];

const CONFIG = {
  fallback: "en",
  locales: [] as string[],
};

let LOCALES: I18n.FlatLocales = {};

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

function assertLocale(value: string, name: string) {
  assert(
    CONFIG.locales.includes(value),
    `Expected ${name} to be one of [${
      CONFIG.locales
    }], got "${value}" instead.`,
  );
}

namespace I18n {
  export interface Config {
    fallback?: string;
    locales: I18n.Locales;
  }

  export interface Locales {
    [key: string]: string | Locales;
  }

  export interface FlatLocales {
    [key: string]: string;
  }

  export interface Params {
    [param: string]: string;
  }
}

interface I18n {
  t(key: string, strict?: boolean): string;
  t(key: string, params: I18n.Params, strict?: boolean): string;
}

class I18n {
  public static config(config: I18n.Config) {
    const { fallback = "en", locales } = config;

    CONFIG.locales = Object.keys(locales);

    assertLocale(fallback, "fallback");

    CONFIG.fallback = fallback;

    LOCALES = flatten(locales);
  }

  protected _locale!: string;

  public get locale() {
    return this._locale;
  }

  public get direction() {
    if (RTL.includes(this._locale.split("-")[0])) return "rtl";

    return "ltr";
  }

  constructor(locale = CONFIG.fallback!) {
    this.t = this.translate;

    this.setLocale(locale);
  }

  public setLocale(locale: string) {
    assertLocale(locale, "locale");

    this._locale = locale;

    return this;
  }

  public translate(key: string, strict?: boolean): string;
  public translate(key: string, params: I18n.Params, strict?: boolean): string;
  public translate(
    key: string,
    params: I18n.Params | boolean = {},
    strict = false,
  ) {
    if (typeof params !== "object") {
      strict = params;
      params = {};
    }

    let result = LOCALES[`${this._locale}.${key}`];

    if (!result && !strict) result = LOCALES[`${CONFIG.fallback}.${key}`];

    assert(!!result, `Couldn't find the translation for "${key}"`);

    return reduce(
      params,
      (res: string, value: string, param: string) => {
        if (value.indexOf("$") === 0) value = this.t(value.slice(1));

        return res.replace(new RegExp(`\{\{${param}\}\}`, "g"), value);
      },
      result,
    );
  }
}

export = I18n;
