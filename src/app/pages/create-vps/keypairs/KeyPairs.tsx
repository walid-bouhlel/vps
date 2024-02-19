import { KTIcon } from "../../../../_metronic/helpers/components/KTIcon"
import { useAuth } from "../../../modules/auth"

type CardProps = {
    className: string
    color: string
    title: string
    description: string
    iconKey: string;
    data?: string;
    filename?: string;
}

const Card = ({ className, color, title, description, iconKey, data, filename }: CardProps) => {

    return (
        <div className={`card bg-light-${color} ${className}`}>
            {/* begin::Body */}
            <div className='card-body my-3'>

                <KTIcon iconName={iconKey} className={`text-${color} fs-3x ms-n1`} />

                <br />
                <br />

                <a href='#' className={`card-title fw-bold text-${color} fs-5 mb-3 d-block`}>
                    {description}
                </a>

                <div className='py-1'>
                    <span className='fw-semibold text-muted fs-7'>{title}</span>
                </div>

                <br />
                {data && <a download={filename} href={`data:text/plain;charset=utf-8,${encodeURIComponent(data)}`} className={`btn btn-sm fw-bold btn-${color}`}><KTIcon iconName="exit-down" className={`text-white fs-2x ms-n1`} /> Download</a>}
            </div>
            {/* end:: Body */}
        </div>
    )
}


export const KeyPairs = () => {
    const { currentUser } = useAuth();

    return <div className='row g-5 g-xl-12 p-3'>
        <div className='col-xl-6'>
            <Card
                className='card-xl-stretch mb-xl-8'
                color='primary'
                title="The VPS' public key that is stored in the VPS"
                description='Public key'
                iconKey='key'
                data={currentUser?.public_key}
                filename="key.pub"
            />
        </div>
        <div className='col-xl-6'>
            <Card
                className='card-xl-stretch mb-xl-8'
                color='dark'
                title="VPS' private key, use to connect to the VPS"
                description='Private key'
                iconKey='lock'
                data={currentUser?.private_key}
                filename="key.private"
            />
        </div>
    </div >
        ;
}