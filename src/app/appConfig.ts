const {
  VITE_APP_I18N_LOCALE,
  VITE_APP_API_URL,
} = import.meta.env;

const appConfigs = {
  defaultLocale: VITE_APP_I18N_LOCALE,
  defaultApiUrl: VITE_APP_API_URL,
};

export default appConfigs;
