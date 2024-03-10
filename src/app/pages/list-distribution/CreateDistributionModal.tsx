import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useRef, useState } from 'react';
import zod, { z } from 'zod'
import { postCreateDistribution } from '../_requests/postCreateDistribution';
import { useAuth } from '../../modules/auth';
import { Loader } from '../../layout/components/loader/Loader';
import { TextField } from '../_components/TextField/TextField';

type Props = {
    show: boolean
    handleClose: (shouldRefetch: boolean, error?: string) => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateDistributionModal = ({ show, handleClose }: Props) => {

    const { auth } = useAuth();

    const [name, setName] = useState<string>();
    const [logoPath, setLogoPath] = useState<string>();

    const [hasValidName, setHasValidName] = useState<boolean>(true);
    const [hasValidLogoPath, setHasValidLogoPath] = useState<boolean>(true);

    const [isLoading, setIsLoading] = useState<boolean>();


    const submit = () => {
        setIsLoading(true);
        if (auth?.data.token && name && logoPath) {
            postCreateDistribution(auth.data.token, { name, logopath: logoPath }).then(() => {
                setIsLoading(false);
                handleClose(true);
            }).catch((response) => {
                setIsLoading(false);
                handleClose(false, response?.error ?? 'Error Occured');
            }).finally(() => {
                setName(undefined)
                setLogoPath(undefined)
            })
        } else {
            setIsLoading(false);
            handleClose(false);
        }
    }

    return createPortal(
        <Modal
            id='kt_modal_create_app'
            tabIndex={-1}
            aria-hidden='true'
            dialogClassName='modal-dialog modal-dialog-centered mw-900px'
            show={show}
            onHide={() => {
                handleClose(false)
                setName(undefined)
                setLogoPath(undefined)
            }}
            backdrop={true}
        >
            {isLoading ? <Loader /> : (<><div className='modal-header'>
                <h2>Create Distribution</h2>
                {/* begin::Close */}
                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={() => handleClose(false)}>
                    <KTIcon className='fs-1' iconName='cross' />
                </div>
                {/* end::Close */}
            </div>

                <br />
                <br />

                <div className="container" style={{ height: 'auto' }}>

                    <TextField onValidChange={setHasValidName} isRequired label="Name" value={name} onChange={setName} validator={(s) => Boolean(s?.trim().length && s?.trim().length >= 2)} errorMessage="Name must be composed of at least 2 characters" />
                    <TextField onValidChange={setHasValidLogoPath} isRequired label="Logo URL" description="This should be a valid URL" value={logoPath} onChange={setLogoPath} validator={(s) => zod.string().url().safeParse(s).success} errorMessage="Must be a valid URL" />

                </div>


                <div className='modal-body py-lg-10 px-lg-10 d-flex justify-content-end'>
                    <button
                        type='button'
                        className='btn btn-lg btn-primary'
                        data-kt-stepper-action='submit'
                        onClick={submit}
                        disabled={!hasValidLogoPath || !hasValidName}
                    >
                        <KTIcon iconName='check' className='fs-3 ms-2 me-0' /> Submit
                    </button>
                </div></>)}
        </Modal>,
        modalsRoot
    )
}

export { CreateDistributionModal }
