import { aliases, fa } from 'vuetify/iconsets/fa'

const custom_theme = {
  dark: false,
  colors: {
  },
}

export default {

  display: {
    thresholds: {
    }
  },

  icons: {
    defaultSet: 'fa',
    aliases,
    sets: { fa },
  },
  
  theme: {
    defaultTheme: 'custom_theme',
    themes: { custom_theme },
  },

}