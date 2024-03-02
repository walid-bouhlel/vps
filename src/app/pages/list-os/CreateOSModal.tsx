import { createPortal } from 'react-dom'
import { Modal } from 'react-bootstrap'
import { KTIcon } from '../../../_metronic/helpers'
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../modules/auth';
import { Loader } from '../../../_metronic/layout/components/loader/Loader';
import { TextField } from '../_components/TextField/TextField';

import styles from './CreateOSModal.module.scss'
import { DistributionModel, getDistributionList } from '../_requests/getDistributionList';
import { ImageModel, getImageList } from '../_requests/getImageList';
import { postCreateOS } from '../_requests/postCreateOS';

type Props = {
    show: boolean
    handleClose: (shouldRefetch: boolean, error?: string) => void
}

const modalsRoot = document.getElementById('root-modals') || document.body

const CreateOSModal = ({ show, handleClose }: Props) => {

    const { auth } = useAuth();

    const [name, setName] = useState<string>();
    const [distributionId, setDistributionId] = useState<number>();
    const [imageId, setImageId] = useState<string>();
    const [version, setVersion] = useState<string>();

    const [hasValidName, setHasValidName] = useState<boolean>(false);
    const [hasValidVersion, setHasValidVersion] = useState<boolean>(false);
    const [hasValidImageId, setHasValidImageId] = useState<boolean>(false);
    const [hasValidDistributionId, setHasValidDistributionId] = useState<boolean>(false);

    const [distributionList, setDistributionList] = useState<DistributionModel[] | null>(null);
    const [imageList, setImageList] = useState<ImageModel[] | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>();

    const distributionListContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (auth?.data.token && show) {
            getImageList(auth?.data.token).then(response => setImageList(response))
            getDistributionList(auth?.data.token).then(response => setDistributionList(response.data))
        }
    }, [auth?.data.token, show])

    useEffect(() => {
        if (imageList === null || distributionList === null) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [imageList, distributionList])


    useEffect(() => {
        setHasValidImageId(Boolean(imageId));
        setHasValidDistributionId(Boolean(distributionId));
    }, [imageId, distributionId])


    const submit = () => {
        setIsLoading(true);
        if (auth?.data.token && name !== undefined && version !== undefined && distributionId !== undefined && imageId !== undefined) {
            postCreateOS(auth.data.token, { name, version, imageId, distribution_id: distributionId }).then(() => {
                setIsLoading(false);
                handleClose(true);
            }).catch((response) => {
                setIsLoading(false);
                console.log(response)
                handleClose(false, response?.error ?? 'Error occured');
            }).finally(() => {
                setImageId(undefined)
                setDistributionId(undefined)
                setName(undefined)
                setVersion(undefined)
            })
        } else {
            setIsLoading(false);
            handleClose(false);
        }
    }

    const scrollLeft = () => {
        if (distributionListContentRef.current) {
            distributionListContentRef.current.scrollBy({
                top: 0,
                left: -100,
                behavior: "smooth",
            });
        }
    }

    const scrollRight = () => {
        if (distributionListContentRef.current) {
            distributionListContentRef.current.scrollBy({
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
                setImageId(undefined)
                setDistributionId(undefined)
                setName(undefined)
                setVersion(undefined)
                setName(undefined)
            }}
            backdrop={true}
        >
            {isLoading ? <Loader /> : (<>
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
                    <TextField onValidChange={setHasValidVersion} isRequired label="Version" value={version} onChange={setVersion} validator={(s) => Boolean(s?.trim().length && s?.trim().length >= 2)} errorMessage="Version must be composed of at least 2 characters" />

                    <div className={styles.imagesSection}>
                        <span>Image:</span>
                        <select className="form-select form-select-solid" onChange={(e) => setImageId(e.target.value == '' ? undefined : e.target.value)}>
                            <option value="">Select image</option>
                            {imageList?.map(({ id, name }) =>
                                <option value={id}>{name}</option>
                            )}
                        </select>
                    </div>

                    <div className={styles.distributionList}>
                        <div onClick={scrollLeft}><KTIcon className={styles.arrows} iconName='left-square' /></div>
                        <div ref={distributionListContentRef} className={styles.distributionListContent}>
                            {distributionList?.map(distribution => (<>
                                <input
                                    type='radio'
                                    className='btn-check'
                                    name="config"
                                    value={distribution.id}
                                    id={`dist-${distribution.id}`}
                                    checked={distribution.id === distributionId}
                                    onClick={() => { setDistributionId(distribution.id) }}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setDistributionId(distribution.id)
                                        }
                                    }}
                                />
                                <label
                                    className={`btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10 ${styles.distributionItem}`}
                                    htmlFor={`dist-${distribution.id}`}
                                >
                                    <img src={distribution.logopath} />
                                    <h3>{distribution.name}</h3>
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
                        disabled={!hasValidDistributionId || !hasValidName || !hasValidImageId || !hasValidVersion}
                    >
                        <KTIcon iconName='check' className='fs-3 ms-2 me-0' /> Submit
                    </button>
                </div>
            </>)}
        </Modal>,
        modalsRoot
    )
}

export { CreateOSModal }
