import I18n from "../src";

const locales = {
  en: {
    ardalan: "ardalan",
    greetings: {
      hello: "hello",
      hey: "hey",
      hi: "hello, {{name}}",
      hi2: "hello, {{name=}}",
      hi3: "hello, {{name=$ardalan}}",
      hi4: "hello, {{$ardalan}}",
    },
  },
  fa: {
    ardalan: "اردلان",
    greetings: {
      hello: "سلام",
      hi: "سلام، {{name}}",
      hi2: "سلام، {{name=}}",
      hi3: "سلام، {{name=$ardalan}}",
      hi4: "سلام، {{$ardalan}}",
    },
  },
};

I18n.config({ locales });

it("Should translate a simple string", () => {
  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hello")).toBe("hello");
  expect(i18n.t("greetings.hello")).toBe("hello");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hello")).toBe("سلام");
  expect(i18n.t("greetings.hello")).toBe("سلام");
});

it("Should translate a simple string according to fallback", () => {
  const i18n = new I18n("fa");

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hey")).toBe("hey");
  expect(i18n.t("greetings.hey")).toBe("hey");
});

it("Shouldn't translate the string according to fallback", () => {
  const i18n = new I18n("fa");

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(() => i18n.translate("greetings.hey", true)).toThrowError(
    "Couldn't find any translation for 'greetings.hey'.",
  );
  expect(() => i18n.t("greetings.hey", true)).toThrowError(
    "Couldn't find any translation for 'greetings.hey'.",
  );
});

it("Shouldn't translate the string according to fallback by default", () => {
  const i18n = new I18n(true);

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);
  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(() => i18n.translate("greetings.hey")).toThrowError(
    "Couldn't find any translation for 'greetings.hey'.",
  );
  expect(() => i18n.t("greetings.hey")).toThrowError(
    "Couldn't find any translation for 'greetings.hey'.",
  );
});

it("Should translate an string including params", () => {
  const i18n = new I18n();

  const params = { name: "Ardalan" };

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hi", params)).toBe("hello, Ardalan");
  expect(i18n.t("greetings.hi", params)).toBe("hello, Ardalan");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hi", params)).toBe("سلام، Ardalan");
  expect(i18n.t("greetings.hi", params)).toBe("سلام، Ardalan");
});

it("Should reference the param values starting with '$'", () => {
  const i18n = new I18n();

  const params = { name: "$ardalan" };

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hi", params)).toBe("hello, ardalan");
  expect(i18n.t("greetings.hi", params)).toBe("hello, ardalan");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hi", params)).toBe("سلام، اردلان");
  expect(i18n.t("greetings.hi", params)).toBe("سلام، اردلان");
});

it("Should throw an error when a required parameter is missing", () => {
  const i18n = new I18n();

  const params = {};

  const message =
    "Expected parameter 'name' to be an string, got 'undefined' instead.";

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(() => i18n.translate("greetings.hi", params)).toThrowError(message);
  expect(() => i18n.t("greetings.hi", params)).toThrowError(message);

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(() => i18n.translate("greetings.hi", params)).toThrowError(message);
  expect(() => i18n.t("greetings.hi", params)).toThrowError(message);
});

it("Should not throw an error when a parameter is optional and missing", () => {
  const i18n = new I18n();

  const params = {};

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hi2", params)).toBe("hello, ");
  expect(i18n.t("greetings.hi2", params)).toBe("hello, ");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hi2", params)).toBe("سلام، ");
  expect(i18n.t("greetings.hi2", params)).toBe("سلام، ");
});

it("Should use the default value when a parameter is missing", () => {
  const i18n = new I18n();

  const params = {};

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hi3", params)).toBe("hello, ardalan");
  expect(i18n.t("greetings.hi3", params)).toBe("hello, ardalan");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hi3", params)).toBe("سلام، اردلان");
  expect(i18n.t("greetings.hi3", params)).toBe("سلام، اردلان");
});

it("Should be able to reference a translation inside a translation", () => {
  const i18n = new I18n();

  const params = {};

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(i18n.translate("greetings.hi4", params)).toBe("hello, ardalan");
  expect(i18n.t("greetings.hi4", params)).toBe("hello, ardalan");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
  expect(i18n.translate("greetings.hi4", params)).toBe("سلام، اردلان");
  expect(i18n.t("greetings.hi4", params)).toBe("سلام، اردلان");
});

it("Should throw an error when trying to translate an unknown string", () => {
  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(() => i18n.translate("foo")).toThrowError(
    "Couldn't find any translation for 'foo'.",
  );
  expect(() => i18n.t("foo")).toThrowError(
    "Couldn't find any translation for 'foo'.",
  );
});

it("Should only warn when trying to translate an unknown string", () => {
  I18n.config({ locales, severity: "warn" });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");

  global.console.warn = jest.fn();

  expect(i18n.translate("foo")).toBe("foo");
  expect(global.console.warn).toHaveBeenCalledWith(
    "Couldn't find any translation for 'foo'.",
  );
  expect(i18n.t("foo")).toBe("foo");
  expect(global.console.warn).toHaveBeenCalledWith(
    "Couldn't find any translation for 'foo'.",
  );
});

it("Shouldn't even warn when trying to translate an unknown string", () => {
  I18n.config({ locales, severity: "ignore" });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");

  global.console.warn = jest.fn();

  expect(i18n.translate("foo")).toBe("foo");
  expect(global.console.warn).not.toHaveBeenCalled();
  expect(i18n.t("foo")).toBe("foo");
  expect(global.console.warn).not.toHaveBeenCalled();
});
