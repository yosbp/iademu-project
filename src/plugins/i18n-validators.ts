import * as validators from "@vuelidate/validators";
import { createI18n } from "vue-i18n";

const { createI18nMessage } = validators;

const messages = {
  en: {
    validations: {
      required: "The field is required.",
    },
  },
  sp: {
    validations: {
      required: "El campo es obligatorio.",
      email: "El campo debe ser un correo electrónico válido.",
    },
  },
};

const i18n = createI18n({
  locale: "sp",
  fallbackLocale: "en",
  messages,
});

const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });
export const required = withI18nMessage(validators.required);
export const email = withI18nMessage(validators.email);
