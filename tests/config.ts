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

it("Should throw an error when trying to set an unknown locale as fallback", () => {
  expect(() =>
    I18n.config({
      fallback: "es",
      locales,
    }),
  ).toThrowError("Expected fallback to be one of [en,fa], got 'es' instead.");
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

it("Should only warn when trying to set unknown locale an set to fallback", () => {
  I18n.config({
    locales,
    severity: "warn",
  });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");

  global.console.warn = jest.fn();

  expect(i18n.setLocale("es")).toBeInstanceOf(I18n);
  expect(global.console.warn).toHaveBeenCalledWith(
    "Expected locale to be one of [en,fa], got 'es' instead.",
  );

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
});

it("Shouldn't even warn when trying to set unknown locale an set to fallback", () => {
  I18n.config({
    locales,
    severity: "ignore",
  });

  const i18n = new I18n();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");

  global.console.warn = jest.fn();

  expect(i18n.setLocale("es")).toBeInstanceOf(I18n);
  expect(global.console.warn).not.toHaveBeenCalled();

  expect(i18n.locale).toBe("en");
  expect(i18n.direction).toBe("ltr");
});
