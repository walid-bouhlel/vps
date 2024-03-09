import { Formik, Form } from 'formik'
import { useEffect, useState } from 'react'
import { KTIcon } from '../../../_metronic/helpers'
import { Content } from '../../../_metronic/layout/components/content'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../modules/auth'
import { ConfigModel, getConfigList } from '../_requests/getConfigList'
import { DistributionModel, getDistributionList } from '../_requests/getDistributionList'
import { OSModel, getOSList } from '../_requests/getOSList'
import { Loader } from '../../../_metronic/layout/components/loader/Loader'

import { Config } from './config/Config'
import { OperatingSystem } from './operatingsystem/OperatingSystem'
import { NameAndDescription } from './nameanddescription/NameAndDescription'
import { postCreateVPS } from '../_requests/postCreateVPS'
import { Congrats } from './congrats/Congrats'

export const CreateVPS = () => {
    const totalSteps = 4;

    const { auth, currentUser } = useAuth()

    const [currentStep, setCurrentStep] = useState<number>(1)

    /** Form DATA */
    const [configId, setConfigId] = useState<number>()
    const [flavorId, setFlavorId] = useState<string>()
    const [distributionId, setDistributionId] = useState<number>()
    const [imageId, setImageId] = useState<string>()
    const [osId, setOsId] = useState<number>()
    const [instance, setInstance] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    /** End Form DATA */

    const [isError, setIsError] = useState<boolean>(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    const [configList, setConfigList] = useState<ConfigModel[]>([]);
    const [distributionList, setDistributionList] = useState<DistributionModel[]>([]);
    const [OSList, setOSList] = useState<OSModel[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);


    const navigate = useNavigate()

    useEffect(() => {
        if (auth?.data) {
            getConfigList(auth.data.token).then((response) => { setConfigList(response); setIsLoading(false) })
            getDistributionList(auth.data.token).then((response) => setDistributionList(response.data))
            getOSList(auth.data.token).then((response) => setOSList(response))
        }
    }, [])

    useEffect(() => {
        if (currentStep === 1) {
            setIsSubmitDisabled(!Boolean(configId && flavorId))
            return;
        }

        if (currentStep === 2) {
            setIsSubmitDisabled(!Boolean(imageId && osId))
            return;
        }

        if (currentStep === 3) {
            setIsSubmitDisabled(!Boolean(instance))
            return;
        }

    }, [currentStep, configId, flavorId, imageId, osId, instance])


    useEffect(() => {
        if (currentStep === totalSteps - 1) {
            setIsSubmit(true);
        } else {
            setIsSubmit(false);
        }
    }, [currentStep])



    const prevStep = () => {
        setCurrentStep(currentStep => currentStep - 1)
    }

    const submitStep = () => {

        if (currentStep === totalSteps - 1) {
            setIsLoading(true)
            postCreateVPS(auth?.data?.token ?? '', {
                config_id: configId as number,
                description,
                flavorId: flavorId as string,
                imageId: imageId as string,
                instance,
                os_id: osId as number,
                userId: currentUser?.id as number,
            }).then(() => { setIsLoading(false); setCurrentStep(step => step + 1); setIsSubmit(false) }).catch(() => {
                setIsLoading(false)
                setCurrentStep(step => step + 1); setIsSubmit(false);
                setIsError(true)
            })
            return
        }

        if (currentStep !== totalSteps) {
            setCurrentStep(step => step + 1)
        } else {
            navigate('/vps/list')
        }
    }



    return (
        <Content>
            <div
                className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
                id='kt_create_account_stepper'
            >
                {/* begin::Aside*/}
                <div className='card d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px w-xxl-400px me-9'>
                    {/* begin::Wrapper*/}
                    <div className='card-body px-6 px-lg-10 px-xxl-15 py-20'>
                        {/* begin::Nav*/}
                        <div className='stepper-nav'>
                            {/* begin::Step 1*/}
                            <div className={`stepper-item ${currentStep === 1 ? 'current' : ''}`} data-kt-stepper-element='nav'>
                                {/* begin::Wrapper*/}
                                <div className='stepper-wrapper'>
                                    {/* begin::Icon*/}
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>1</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3 className='stepper-title'>VPS configuration</h3>

                                        <div className='stepper-desc fw-semibold'>Choose your VPS configuration</div>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                {/* end::Wrapper*/}

                                {/* begin::Line*/}
                                <div className='stepper-line h-40px'></div>
                                {/* end::Line*/}
                            </div>
                            {/* end::Step 1*/}

                            {/* begin::Step 2*/}
                            <div className={`stepper-item ${currentStep === 2 ? 'current' : ''}`} data-kt-stepper-element='nav'>
                                {/* begin::Wrapper*/}
                                <div className='stepper-wrapper'>
                                    {/* begin::Icon*/}
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>2</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3 className='stepper-title'>Operating System</h3>
                                        <div className='stepper-desc fw-semibold'>Choose your operating system</div>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                {/* end::Wrapper*/}

                                {/* begin::Line*/}
                                <div className='stepper-line h-40px'></div>
                                {/* end::Line*/}
                            </div>
                            {/* end::Step 2*/}

                            {/* begin::Step 3*/}
                            <div className={`stepper-item ${currentStep === 3 ? 'current' : ''}`} data-kt-stepper-element='nav'>
                                {/* begin::Wrapper*/}
                                <div className='stepper-wrapper'>
                                    {/* begin::Icon*/}
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>3</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3 className='stepper-title'>Name and description</h3>
                                        <div className='stepper-desc fw-semibold'>Setup your VPS' name and description</div>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                {/* end::Wrapper*/}

                                {/* begin::Line*/}
                                <div className='stepper-line h-40px'></div>
                                {/* end::Line*/}
                            </div>
                            {/* end::Step 3*/}


                            {/* begin::Step 5*/}
                            <div className={`stepper-item ${currentStep === 4 ? 'current' : ''}`} data-kt-stepper-element='nav'>
                                {/* begin::Wrapper*/}
                                <div className='stepper-wrapper'>
                                    {/* begin::Icon*/}
                                    <div className='stepper-icon w-40px h-40px'>
                                        <i className='stepper-check fas fa-check'></i>
                                        <span className='stepper-number'>4</span>
                                    </div>
                                    {/* end::Icon*/}

                                    {/* begin::Label*/}
                                    <div className='stepper-label'>
                                        <h3 className='stepper-title'>Completed</h3>
                                    </div>
                                    {/* end::Label*/}
                                </div>
                                {/* end::Wrapper*/}
                            </div>
                            {/* end::Step 5*/}
                        </div>
                        {/* end::Nav*/}
                    </div>
                    {/* end::Wrapper*/}
                </div>
                {/* begin::Aside*/}

                <div className='d-flex flex-row-fluid flex-center bg-body rounded'>
                    <Formik initialValues={{}} onSubmit={submitStep}>
                        {() => {
                            if (isLoading) {
                                return <Loader />
                            }

                            return (
                                <Form className='py-20 w-100 w-xl-700px px-9' noValidate id='kt_create_account_form' placeholder={{}} >
                                    <div className={`${currentStep === 1 ? 'current' : ''}`} data-kt-stepper-element='content'>
                                        <Config flavorId={flavorId} configId={configId} setFlavorId={setFlavorId} setConfigId={setConfigId} configList={configList} />
                                    </div>

                                    <div className={`${currentStep === 2 ? 'current' : ''}`} data-kt-stepper-element='content'>
                                        <OperatingSystem imageId={imageId} distributionId={distributionId} osId={osId} setDistributionId={setDistributionId} setOsId={setOsId} setImageId={setImageId} distributionList={distributionList} OSList={OSList} />
                                    </div>

                                    <div className={`${currentStep === 3 ? 'current' : ''}`} data-kt-stepper-element='content'>
                                        <NameAndDescription instance={instance} description={description} setInstance={setInstance} setDescription={setDescription} />
                                    </div>

                                    <div className={`${currentStep === 4 ? 'current' : ''}`} data-kt-stepper-element='content'>
                                        <Congrats isError={isError} />
                                    </div>

                                    <div className='d-flex flex-stack pt-10'>
                                        < div className='mr-2'>
                                            <button
                                                disabled={currentStep >= totalSteps || currentStep <= 1}
                                                onClick={prevStep}
                                                type='button'
                                                className='btn btn-lg btn-light-primary me-3'
                                            >
                                                <KTIcon iconName='arrow-left' className='fs-4 me-1' />
                                                Back
                                            </button>
                                        </div>

                                        <div>
                                            <button type='submit' className='btn btn-lg btn-primary me-3' disabled={isSubmitDisabled}>
                                                <span className='indicator-label'>
                                                    {isSubmit ? 'Submit' : 'Continue'}
                                                    <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Content >
    )
}

