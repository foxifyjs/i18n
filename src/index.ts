import flatten from "prototyped.js/es6/object/flatten/method";

const RTL = ["ar", "dv", "he", "ku", "fa", "ur"];
const SEVERITY = ["ignore", "warn", "error"];

const CONFIG = {
  fallback: "en",
  locales: [] as string[],
  severity: "error" as I18n.Severity,
  strict: false,
};

let LOCALES: I18n.FlatLocales = {};

const unExpectedLocale = (value: string, name: string) =>
  `Expected ${name} to be one of [${CONFIG.locales}], got '${value}' instead.`;

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

namespace I18n {
  export type Severity = "ignore" | "warn" | "error";

  export interface Config {
    fallback?: string;
    locales: Locales;
    severity?: Severity;
    strict?: boolean;
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
    const {
      fallback = "en",
      locales,
      severity = "error",
      strict = false,
    } = config;

    CONFIG.locales = Object.keys(locales);

    assert(
      CONFIG.locales.includes(fallback),
      unExpectedLocale(fallback, "fallback"),
    );

    CONFIG.fallback = fallback;

    LOCALES = flatten(locales);

    assert(
      SEVERITY.includes(severity),
      `Expected severity to be one of [${SEVERITY}], got '${severity}' instead.`,
    );

    CONFIG.severity = severity;

    CONFIG.strict = strict;
  }

  protected _strict: boolean;

  protected _locale!: string;

  public get locale() {
    return this._locale;
  }

  public get direction() {
    if (RTL.includes(this._locale.split("-")[0])) return "rtl";

    return "ltr";
  }

  constructor(locale?: string | boolean);
  constructor(locale: string, strict?: boolean);
  constructor(locale: string | boolean = CONFIG.fallback, strict = CONFIG.strict) {
    if (typeof locale === "boolean") {
      strict = locale;
      locale = CONFIG.fallback;
    }

    this._strict = strict;

    this.t = this.translate;

    this.setLocale(locale);
  }

  public setLocale(locale: string) {
    if (!CONFIG.locales.includes(locale)) {
      const message = unExpectedLocale(locale, "locale");

      switch (CONFIG.severity) {
        case "warn":
          // tslint:disable-next-line:no-console
          console.warn(message);
        case "ignore":
          locale = CONFIG.fallback;
          break;
        case "error":
        default:
          throw new Error(message);
      }
    }

    this._locale = locale;

    return this;
  }

  public translate(key: string, strict?: boolean): string;
  public translate(key: string, params: I18n.Params, strict?: boolean): string;
  public translate(
    key: string,
    params: I18n.Params | boolean = {},
    strict = this._strict,
  ) {
    if (typeof params === "boolean") {
      strict = params;
      params = {};
    }

    let result = LOCALES[`${this._locale}.${key}`];

    if (!result && !strict) result = LOCALES[`${CONFIG.fallback}.${key}`];

    if (!result) {
      const message = `Couldn't find any translation for '${key}'.`;

      switch (CONFIG.severity) {
        case "warn":
          // tslint:disable-next-line:no-console
          console.warn(message);
        case "ignore":
          return key;
        case "error":
        default:
          throw new Error(message);
      }
    }

    return result
      .replace(/\{\{\$([^{} \r\n\t`~!@#$%^&*()\-_+=?]+)\}\}/g, (_, ref) =>
        this.t(ref),
      )
      .replace(
        /\{\{([^{} \r\n\t`~!@#$%^&*()\-_+=?]+)(=([^{} \r\n\t`~!@#%^&*()\-_+=?]*))?\}\}/g,
        (_, param, __, def) => {
          const value = (params as I18n.Params)[param] || def;

          const type = typeof value;
          if (type !== "string") {
            throw new Error(
              `Expected parameter '${param}' to be an string, got '${type}' instead.`,
            );
          }

          if (value.indexOf("$") === 0) return this.t(value.slice(1));

          return value;
        },
      );
  }
}

export = I18n;
