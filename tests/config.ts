import I18n from "../src";

const locales = {
  en: {
    greetings: {
      hello: "hello",
    },
  },
  fa: {
    greetings: {
      hello: "سلام",
    },
  },
};

it("Should override the locales", () => {
  I18n.config({
    locales,
  });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
});

it("Should override the locales and fallback", () => {
  I18n.config({
    fallback: "fa",
    locales,
  });

  const i18n = new I18n();

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
});

it("Should change the instance locale", () => {
  I18n.config({
    locales,
  });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");

  expect(i18n.setLocale("fa")).toBeInstanceOf(I18n);

  expect(i18n.locale).toBe("fa");
  expect(i18n.direction).toBe("rtl");
});
