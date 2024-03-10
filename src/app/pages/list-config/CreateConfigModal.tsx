import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useRef, useState } from 'react';
import zod, { z } from 'zod'
import { useAuth } from '../../modules/auth';
import { Loader } from '../../layout/components/loader/Loader';
import { FlavorStackListModel, getFlavorStackList } from '../_requests/getFlavorStackList';
import { TextField } from '../_components/TextField/TextField';
import { postCreateConfig } from '../_requests/postCreateConfig';
import { Field, Formik } from 'formik';

import styles from './CreateConfigModal.module.scss'

type Props = {
    show: boolean
    handleClose: (shouldRefetch: boolean, error?: string) => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateConfigModal = ({ show, handleClose }: Props) => {

    const { auth } = useAuth();

    const [name, setName] = useState<string>();
    const [flavorId, setFlavorId] = useState<string>();

    const [hasValidName, setHasValidName] = useState<boolean>(true);
    const [hasValidFlavorId, setHasValidFlavorId] = useState<boolean>(true);

    const [flavorStackList, setFlavorStackList] = useState<FlavorStackListModel | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>();

    const flavorStackListContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (auth?.data.token && show) {
            getFlavorStackList(auth?.data.token).then(response => setFlavorStackList(response))
        }
    }, [auth?.data.token, show])

    useEffect(() => {
        if (flavorStackList === null) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [flavorStackList])

    useEffect(() => { setHasValidFlavorId(Boolean(flavorId)) }, [flavorId])

    const submit = () => {
        setIsLoading(true);
        if (auth?.data.token && name && flavorId) {
            postCreateConfig(auth.data.token, { name, flavorId }).then(() => {
                setIsLoading(false);
                handleClose(true);
            }).catch((response) => {
                setIsLoading(false);
                handleClose(false, response?.error ?? 'Error Occured');
            }).finally(() => {
                setFlavorId(undefined)
                setName(undefined)
            })
        } else {
            setIsLoading(false);
            handleClose(false);
        }
    }

    const scrollLeft = () => {
        if (flavorStackListContentRef.current) {
            flavorStackListContentRef.current.scrollBy({
                top: 0,
                left: -100,
                behavior: "smooth",
            });
        }
    }

    const scrollRight = () => {
        if (flavorStackListContentRef.current) {
            flavorStackListContentRef.current.scrollBy({
                top: 0,
                left: 100,
                behavior: "smooth",
            });
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
                setFlavorId(undefined)
                setName(undefined)
            }}
            backdrop={true}
        >
            {isLoading ? <Loader /> : (<>
                <Formik initialValues={{}} onSubmit={() => { }}>
                    <>
                        <div className='modal-header'>
                            <h2>Create Distribution</h2>
                            {/* begin::Close */}
                            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={() => {
                                handleClose(false)
                            }}>
                                <KTIcon className='fs-1' iconName='cross' />
                            </div>
                            {/* end::Close */}
                        </div>

                        <br />
                        <br />

                        <div className="container" style={{ height: 'auto' }}>

                            <TextField onValidChange={setHasValidName} isRequired label="Name" value={name} onChange={setName} validator={(s) => Boolean(s?.trim().length && s?.trim().length >= 2)} errorMessage="Name must be composed of at least 2 characters" />


                            <div className={styles.flavorStackList}>
                                <div onClick={scrollLeft}><KTIcon className={styles.arrows} iconName='left-square' /></div>
                                <div ref={flavorStackListContentRef} className={styles.flavorStackListContent}>
                                    {flavorStackList?.map(flavorStack => (<>
                                        <Field
                                            type='radio'
                                            className='btn-check'
                                            name="config"
                                            value={flavorStack.id}
                                            id={`flavor-${flavorStack.id}`}
                                            checked={flavorStack.id === flavorId}
                                            onClick={() => { setFlavorId(flavorStack.id) }}
                                        />
                                        <label
                                            className={`btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10 ${styles.flavorStackItem}`}
                                            htmlFor={`flavor-${flavorStack.id}`}
                                        >
                                            <span className='d-block fw-bold text-start' style={{ width: '100%' }}>
                                                <span className='text-gray-900 fw-bolder d-block fs-4 mb-2'>{flavorStack.name}</span>
                                                <br />
                                                <span className={` ${styles['config-info']}`}>
                                                    <span><KTIcon iconName='external-drive' className='fs-3' />{flavorStack.flavorDetails.disk} GB</span>
                                                    <span><KTIcon iconName='row-vertical' className='fs-3' />{flavorStack.flavorDetails.ram} Mb</span>
                                                </span>
                                                <span className={` ${styles['config-info']}`}>
                                                    <span><KTIcon iconName='calculator' className='fs-3' />{flavorStack.flavorDetails.vcpus} vCPU</span>
                                                    <span><KTIcon iconName='arrow-right-left' className='fs-3' />{flavorStack.flavorDetails.swap || 0} Mb</span>
                                                </span>
                                            </span>
                                        </label>
                                    </>
                                    ))}
                                </div>
                                <div onClick={scrollRight}><KTIcon className={styles.arrows} iconName='right-square' /></div>
                            </div>


                        </div>


                        <div className='modal-body py-lg-10 px-lg-10 d-flex justify-content-end'>
                            <button
                                type='button'
                                className='btn btn-lg btn-primary'
                                data-kt-stepper-action='submit'
                                onClick={submit}
                                disabled={!hasValidFlavorId || !hasValidName}
                            >
                                <KTIcon iconName='check' className='fs-3 ms-2 me-0' /> Submit
                            </button>
                        </div>
                    </>
                </Formik>
            </>)}
        </Modal>,
        modalsRoot
    )
}

export { CreateConfigModal }
