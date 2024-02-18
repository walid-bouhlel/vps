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
    <div className='menu-item'>
      <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Configs</span>
      </div>
    </div>
    <SidebarMenuItem
      to='/config/list'
      icon='element-plus'
      title="List available configs"
      fontIcon='element-plus'
    />
    <SidebarMenuItem
      to='/config/create'
      icon='element-11'
      title="Create a configuration"
      fontIcon='bi-app-indicator'
    />
    <div className='menu-item'>
      <div className='menu-content pt-8 pb-2'>
        <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Operating Systems</span>
      </div>
    </div>
    <SidebarMenuItemWithSub
      to='/distribution/'
      title='Distribution'
      fontIcon='bi-chat-left'
      icon='data'
    >
      <SidebarMenuItem to='/distribution/list' title='List distributions' hasBullet={true} />
      <SidebarMenuItem to='/distribution/create' title='Create a new distribution' hasBullet={true} />
    </SidebarMenuItemWithSub>
    <SidebarMenuItemWithSub
      to='/os/'
      title='OS Versions'
      fontIcon='bi-chat-left'
      icon='underlining'
    >
      <SidebarMenuItem to='/os/list' title='List OS versions' hasBullet={true} />
      <SidebarMenuItem to='/os/create' title='Create a new OS version' hasBullet={true} />
    </SidebarMenuItemWithSub>
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
