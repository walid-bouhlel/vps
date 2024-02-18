import { Field } from "formik";
import { KTIcon } from "../../../../_metronic/helpers";
import { DistributionModel } from "../../_requests/getDistributionList";
import { OSModel } from "../../_requests/getOSList";


import styles from './OperatingSystem.module.scss'

type Props = {
    distributionId?: number;
    osId?: number;
    imageId?: string;
    setDistributionId: (distributionId: number) => void;
    setImageId: (imageId: string) => void;
    setOsId: (osId: number) => void;
    distributionList: DistributionModel[];
    OSList: OSModel[];
}

export const OperatingSystem = ({ imageId, distributionId, osId, setDistributionId, setOsId, setImageId, distributionList, OSList }: Props) => {

    const distributionListOrganized = distributionList.reduce((acc, curr, i) => {
        if (i % 3 == 0) {
            acc.push([curr])
        } else {
            if (!acc[acc.length - 1]) {
                acc[acc.length - 1] = []
            }
            acc[acc.length - 1].push(curr)
        }
        return acc
    }, [] as DistributionModel[][])

    return <div className='fv-row'>{
        distributionListOrganized.map((row) => <div className="row">
            {row.map(distribution => {
                const availableOs = OSList.filter(({ distribution_id }) => distribution.id === distribution_id)

                return <div className='col-lg-6'>

                    <Field
                        type='radio'
                        className='btn-check'
                        name="distribution"
                        value={`${distribution.id}`}
                        id={`distribution-${distribution.id}`}
                        onClick={() => { setDistributionId(distribution.id) }}
                        checked={distributionId === distribution.id}
                        disabled={availableOs.length === 0}
                    />
                    <label
                        className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                        htmlFor={`distribution-${distribution.id}`}
                        style={{ width: '100%' }}
                    >
                        <img src={distribution?.logopath} className={styles.logo} />
                        <span className='d-block fw-bold text-start' style={{ width: '100%' }}>
                            <span className='text-gray-900 fw-bolder d-block fs-4 mb-2'>{distribution.name}</span>
                            <br />
                            <select
                                className='form-select form-select-solid form-select-lg fw-bold'
                                onChange={(e) => {
                                    if (e.target.value) {
                                        setOsId(+e.target.value)
                                        const os = OSList.find(({ id }) => id === +e.target.value)
                                        setImageId(os?.idInStack ?? '')
                                    }
                                }}
                                disabled={distributionId !== distribution.id}
                            >
                                <option value=''>Select a version...</option>
                                {availableOs.map(os => <option selected={os.id === osId} value={os.id}>{os.name}</option>)}
                            </select>
                        </span>
                    </label>
                </div>
            })}
        </div>)
    }</div>
}