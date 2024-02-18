type Props = {
    isError: boolean;
}

export const Congrats = ({ isError }: Props) => {
    return isError ? <div>Error while creating the VPS.<br />Click continue to return to the VPS list</div> : <div>VPS created successfully.<br />Click continue to return to the VPS list</div>
}