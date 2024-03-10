import { useEffect, useState } from 'react';
import { KTIcon } from '../../../_metronic/helpers'


import { useAuth } from '../../modules/auth';
import { ConfigModel, getConfigList } from '../_requests/getConfigList';
import { Loader } from '../../../_metronic/layout/components/loader/Loader';
import { formatDateTime } from '../_utils/date';
import { CreateConfigModal } from './CreateConfigModal';
import toast, { Toaster } from 'react-hot-toast';
import { deleteConfig } from '../_requests/deleteConfig';
import { SmallLoader } from '../_components/SmallLoader/SmallLoader';


import styles from './ListConfig.module.scss'
import { ConfirmDeleteModal } from '../_components/ConfirmDeleteModal/ConfirmDeleteModal';


type ItemProps = { item: ConfigModel; refresh: () => void; }

const Item = ({ item: { id, disk, name, nameInStack, ram, stackId, swap, vcpus, created_at }, refresh }: ItemProps) => {

    const { auth } = useAuth();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const [shouldShowCreationModal, setShouldShowCreationModal] = useState<boolean>(false);

    const doDeleteConfig = () => {
        if (auth?.data.token) {
            setIsDeleting(true)
            deleteConfig(auth?.data.token, String(id)).then(() => { refresh(); }).catch(() => { toast.error('Error occured') }).finally(() => {
                setIsDeleting(false);
            })
        }
    };

    return <tr>
        <td>
            <div className='d-flex align-items-center'>
                {id}
            </div>
        </td>
        <td>
            <div className='d-flex align-items-center'>

                <div className='d-flex justify-content-start flex-column'>
                    <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        {name} <span className='badge badge-light-primary fs-7 fw-semibold'>{nameInStack}</span>
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {stackId}
                    </span>
                </div>
            </div>
        </td>
        <td><span className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
            {vcpus}
        </span>
        </td>
        <td>
            <div className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                {ram} Mb
            </div>
        </td>
        <td>
            <span className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                {disk} Gb
            </span>
        </td>

        <td>
            <span className={`text-muted fw-semibold text-muted d-block fs-7`}>
                {swap} Mb
            </span>
        </td>

        <td>
            <span className={`text-muted fw-semibold text-muted d-block fs-7`}>
                {formatDateTime(created_at)}
            </span>

        </td>
        <td onClick={() => setShouldShowCreationModal(true)}>
            <div className={styles.deleteButtonContainer}>{isDeleting ? <SmallLoader /> : <KTIcon iconName='trash-square' className={`fs-1 text-hover-danger ${styles.deleteButton}`} />}</div>
        </td>

        <ConfirmDeleteModal
            objectToDelete={`${name}`}
            show={shouldShowCreationModal}
            handleClose={() => setShouldShowCreationModal(false)}
            handleConfirm={doDeleteConfig}
        />
    </tr>
}


const ListConfig = () => {
    const { auth } = useAuth()
    const [configList, setConfigList] = useState<ConfigModel[] | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [shouldShowCreationModal, setShouldShowCreationModal] = useState<boolean>(false);

    useEffect(() => {
        if (auth?.data) {
            getConfigList(auth.data.token).then((response) => setConfigList(response))
        }
    }, [])

    if (configList === null || isLoading) {
        return <Loader />
    }

    const refresh = () => {
        if (auth?.data) {
            setIsLoading(true)
            Promise.all([
                getConfigList(auth.data.token).then((response) => setConfigList(response))
            ]).finally(() => setIsLoading(false))
        }
    }


    return <div className={`card`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Configurations list</span>
                <span className='text-muted mt-1 fw-semibold fs-7'>List of available commercialised configurations</span>
            </h3>
            <div className='card-toolbar'>
                <a href='#' className='btn btn-sm btn-light-primary' onClick={() => setShouldShowCreationModal(true)}>
                    <KTIcon iconName='plus' className='fs-2' />
                    Create a new configuration
                </a>
            </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
            {/* begin::Table container */}
            <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table align-middle gs-0 gy-4'>
                    {/* begin::Table head */}
                    <thead>
                        <tr className='fw-bold text-muted bg-light'>
                            <th className='ps-4 min-w-75px rounded-start center'>ID</th>
                            <th className='ps-4 min-w-350px rounded-start'>Name</th>
                            <th className='min-w-150px'>vCPU</th>
                            <th className='min-w-125px'>RAM</th>
                            <th className='min-w-125px'>Disk</th>
                            <th className='min-w-200px'>SWAP</th>
                            <th className='min-w-200px rounded-end'>Created At</th>
                            <th className='min-w-100px rounded-end'></th>
                        </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                        {configList.map(item => <Item key={item.id} item={item} refresh={refresh} />)}
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
            </div>
            {/* end::Table container */}
        </div >
        {/* begin::Body */}
        <Toaster position="bottom-right" reverseOrder={false} />
        <CreateConfigModal show={shouldShowCreationModal} handleClose={(shouldRefetch, error) => {
            setShouldShowCreationModal(false);
            if (shouldRefetch) {
                refresh();
            }

            if (error) {
                toast.error(error)
            }
        }} />
    </div >

};


export { ListConfig }