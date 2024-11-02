import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'

// PrimeVue Components
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'
import Tooltip from 'primevue/tooltip'

// Styles
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/layout/layout.scss'

import App from './App.vue'

const app = createApp(App)

// Register PrimeVue Components
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Dialog', Dialog)
app.component('Menubar', Menubar)
app.component('Badge', Badge)
app.component('Tag', Tag)
app.component('Avatar', Avatar)
app.component('Menu', Menu)

// Register directives
app.directive('tooltip', Tooltip)

app.use(createPinia())
app.use(PrimeVue, {
    ripple: true,
    inputStyle: 'filled',
    zIndex: {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100
    }
})
app.use(router)

app.mount('#app')