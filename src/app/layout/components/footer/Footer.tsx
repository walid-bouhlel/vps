import { useEffect, useState, ReactNode } from 'react'
import { ILayout, useLayout } from '../../core'
import { Modal } from 'react-bootstrap'
import { createPortal } from 'react-dom'
import { KTIcon } from '../../../../_metronic/helpers'

const InfoModal = ({ title, show, handleClose, children }: { title: string; show: boolean; handleClose: () => void; children: ReactNode }) => {
  const modalsRoot = document.getElementById('root-modals') || document.body
  return createPortal(
    <Modal
      id='kt_modal_create_app'
      tabIndex={-1}
      aria-hidden='true'
      dialogClassName='modal-dialog modal-dialog-centered mw-900px'
      show={show}
      onHide={() => {
        handleClose()

      }}
      backdrop={true}
    >
      <div className='modal-header'>
        <h2>{title}</h2>
        {/* begin::Close */}
        <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={() => {
          handleClose()
        }}>
          <KTIcon className='fs-1' iconName='cross' />
        </div>
        {/* end::Close */}
      </div>
      <div className="container" style={{ height: 'auto', margin: 32 }}>{children}</div>
    </Modal>,
    modalsRoot
  )
}

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const { config } = useLayout()
  useEffect(() => {
    updateDOM(config)
  }, [config])


  return (
    <>
      <div className='text-gray-900 order-2 order-md-1'>
        <span className='text-muted fw-semibold me-1'>
          {new Date().getFullYear().toString()}&copy;
        </span>
        <a
          href='http://vps.bouhlel.cloud/'
          target='_blank'
          className='text-gray-800 text-hover-primary'
        >
          VPS Hosting
        </a>
      </div>

      <ul className='menu menu-gray-600 menu-hover-primary fw-semibold order-1'>
        <li className='menu-item'>
          <span className='menu-link px-2' onClick={() => setShowAboutModal(true)}>
            About
          </span>
        </li>

        <li className='menu-item'>
          <span className='menu-link px-2' onClick={() => setShowSupportModal(true)}>
            Support
          </span>
        </li>
      </ul>
      <InfoModal title="About" show={showAboutModal} handleClose={() => setShowAboutModal(false)} >
        <div>
          {/** DELETE THIS COMMENT: TODO: change content here */}
          This is an end of studies project for the <a href="https://esprit.tn" target="_blank">ESPRIT</a> engineering school.
        </div>
      </InfoModal>
      <InfoModal title="Support" show={showSupportModal} handleClose={() => setShowSupportModal(false)} >
        <div>
          {/** DELETE THIS COMMENT: TODO: change content here */}
          For support please contact <a href="emailto:hello@vps.bouhlel.com">hello@vps.bouhlel.com</a>
        </div>
      </InfoModal>
    </>
  )
}

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true')
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true')
  }
}

export { Footer }
