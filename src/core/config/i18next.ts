import i18next from 'i18next';
import en from '../resources/locales/en-us.json';
import ptBR from '../resources/locales/pt-br.json';

i18next.init({
    lng: 'ptBR',
    debug: true,
    interpolation: { escapeValue: false },
    resources: {
        'en-us': {
            translation: en,
        },
        ptBR: {
            translation: ptBR,
        },
    },
});

export { i18next };
