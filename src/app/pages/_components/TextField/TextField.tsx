import { useRef, useEffect } from "react";

type Props = { value?: string; onValidChange?: (isValid: boolean) => void; isRequired?: boolean; description?: string; errorMessage: string; label: string; onChange: (v: string) => void; validator?: (str?: string) => boolean; }

export const TextField = ({ value, description, isRequired, errorMessage, onChange, onValidChange, label, validator = () => true }: Props) => {
    const hasChanged = useRef<boolean>();

    useEffect(() => {
        if (!hasChanged.current && value !== undefined && value !== '') {
            hasChanged.current = true;
        }

        onValidChange?.(validator?.(value) ?? true)
    }, [value])

    return <div className='fv-row mb-10'>
        <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
            <span className={isRequired ? 'required' : ''}>{label}</span>
            {description && <i
                className='fas fa-exclamation-circle ms-2 fs-7'
                data-bs-toggle='tooltip'
                title={description}
            ></i>}
        </label>
        <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            name='appname'
            placeholder=''
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            autoComplete="off"
        />
        {hasChanged.current && !validator(value) && <div className='fv-plugins-message-container'>
            <div data-field='appname' data-validator='notEmpty' className='fv-help-block'>
                Invalid {label}
                {errorMessage && <><br />{errorMessage}</>}
            </div>
        </div>}
    </div >
}
