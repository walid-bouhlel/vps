

import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useRef, useState } from 'react';
import zod, { z } from 'zod'
import { postCreateDistribution } from '../_requests/createDistribution';
import { useAuth } from '../../modules/auth';
import { Loader } from '../../../_metronic/layout/components/loader/Loader';


type TextFieldProps = { value?: string; onValidChange?: (isValid: boolean) => void; isRequired?: boolean; description?: string; errorMessage: string; label: string; onChange: (v: string) => void; validator?: (str?: string) => boolean; }

const TextField = ({ value, description, isRequired, errorMessage, onChange, onValidChange, label, validator = () => true }: TextFieldProps) => {
    const hasChanged = useRef<boolean>();

    useEffect(() => {
        if (!hasChanged.current && value !== undefined && value !== '') {
            hasChanged.current = true;
        }

        onValidChange?.(validator?.(value) ?? true)
    }, [value])

    return <div className='fv-row mb-10'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className={isRequired ? 'required' : ''}>{label}</span>
            {description && <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title={description}
            ></i>}
        </label>
        <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='appname'
            placeholder=''
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
        {hasChanged.current && !validator(value) && <div className='fv-plugins-message-container'>
            <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                Invalid {label}
                {errorMessage && <><br />{errorMessage}</>}
            </div>
        </div>}
    </div >
}


type Props = {
    show: boolean
    handleClose: (shouldRefetch: boolean) => void
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
            }).catch(() => {
                setIsLoading(false);
                handleClose(false);
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
            onHide={() => handleClose(false)}
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


                <div className='modal-body py-lg-10 px-lg-10'>
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
