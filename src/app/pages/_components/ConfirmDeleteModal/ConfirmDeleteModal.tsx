import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../../_metronic/helpers';

type Props = {
    objectToDelete: string;
    show: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const modalsRoot = document.getElementById('root-modals') || document.body

const ConfirmDeleteModal = ({ objectToDelete, show, handleClose, handleConfirm }: Props) => {

    const onConfirm = () => {
        handleClose();
        handleConfirm();
    };

    return createPortal(
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-500px'
            show={show}
            onHide={handleClose}
            backdrop={true}
        >
            <div className='modal-header'>
                <h2>Delete <span style={{ fontStyle: 'italic' }}>{objectToDelete}</span> ?</h2>
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
                    <KTIcon className='fs-1' iconName='cross' />
                </div>
            </div>

            <br />
            <br />

            <div className="container text-center" style={{ height: 'auto' }}>
                This action is irreversible and the deleted item cannot be restored...
            </div>


            <div className='modal-body py-lg-10 px-lg-10 d-flex justify-content-end'>
                <button
                    type='button'
                    className='btn btn-lg btn-danger'
                    data-kt-stepper-action='submit'
                    onClick={onConfirm}
                >
                    <KTIcon iconName='check' className='fs-3 ms-2 me-0' /> Yes
                </button>
                <button
                    type='button'
                    className='btn btn-lg'
                    data-kt-stepper-action='submit'
                    onClick={handleClose}
                >
                    <KTIcon iconName='stop' className='fs-3 ms-2 me-0' /> No
                </button>
            </div>
        </Modal>,
        modalsRoot
    )
}

export { ConfirmDeleteModal }
