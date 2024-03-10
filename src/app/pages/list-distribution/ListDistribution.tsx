import { useEffect, useState } from "react";
import { DistributionModel, getDistributionList } from "../_requests/getDistributionList";
import { KTIcon } from "../../../_metronic/helpers";
import { Loader } from "../../../_metronic/layout/components/loader/Loader";
import { useAuth } from "../../modules/auth";
import { formatDateTime } from "../_utils/date";

import styles from './ListDistribution.module.scss'
import { OSModel, getOSList } from "../_requests/getOSList";
import { CreateDistributionModal } from "./CreateDistributionModal";
import toast, { Toaster } from "react-hot-toast";
import { SmallLoader } from "../_components/SmallLoader/SmallLoader";
import { deleteDistribution } from "../_requests/deleteDistribution";
import { ConfirmDeleteModal } from "../_components/ConfirmDeleteModal/ConfirmDeleteModal";

type DistributionCardProps = {
    distribution: DistributionModel;
    OSList: OSModel[];
    refresh: () => void;
}


const DistributionCard = ({ distribution, OSList, refresh }: DistributionCardProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [shouldShowDeletionModal, setShouldShowDeletionModal] = useState<boolean>(false);

    const { id, logopath, name, created_at } = distribution;

    const { auth } = useAuth();

    const doDeleteDistribution = () => {
        if (auth?.data.token) {
            setIsDeleting(true)
            deleteDistribution(auth?.data.token, String(id)).then(() => { refresh() }).catch(() => { toast.error('Error occured') }).finally(() => setIsDeleting(false))
        }
    }

    return <div className={`${styles.distCard} p-2`}>
        <div className={`card-body py-3`}>
            <div className="card md-6" >
                <img className={`card-img-top ${styles.logo}`} src={logopath} alt={`${name} image`} />
                <div className="card-body">
                    <h2 className="card-title d-flex justify-content-between"><span>{name}</span> {isDeleting ? <SmallLoader /> : <div onClick={() => setShouldShowDeletionModal(true)}><KTIcon iconName='trash-square' className={`fs-1 text-hover-danger ${styles.deleteButton}`} /></div>}</h2>
                    <p className="card-text">Created At: {formatDateTime(created_at)}</p>
                    <br />
                    {OSList.some(({ distribution_id }) => distribution_id === id) && <>
                        <h6>Available versions</h6>
                        <ul>
                            {OSList.filter(({ distribution_id }) => distribution_id === id).map(({ id: OSID, name }) => (<li key={OSID}>{name}</li>))}
                        </ul>
                    </>}
                </div>
            </div>
        </div>
        <ConfirmDeleteModal
            objectToDelete={`${distribution.name}`}
            show={shouldShowDeletionModal}
            handleClose={() => setShouldShowDeletionModal(false)}
            handleConfirm={() => doDeleteDistribution()}
        />
    </div>
}

export const ListDistribution = () => {
    const { auth } = useAuth();
    const [distributionList, setDistributionList] = useState<DistributionModel[] | null>(null);
    const [OSList, setOSList] = useState<OSModel[] | null>(null);

    const [shouldShowCreationModal, setShouldShowCreationModal] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);



    useEffect(() => {
        if (auth?.data) {
            getDistributionList(auth.data.token).then((response) => setDistributionList(response.data))
            getOSList(auth.data.token).then((response) => setOSList(response))
        }
    }, [])

    if (distributionList === null || OSList === null || isLoading) {
        return <Loader />
    }

    const refresh = () => {
        if (auth?.data) {
            setIsLoading(true)
            Promise.all([
                getDistributionList(auth.data.token).then((response) => setDistributionList(response.data)),
                getOSList(auth.data.token).then((response) => setOSList(response))
            ]).finally(() => setIsLoading(false))
        }
    }


    return (
        <div className={`card`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Distributions list</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>List of available distributions</span>
                </h3>
                <div className='card-toolbar'>
                    <a href='#' className='btn btn-sm btn-light-primary' onClick={() => setShouldShowCreationModal(true)}>
                        <KTIcon iconName='plus' className='fs-2' />
                        Create a new distribution
                    </a>
                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className="d-flex flex-wrap justify-content-center align-items-stretch">
                {distributionList.map((distribution) => (
                    <DistributionCard distribution={distribution} OSList={OSList} refresh={refresh} />
                ))}
            </div>
            {/* begin::Body */}
            <Toaster position="bottom-right" reverseOrder={false} />
            <CreateDistributionModal show={shouldShowCreationModal} handleClose={(shouldRefetch, error) => {
                setShouldShowCreationModal(false);
                if (shouldRefetch) {
                    refresh()
                }

                if (error) {
                    toast.error(error)
                }
            }} />
        </div >
    )
}