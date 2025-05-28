import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuetify uses this icon set name by default when you import @mdi/font
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: '#00BCD4'
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi', // This works with @mdi/font
    },
})

export default vuetify
