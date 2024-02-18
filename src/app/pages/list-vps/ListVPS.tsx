import React, { useEffect, useState } from 'react';
import { KTIcon, toAbsoluteUrl } from '../../../_metronic/helpers'

import styles from './ListVPS.module.scss'
import { useAuth } from '../../modules/auth';
import { VPSModel, getVPSList } from '../_requests/getVPSList';
import { DistributionModel, getDistributionList } from '../_requests/getDistributionList';
import { ConfigModel, getConfigList } from '../_requests/getConfigList';
import { OSModel, getOSList } from '../_requests/getOSList';


type VPSItemProps = { item: VPSModel, distributionList: DistributionModel[], OSList: OSModel[], configList: ConfigModel[] }

const VPSItem = ({ item: { id, instance, server_name, description, ipv4, config_id, os_id }, distributionList, OSList, configList }: VPSItemProps) => {
    const currentConfig = configList.find(({ id }) => config_id === id)
    const currentOS = OSList.find(({ id }) => id === os_id)
    const currentDistribution = distributionList.find(({ id }) => currentOS?.distribution_id === id)


    return <tr>
        <td>
            <div className='d-flex align-items-center'>
                <div className='symbol symbol-50px me-5'>
                    <img
                        src={currentDistribution?.logopath}
                        className=''
                        alt=''
                    />
                </div>
                <div className='d-flex justify-content-start flex-column'>
                    <a href='#' className='text-gray-900 fw-bold text-hover-primary mb-1 fs-6'>
                        {instance} <span className='badge badge-light-primary fs-7 fw-semibold'>{server_name}</span>
                    </a>
                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                        {description}
                    </span>
                </div>
            </div>
        </td>
        <td>
            <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
                {ipv4}
            </a>
        </td>
        <td> <a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
            {currentConfig?.name}
        </a>
            <span className={`text-muted fw-semibold text-muted d-block fs-7`}>
                <span className={` ${styles['vps-info']}`}>
                    <span><KTIcon iconName='external-drive' className='fs-3' />{currentConfig?.disk} GB</span>
                    <span><KTIcon iconName='row-vertical' className='fs-3' />{currentConfig?.ram} Mb</span>
                    <span><KTIcon iconName='calculator' className='fs-3' />{currentConfig?.vcpus} vCPU</span>
                    <span><KTIcon iconName='arrow-right-left' className='fs-3' />{currentConfig?.swap} Mb</span>
                </span>
            </span>

        </td>
        <td><a href='#' className='text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6'>
            {currentDistribution?.name}
        </a>
            <span className='text-muted fw-semibold text-muted d-block fs-7'>{currentOS?.name}</span>
        </td>
        <td>
            <span className='badge badge-light-success fs-7 fw-semibold'>Running</span>
            <span className='badge badge-light-danger fs-7 fw-semibold'>Stopped</span>
        </td>
        <td className='text-end'>
            <a
                href='#'
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
                <KTIcon iconName='to-right' className='fs-3' />
            </a>
            <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                <KTIcon iconName='minus-circle' className='fs-3' />
            </a>
            <a
                href='#'
                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
                <KTIcon iconName='arrows-circle' className='fs-3' />
            </a>

        </td>
    </tr>
}


const ListVPS = () => {
    const { auth } = useAuth()
    const [VPSList, setVPSList] = useState<VPSModel[]>([]);
    const [configList, setConfigList] = useState<ConfigModel[]>([]);
    const [distributionList, setDistributionList] = useState<DistributionModel[]>([]);
    const [OSList, setOSList] = useState<OSModel[]>([]);

    useEffect(() => {
        if (auth?.data) {
            getVPSList(auth.data.token).then((response) => setVPSList(response.data))
            getConfigList(auth.data.token).then((response) => setConfigList(response))
            getDistributionList(auth.data.token).then((response) => setDistributionList(response.data))
            getOSList(auth.data.token).then((response) => setOSList(response))
        }
    }, [])


    return <div className={`card`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>VPS List</span>
                <span className='text-muted mt-1 fw-semibold fs-7'>These are the VPS you created</span>
            </h3>
            <div className='card-toolbar'>
                <a href='#' className='btn btn-sm btn-light-primary'>
                    <KTIcon iconName='plus' className='fs-2' />
                    Create a new VPS
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
                            <th className='ps-4 min-w-325px rounded-start'>VPS</th>
                            <th className='min-w-125px'>IP v4</th>
                            <th className='min-w-125px'>Deposit</th>
                            <th className='min-w-200px'>Agent</th>
                            <th className='min-w-150px'>Status</th>
                            <th className='min-w-200px text-end rounded-end'></th>
                        </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                        {VPSList.map(item => <VPSItem key={item.id} item={item} configList={configList} OSList={OSList} distributionList={distributionList} />)}
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
            </div>
            {/* end::Table container */}
        </div >
        {/* begin::Body */}
    </div >

};


export { ListVPS }