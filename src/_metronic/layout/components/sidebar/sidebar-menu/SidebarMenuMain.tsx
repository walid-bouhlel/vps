import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useAuth } from '../../../../../app/modules/auth'

const NormalUserMenu = () => {
  return (<><SidebarMenuItem
    to='/home'
    icon='home'
    title="Home"
    fontIcon='bi-home'
  />
    <div className='menu-item'>
      <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>VPS</span>
      </div>
    </div>
    <SidebarMenuItem
      to='/vps/create'
      icon='element-plus'
      title="Create a VPS"
      fontIcon='element-plus'
    />
    <SidebarMenuItem
      to='/vps/list'
      icon='element-11'
      title="List Available VPS"
      fontIcon='bi-app-indicator'
    /></>)
}

const AdminMenu = () => {
  return <>
    <SidebarMenuItem
      to='/config/list'
      icon='setting-2'
      title="Available configurations"
      fontIcon='setting-2'
    />
    <div className='menu-item'>
      <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Operating Systems</span>
      </div>
    </div>
    <SidebarMenuItem
      to='/distribution/list'
      icon='book'
      title="Distributions"
      fontIcon='book'
    />
    <SidebarMenuItem
      to='/os/list'
      icon='disk'
      title="OS"
      fontIcon='disk'
    />
    <div className='menu-item'>
      <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Admin tasks</span>
      </div>
    </div>
    <SidebarMenuItem
      to='/admin/user-management'
      icon='profile-user'
      title='User management'
      fontIcon='bi-profile-user'
    /></>
}


const SidebarMenuMain = () => {
  const { currentUser } = useAuth()

  return (
    <>
      {Boolean(currentUser?.is_admin) ? (<AdminMenu />) : (<NormalUserMenu />)}
    </>
  )
}

export { SidebarMenuMain }
