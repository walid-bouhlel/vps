import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
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
        title={intl.formatMessage({id: 'MENU.VPS.CREATE'})}
        fontIcon='element-plus'
      />
      <SidebarMenuItem
        to='/vps/list'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.VPS.LIST'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Configs</span>
        </div>
      </div>
      <SidebarMenuItem
        to='/vps/create'
        icon='element-plus'
        title="List available configs"
        fontIcon='element-plus'
      />
      <SidebarMenuItem
        to='/vps/list'
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
        to='/distribution/list'
        title='Distribution'
        fontIcon='bi-chat-left'
        icon='data'
      >
        <SidebarMenuItem to='/distribution/list' title='List distributions' hasBullet={true} />
        <SidebarMenuItem to='/distribution/create' title='Create a new distribution' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/os/list'
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
      />
    </>
  )
}

export {SidebarMenuMain}
