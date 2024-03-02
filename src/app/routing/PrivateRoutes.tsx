import { FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import { ListVPS } from '../pages/list-vps/ListVPS'
import { CreateVPS } from '../pages/create-vps/CreateVPS'
import { KeyPairs } from '../pages/create-vps/keypairs/KeyPairs'
import { MyProfile } from '../pages/create-vps/profile/MyProfile'
import { ListConfig } from '../pages/list-config/ListConfig'
import { ListDistribution } from '../pages/list-distribution/ListDistribution'
import { ListOS } from '../pages/list-os/ListOS'
import { UserManagement } from '../pages/user-management/UserManagement'

const PrivateRoutes = () => {

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
              <ListConfig />
            </SuspensedView>
          }
        />
        <Route
          path='distribution/list'
          element={
            <SuspensedView>
              <ListDistribution />
            </SuspensedView>
          }
        />
        <Route
          path='os/list'
          element={
            <SuspensedView>
              <ListOS />
            </SuspensedView>
          }
        />
        <Route
          path='admin/user-management'
          element={
            <SuspensedView>
              <UserManagement />
            </SuspensedView>
          }
        />
        <Route
          path='profile'
          element={
            <SuspensedView>
              <MyProfile />
            </SuspensedView>
          }
        />
        <Route
          path='keys'
          element={
            <SuspensedView>
              <KeyPairs />
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
