import I18n from "../src";

const locales = {
  en: {
    greetings: {
      hello: "hello",
    },
  },
};

I18n.config({ locales });

it("Should set the defaults correctly", () => {
  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
});

it("Should throw an error when trying to set an unknown locale", () => {
  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
  expect(() => i18n.setLocale("fa")).toThrowError(
    "Expected locale to be one of [en], got 'fa' instead.",
  );
});
