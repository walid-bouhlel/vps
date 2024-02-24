import { useEffect, useState } from "react";
import { DistributionModel, getDistributionList } from "../_requests/getDistributionList";
import { useNavigate } from "react-router-dom";
import { KTIcon } from "../../../_metronic/helpers";
import { Loader } from "../../../_metronic/layout/components/loader/Loader";
import { useAuth } from "../../modules/auth";
import { formatDateTime } from "../_utils/date";

import styles from './ListOS.module.scss'
import { OSModel, getOSList } from "../_requests/getOSList";

type ItemProps = { item: OSModel, distribution?: DistributionModel }

const Item = ({ item: { id, idInStack, name, nameInStack, version, created_at }, distribution }: ItemProps) => {


    return <tr>
        <td>
            <div className='d-flex align-items-center'>
                {id}
            </div>
        </td>
        <td>
            <div className='d-flex align-items-center'>
                {distribution?.name}
            </div>
        </td>
        <td>
            <div className='d-flex align-items-center'>

                <div className='d-flex justify-content-start flex-column'>
                    <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        {name} <span className='badge badge-light-primary fs-7 fw-semibold'>{version}</span>
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {idInStack}
                    </span>
                </div>
            </div>
        </td>
        <td><span className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
            {nameInStack}
        </span>
        </td>
        <td>
            <span className={`text-muted fw-semibold text-muted d-block fs-7`}>
                {formatDateTime(created_at)}
            </span>

        </td>
    </tr>
}


export const ListOS = () => {
    const { auth } = useAuth();
    const [distributionList, setDistributionList] = useState<DistributionModel[] | null>(null);
    const [OSList, setOSList] = useState<OSModel[] | null>(null);

    const [selectedDistribution, setSelectedDistribution] = useState<string>('all');

    const navigate = useNavigate()

    useEffect(() => {
        if (auth?.data) {
            getDistributionList(auth.data.token).then((response) => setDistributionList(response.data))
            getOSList(auth.data.token).then((response) => setOSList(response))
        }
    }, [])

    if (distributionList === null || OSList === null) {
        return <Loader />
    }


    return (
        <div className={`card`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Operating systems list</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>List of available operating systems</span>
                </h3>
                <div className='card-toolbar'>
                    <a href='#' className='btn btn-sm btn-light-primary' onClick={() => navigate('/distribution/create')}>
                        <KTIcon iconName='plus' className='fs-2' />
                        Create a new OS
                    </a>
                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
                <div className={styles.distributionFilter}>
                    <span>Distribution:</span>
                    <select className="form-select form-select-solid" onChange={(e) => setSelectedDistribution(e.target.value)}>
                        <option selected value="all">All</option>
                        {distributionList.map(({ id, name }) =>
                            <option value={id}>{name}</option>
                        )}
                    </select>
                </div>
                <br />
                <br />
                {/* begin::Table container */}
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className='table align-middle gs-0 gy-4'>
                        {/* begin::Table head */}
                        <thead>
                            <tr className='fw-bold text-muted bg-light'>
                                <th className='ps-4 min-w-75px rounded-start center'>ID</th>
                                <th className='min-w-150px'>Distribution</th>
                                <th className='ps-4 min-w-350px rounded-start'>Name</th>
                                <th className='min-w-125px'>OpenStack Name</th>
                                <th className='min-w-125px'>Created At</th>
                            </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            {OSList.filter(({ distribution_id }) => selectedDistribution === 'all' || +selectedDistribution === distribution_id).map(item => {
                                const distribution = distributionList.find(({ id }) => id === item.distribution_id);
                                return <Item key={item.id} item={item} distribution={distribution} />
                            })}
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div >
            {/* begin::Body */}
        </div >
    )
}