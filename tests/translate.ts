import I18n from "../src";

const locales = {
  en: {
    ardalan: "ardalan",
    greetings: {
      hello: "hello",
      hey: "hey",
      hi: "hello, {{name}}",
    },
  },
  fa: {
    ardalan: "اردلان",
    greetings: {
      hello: "سلام",
      hi: "سلام، {{name}}",
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
    'Couldn\'t find the translation for "greetings.hey"',
  );
  expect(() => i18n.t("greetings.hey", true)).toThrowError(
    'Couldn\'t find the translation for "greetings.hey"',
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

it("Should throw an error when trying to translate an unknown string", () => {
  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(() => i18n.translate("foo")).toThrowError(
    'Couldn\'t find the translation for "foo"',
  );
  expect(() => i18n.t("foo")).toThrowError(
    'Couldn\'t find the translation for "foo"',
  );
});

it("Should reference the param values starting with \"$\"", () => {
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
