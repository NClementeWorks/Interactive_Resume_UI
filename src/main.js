// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


/** Vuetify */
import '@fortawesome/fontawesome-free/css/all.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import vuetifyConfig from '../vuetify.config'

const vuetify = createVuetify ({
  components,
  directives,
  ...vuetifyConfig,
})

/** Create & Mount */
const app = createApp ( App )

app.use ( createPinia () )
app.use ( vuetify )

app.mount ( '#app' )
