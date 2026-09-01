import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

export default function Dashboard() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
        } catch {
            // proceed regardless
        }
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b bg-white px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Dashboard</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Welcome back, {user?.name}!
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            You are logged in as <strong>{user?.email}</strong>.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
