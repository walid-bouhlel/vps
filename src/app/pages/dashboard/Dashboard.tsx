import { useAuth } from "../../modules/auth"
import { DashboadAdmin } from "./dashboard-admin/DashboardAdmin";
import { DashboadUser } from "./dashboard-user/DashboardUser";

export const Dashboard = () => {
    const { currentUser } = useAuth()

    return currentUser?.is_admin === 1 ? <DashboadAdmin /> : <DashboadUser />;
}