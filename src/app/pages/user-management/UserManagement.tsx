import { useEffect, useState } from "react";
import { useAuth } from "../../modules/auth"
import { UserModel, getUserList } from "../_requests/getUsersList";
import { Loader } from "../../../_metronic/layout/components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { formatDateTime } from "../_utils/date";

import styles from './UserManagement.module.scss';
import { TextField } from "../_components/TextField/TextField";

enum UserType {
    ALL = -1,
    ADMIN = 1, // To match is_admin response
    NON_ADMIN = 0 // To match is_admin response
}

const optionStringToUserType = (option: string) => {
    if (option === 'admin') {
        return UserType.ADMIN;
    }

    if (option === 'non-admin') {
        return UserType.NON_ADMIN;
    }

    return UserType.ALL;
}

type ItemProps = { item: UserModel }

const Item = ({ item: { id, name, email, is_admin, created_at } }: ItemProps) => {

    return <tr>
        <td>
            <div className='d-flex align-items-center'>
                {id}
            </div>
        </td>
        <td>
            <div className='d-flex align-items-center'>
                {name}
            </div>
        </td>
        <td>
            <div className='d-flex align-items-center'>
                {email}
            </div>
        </td>
        <td>
            <span className={`text-muted fw-semibold text-muted d-block fs-7`}>
                {formatDateTime(created_at)}
            </span>

        </td>
        <td>
            <div className='d-flex align-items-center'>
                {Boolean(is_admin) && <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Admin</span>}
            </div>
        </td>
    </tr>
}

export const UserManagement = () => {
    const { auth } = useAuth();

    const [userList, setUserList] = useState<UserModel[] | null>(null);

    const [selectedUserType, setSelectedUserType] = useState<UserType>(UserType.ALL);

    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (auth?.data.token) {
            getUserList(auth.data.token).then((response) => { setUserList(response.data) }).catch(() => { toast.error('Error Occured!') });
        }
    }, [])

    if (userList === null) {
        return <Loader />
    }


    return <div className={`card`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
                <span className='card-label fw-bold fs-3 mb-1'>Users list</span>
                <span className='text-muted mt-1 fw-semibold fs-7'>List of the app's users</span>
            </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
            <TextField errorMessage="" label="Search by name or email" onChange={setSearchValue} value={searchValue} />
            <div className={styles.userTypeFilter}>
                <span>User type:</span>
                <select className="form-select form-select-solid" onChange={(e) => setSelectedUserType(optionStringToUserType(e.target.value))}>
                    <option selected value="all">All</option>
                    <option value="admin">Admins</option>
                    <option value="non-admin">Non admins</option>
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
                            <th className='min-w-150px'>Name</th>
                            <th className='ps-4 min-w-350px rounded-start'>Email</th>
                            <th className='min-w-125px'>Created At</th>
                            <th className='min-w-100px'></th>
                        </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody>
                        {userList.filter(({ is_admin }) => {
                            if (selectedUserType === UserType.ALL) {
                                return true;
                            }

                            if (selectedUserType === UserType.ADMIN && is_admin === 1) {
                                return true;
                            }

                            if (selectedUserType === UserType.NON_ADMIN && is_admin === 0) {
                                return true;
                            }

                            return false;
                        }).filter(({ name, email }) => {
                            if (searchValue.trim().length > 0) {
                                if (name.toLowerCase().includes(searchValue.trim().toLowerCase())) {
                                    return true;
                                }

                                if (email.toLowerCase().includes(searchValue.trim().toLowerCase())) {
                                    return true;
                                }

                                return false;
                            }

                            return true;
                        }).map(item => {
                            return <Item key={item.id} item={item} />
                        })}
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
            </div>
            {/* end::Table container */}
        </div >
        {/* begin::Body */}
        <Toaster position="bottom-right" reverseOrder={false} />
    </div >
}