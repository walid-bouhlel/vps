import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../modules/auth";
import { VPSModel, getVPSList } from "../../_requests/getVPSList";
import { Loader } from "../../../layout/components/loader/Loader";
import { ConfigModel, getConfigList } from "../../_requests/getConfigList";
import { PieChart } from "../../_components/PieChart/PieChart";
import { formatDateTime } from "../../_utils/date";
import { Link } from "react-router-dom";

export const DashboadUser = () => {
    const { auth, currentUser } = useAuth();

    const [VPSList, setVPSList] = useState<VPSModel[] | null>(null);
    const [ConfigList, setConfigList] = useState<ConfigModel[] | null>(null);

    useEffect(() => {
        if (!auth?.data.token) {
            return;
        }

        const token = auth.data.token;

        getVPSList(token).then(response => setVPSList(response.data)).catch(() => toast.error('Error Occured!'));
        getConfigList(token).then(response => setConfigList(response)).catch(() => toast.error('Error Occured!'));
    }, []);

    if (VPSList === null || ConfigList === null || currentUser === undefined) {
        return <Loader />
    }

    const VPSConfigurationsMap: Record<string, number> = VPSList.reduce((acc, { config_id }) => {
        const config = ConfigList.find(({ id }) => id === config_id)?.name ?? config_id;

        if (!acc[config]) {
            acc[config] = 0;
        }
        acc[config]++;
        return acc;
    }, {} as Record<string, number>);

    return <div className="container">
        <br />
        <div className="row">
            <div className="col card">
                <div className='card-body d-flex flex-center flex-column p-9'>
                    <div className='d-flex flex-center flex-row p-9' style={{ gap: 32 }}>
                        <img src={`https://ui-avatars.com/api/?name=${currentUser.name}`} />
                        <div>
                            <h2>{currentUser?.name}</h2>
                            <p>Created at: {formatDateTime(currentUser?.created_at)}</p>
                        </div>
                    </div>
                    <p>Click <Link to="/profile">here</Link> to see the full profile information</p>
                </div>
            </div>
            <div style={{ width: 32 }}></div>
            <div className="col card">
                <div className='card-body d-flex flex-center flex-column p-9'>
                    <div className='d-flex flex-center flex-row p-9'>
                        Use your public/private key pair to connect to any reserved VPS instance
                    </div>
                    <p>Click <Link to="/keys">here</Link> to go to the key pairs list</p>
                </div>
            </div>
        </div>
        <br />
        <div className="row">
            <div className='card'>
                <div className='card-body d-flex flex-center flex-column p-9'>
                    <h2>Reserved VPS by configuration <small style={{ fontSize: 14, color: '#7f8c8d' }}>({VPSList.length} total)</small></h2>
                    <div style={{ width: '100%', height: '500px' }}>
                        <PieChart data={Object.entries(VPSConfigurationsMap).map(([config, count]) => (
                            {
                                "id": config,
                                "label": config,
                                "value": count,
                            }
                        ))} />
                    </div>
                </div>
            </div>
        </div>
        <br />
        <Toaster position="bottom-right" reverseOrder={false} />
    </div>
}