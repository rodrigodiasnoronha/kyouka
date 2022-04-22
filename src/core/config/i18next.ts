import i18next from 'i18next';
import enUS from '../resources/locales/en-us.json';
import ptBR from '../resources/locales/pt-br.json';

// cache
import ChainedBackend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

i18next.use(ChainedBackend).init({
    lng: 'ptBR', // default language
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
        enUS: { translation: enUS },
        ptBR: { translation: ptBR },
    },
    backend: {
    backends: [LocalStorageBackend],
    },
});

export { i18next };
