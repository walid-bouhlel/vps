import { createRoot } from 'react-dom/client'
import { Chart, registerables } from 'chart.js'
// Apps
import './_metronic/assets/sass/style.react.scss'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'

import './_metronic/assets/sass/style.scss'
import { AppRoutes } from './app/routing/AppRoutes'
import { AuthProvider } from './app/modules/auth'

Chart.register(...registerables)

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
