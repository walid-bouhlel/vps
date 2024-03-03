import { Field } from "formik";
import { KTIcon } from "../../../../_metronic/helpers";
import { ConfigModel } from "../../_requests/getConfigList";

import styles from './Config.module.scss'

type Props = {
    configId?: number;
    flavorId?: string;
    // config_id
    setConfigId: (config_id: number) => void;
    // flavorId
    setFlavorId: (flavorId: string) => void;
    configList: ConfigModel[];
}


export const Config = ({
    setConfigId,
    setFlavorId,
    configList,
    configId,
    flavorId
}: Props) => {

    const configListOrganized = configList.reduce((acc, curr, i) => {
        if (i % 3 == 0) {
            acc.push([curr])
        } else {
            if (!acc[acc.length - 1]) {
                acc[acc.length - 1] = []
            }
            acc[acc.length - 1].push(curr)
        }
        return acc
    }, [] as ConfigModel[][])

    return <div className='fv-row'>{
        configListOrganized.map((row) => <div className="row">
            {row.map(config => <div className='col-lg-12'>
                <Field
                    type='radio'
                    className='btn-check'
                    name="config"
                    value={`${config.id}-${config.stackId}`}
                    id={`config-${config.id}-${config.stackId}`}
                    checked={configId === config.id && flavorId === config.stackId}
                    onClick={() => { setConfigId(config.id); setFlavorId(config.stackId) }}
                />
                <label
                    className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                    htmlFor={`config-${config.id}-${config.stackId}`}
                    style={{ width: '100%' }}
                >
                    <span className='d-block fw-bold text-start' style={{ width: '100%' }}>
                        <span className='text-gray-900 fw-bolder d-block fs-4 mb-2'>{config.name}</span>
                        <br />
                        <span className={` ${styles['vps-info']}`}>
                            <span><KTIcon iconName='external-drive' className='fs-3' /> &nbsp;{config.disk} GB</span>
                            <span><KTIcon iconName='row-vertical' className='fs-3' /> &nbsp;{config.ram} Mb</span>
                        </span>
                        <span className={` ${styles['vps-info']}`}>
                            <span><KTIcon iconName='calculator' className='fs-3' /> &nbsp;{config.vcpus} vCPU</span>
                            <span><KTIcon iconName='arrow-right-left' className='fs-3' /> &nbsp;{config.swap} Mb</span>
                        </span>
                    </span>
                </label>
            </div>)}
        </div>)
    }</div>

};