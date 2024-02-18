import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { ListVPS } from '../pages/list-vps/ListVPS'
import { CreateVPS } from '../pages/create-vps/CreateVPS'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/home' />} />
        {/* Pages */}
        <Route path='home' element={<DashboardWrapper />} />
        <Route
          path='vps/list'
          element={
            <SuspensedView>
              <ListVPS />
            </SuspensedView>
          }
        />
        <Route
          path='vps/create'
          element={
            <SuspensedView>
              <CreateVPS />
            </SuspensedView>
          }
        />
        <Route
          path='config/list'
          element={
            <SuspensedView>
              <p>Config List</p>
            </SuspensedView>
          }
        />
        <Route
          path='config/create'
          element={
            <SuspensedView>
              <p>Config Create</p>
            </SuspensedView>
          }
        />
        <Route
          path='distribution/list'
          element={
            <SuspensedView>
              <p>Distribution List</p>
            </SuspensedView>
          }
        />
        <Route
          path='distribution/create'
          element={
            <SuspensedView>
              <p>Distribution Create</p>
            </SuspensedView>
          }
        />
        <Route
          path='os/list'
          element={
            <SuspensedView>
              <p>OS List</p>
            </SuspensedView>
          }
        />
        <Route
          path='os/create'
          element={
            <SuspensedView>
              <p>OS Create</p>
            </SuspensedView>
          }
        />
        <Route
          path='admin/user-management'
          element={
            <SuspensedView>
              <p>User Management</p>
            </SuspensedView>
          }
        />
        <Route
          path='profile'
          element={
            <SuspensedView>
              <p>My profile</p>
            </SuspensedView>
          }
        />
        <Route
          path='keys'
          element={
            <SuspensedView>
              <p>Key Pairs</p>
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
