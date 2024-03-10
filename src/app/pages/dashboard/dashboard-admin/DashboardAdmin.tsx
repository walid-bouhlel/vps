import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast";

import { UserModel, getUserList } from "../../_requests/getUsersList"
import { DistributionModel, getDistributionList } from "../../_requests/getDistributionList";
import { OSModel, getOSList } from "../../_requests/getOSList";
import { ConfigModel, getConfigList } from "../../_requests/getConfigList";
import { PieChart } from "../../_components/PieChart/PieChart";
import { Loader } from "../../../layout/components/loader/Loader";
import { useAuth } from "../../../modules/auth";
import { Link } from "react-router-dom";
import { SwarmPlot } from "../../_components/SwarmPlot/SwarmPlot";
import { VPSModel, getVPSListAll } from "../../_requests/getVPSListAll";


export const DashboadAdmin = () => {
    const { auth } = useAuth();

    const [VPSList, setVPSList] = useState<VPSModel[] | null>(null);
    const [userList, setUserList] = useState<UserModel[] | null>(null);
    const [distributionList, setDistributionList] = useState<DistributionModel[] | null>(null);
    const [OSList, setOSList] = useState<OSModel[] | null>(null);
    const [ConfigList, setConfigList] = useState<ConfigModel[] | null>(null);

    useEffect(() => {
        if (!auth?.data.token) {
            return;
        }

        const token = auth.data.token;

        getVPSListAll(token).then(response => setVPSList(response.data)).catch(() => toast.error('Error Occured!'));
        getUserList(token).then(response => setUserList(response.data)).catch(() => toast.error('Error Occured!'));
        getDistributionList(token).then(response => setDistributionList(response.data)).catch(() => toast.error('Error Occured!'));
        getOSList(token).then(response => setOSList(response)).catch(() => toast.error('Error Occured!'));
        getConfigList(token).then(response => setConfigList(response)).catch(() => toast.error('Error Occured!'));
    }, []);


    if (userList === null || distributionList === null || OSList === null || ConfigList === null || VPSList === null) {
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

    const VPSOSMap: Record<string, number> = VPSList.reduce((acc, { os_id }) => {
        const os = OSList.find(({ id }) => id === os_id)?.name ?? os_id;
        const distributionId = OSList.find(({ id }) => id === os_id)?.distribution_id;
        const distribution = distributionList.find(({ id }) => id === distributionId)?.name;

        const label = `${distribution} (${os})`;

        if (!acc[label]) {
            acc[label] = 0;
        }
        acc[label]++;
        return acc;
    }, {} as Record<string, number>);

    const userTypesData: ({ id: string; label: string; value: number; color: string; })[] = [
        {
            "id": "admin",
            "label": "Admin users",
            "value": userList?.filter(({ is_admin }) => is_admin === 1).length,
            "color": "hsl(247, 70%, 50%)"
        },
        {
            "id": "non-admin",
            "label": "Non admin users",
            "value": userList?.filter(({ is_admin }) => is_admin === 0).length,
            "color": "hsl(152, 70%, 50%)"
        },
    ];

    return <div className="container">
        <br />
        <div className='card'>
            <div className='card-body d-flex flex-center flex-column p-9'>
                <h2>VPS by configuration <small style={{ fontSize: 14, color: '#7f8c8d' }}>({VPSList.length} total)</small></h2>
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
        <br />
        <div className='card'>
            <div className='card-body d-flex flex-center flex-column p-9'>
                <h2>VPS by OS <small style={{ fontSize: 14, color: '#7f8c8d' }}>({VPSList.length} total)</small></h2>
                <div style={{ width: '100%', height: '500px' }}>
                    <PieChart data={Object.entries(VPSOSMap).map(([osLabel, count]) => (
                        {
                            "id": osLabel,
                            "label": osLabel,
                            "value": count,
                        }
                    ))} />
                </div>
            </div>
        </div>
        <br />
        <div className='card'>
            <div className='card-body d-flex flex-center flex-column p-9'>
                <h2>Users <small style={{ fontSize: 14, color: '#7f8c8d' }}>({userList.length} total)</small></h2>
                <div style={{ width: '100%', height: '500px' }}>
                    <PieChart data={userTypesData} />
                </div>
                <p style={{ margin: '24px' }}>Click <Link to="/admin/user-management">here</Link> to see the full users list</p>
            </div>
        </div>
        <br />
        <div className='card'>
            <div className='card-body d-flex flex-center flex-column p-9'>
                <h2>Distributions and operating systems</h2>
                <div style={{ width: '100%', height: '500px' }}>
                    <SwarmPlot groups={distributionList.map(({ name }) => name)} data={OSList.map(({ name, distribution_id }, i) => ({
                        "id": `${name}`,
                        "group": distributionList.find(({ id }) => id === distribution_id)?.name,
                        "price": ((i + 1) * 10) + 50,
                        "volume": 50
                    }))} />
                </div>
                <p style={{ marginTop: '24px' }}>Click <Link to="/distribution/list">here</Link> to see the full distribution list</p>
                <p style={{ marginBottom: '24px' }}>Click <Link to="/os/list">here</Link> to see the full OS list</p>
            </div>
        </div>
        <Toaster position="bottom-right" reverseOrder={false} />
    </div>
}