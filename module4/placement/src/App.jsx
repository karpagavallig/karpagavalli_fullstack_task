import { useEffect, useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Applications from "./pages/Applications";
import Interviews from "./pages/Interviews";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import { usePlacement } from "./context/PlacementContext";

function ProtectedLayout() {
    const { user, logout } = usePlacement();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="app-layout">
            <Sidebar
                open={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
            />

            <div className="main-area">
                <Navbar
                    onMenuClick={() =>
                        setSidebarOpen(true)
                    }
                />

                <main>
                    <Routes>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/jobs"
                            element={<Jobs />}
                        />

                        <Route
                            path="/jobs/:id"
                            element={<JobDetails />}
                        />

                        <Route
                            path="/applications"
                            element={<Applications />}
                        />

                        <Route
                            path="/interviews"
                            element={<Interviews />}
                        />

                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/logout"
                            element={
                                <Logout
                                    logout={logout}
                                />
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/dashboard"
                                    replace
                                />
                            }
                        />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

function Logout({ logout }) {
    useEffect(() => {
        logout();
    }, [logout]);

    return (
        <Navigate
            to="/"
            replace
        />
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/*"
                    element={<ProtectedLayout />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;