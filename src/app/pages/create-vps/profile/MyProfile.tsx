import clsx from 'clsx'

import { useAuth } from "../../../modules/auth"

export const MyProfile = () => {
    const { currentUser } = useAuth()

    return <div className='p-5 card mb-5 mb-xl-10'>
        <div
            className='card-header border-0 cursor-pointer'
            role='button'
            data-bs-toggle='collapse'
            data-bs-target='#kt_account_profile_details'
            aria-expanded='true'
            aria-controls='kt_account_profile_details'
        >
            <div className='card-title m-0'>
                <h3 className='fw-bolder m-0'>Profile Details</h3>
            </div>
        </div>

        <div className='collapse show'>
            <form noValidate className='form'>
                <div className='card-body border-top p-9'>
                    <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
                        <div className='col-lg-8'>
                            <div
                                className='image-input image-input-outline'
                                data-kt-image-input='true'
                            >
                                <div
                                    className='image-input-wrapper w-125px h-125px'
                                >
                                    <img style={{ width: '100%', height: '100%' }} src={`https://ui-avatars.com/api/?name=${currentUser?.name}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />

                    <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>ID</label>
                        <div className='col-lg-8 fv-row'>
                            {currentUser?.id}
                        </div>
                    </div>

                    <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Fullname</label>

                        <div className='col-lg-8'>
                            {currentUser?.name}
                        </div>
                    </div>

                    <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>
                        <div className='col-lg-8 fv-row'>
                            {currentUser?.email}
                        </div>
                    </div>

                    <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Created at</label>
                        <div className='col-lg-8 fv-row'>
                            {currentUser?.created_at}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </ div>
}