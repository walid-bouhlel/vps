
type Props = {
    instance: string;
    description: string;
    setInstance: (instance: string) => void;
    setDescription: (description: string) => void;
}

export const NameAndDescription = ({ instance, description, setInstance, setDescription }: Props) => {
    return (
        <div className='w-100'>
            <div className='pb-10 pb-lg-12'>
                <h2 className='fw-bolder text-gray-900'>VPS details</h2>
            </div>

            <div className='fv-row mb-10'>
                <label className='form-label required'>VPS name <strong>(Required)</strong></label>

                <input type="text" value={instance} name='instance' className='form-control form-control-lg form-control-solid' onChange={(e) => setInstance(e.target.value.trim())} />
                {!instance?.trim() && <div className='text-danger mt-2'>
                    Instance name is required
                </div>}
            </div>

            <div className='fv-row mb-10'>
                <label className='form-label'>Description <small>(optional)</small></label>

                <input type="text" value={description} name='description' className='form-control form-control-lg form-control-solid' onChange={(e) => setDescription(e.target.value)} />
            </div>

        </div>
    )
}

