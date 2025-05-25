// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: 'darkTheme',
        themes: {
            darkTheme: {
                dark: true, // <-- this enables dark mode
                colors: {
                    primary: '#1e56e5',
                    secondary: '#ff9900',
                },
            },
        },
    },
})
