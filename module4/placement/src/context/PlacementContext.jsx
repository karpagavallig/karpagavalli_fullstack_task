import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { jobs as initialJobs } from "../data/mockData";

const PlacementContext = createContext(null);

export function PlacementProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("placeMateUser");

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch {
            return null;
        }
    });

    const [applications, setApplications] = useState(() => {
        try {
            const savedApplications =
                localStorage.getItem(
                    "placeMateApplications"
                );

            return savedApplications
                ? JSON.parse(savedApplications)
                : [];
        } catch {
            return [];
        }
    });

    const [jobs] = useState(initialJobs);

    /* -----------------------------
       SAVE LOGGED-IN USER
    ----------------------------- */

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                "placeMateUser",
                JSON.stringify(user)
            );
        } else {
            localStorage.removeItem("placeMateUser");
        }
    }, [user]);

    /* -----------------------------
       SAVE APPLICATIONS
    ----------------------------- */

    useEffect(() => {
        localStorage.setItem(
            "placeMateApplications",
            JSON.stringify(applications)
        );
    }, [applications]);

    /* -----------------------------
       LOGIN
    ----------------------------- */

    const login = (email, password) => {
        const registeredUser =
            localStorage.getItem(
                "placeMateRegisteredUser"
            );

        /*
         * Check registered account first
         */
        if (registeredUser) {
            try {
                const savedUser =
                    JSON.parse(registeredUser);

                if (
                    savedUser.email === email &&
                    savedUser.password === password
                ) {
                    const loggedUser = {
                        ...savedUser,
                    };

                    delete loggedUser.password;
                    delete loggedUser.confirmPassword;

                    setUser(loggedUser);

                    return {
                        success: true,
                        message: "Login successful.",
                    };
                }

                /*
                 * If the email belongs to an account
                 * but password is incorrect
                 */
                if (savedUser.email === email) {
                    return {
                        success: false,
                        message:
                            "Incorrect password. Please try again.",
                    };
                }
            } catch {
                // Ignore invalid saved data
            }
        }

        /*
         * Demo account
         */
        if (
            email === "student@placement.com" &&
            password === "123456"
        ) {
            const demoUser = {
                name: "Karpagavalli G",
                email: "student@placement.com",
                registerNo: "22CSE101",
                department: "CSE - AIML",
                cgpa: "8.75",
            };

            setUser(demoUser);

            return {
                success: true,
                message: "Login successful.",
            };
        }

        /*
         * Email does not exist
         */
        if (
            registeredUser === null &&
            email !== "student@placement.com"
        ) {
            return {
                success: false,
                message:
                    "No account found with this email. Please create an account first.",
            };
        }

        return {
            success: false,
            message:
                "Invalid email or password. Please check your credentials.",
        };
    };

    /* -----------------------------
       REGISTER
    ----------------------------- */

    const register = (userData) => {
        const existingUser =
            localStorage.getItem(
                "placeMateRegisteredUser"
            );

        /*
         * Check whether an account already exists
         */
        if (existingUser) {
            try {
                const savedUser =
                    JSON.parse(existingUser);

                if (
                    savedUser.email.toLowerCase() ===
                    userData.email.toLowerCase()
                ) {
                    return {
                        success: false,
                        message:
                            "An account with this email already exists. Please sign in.",
                    };
                }
            } catch {
                // Continue registration
            }
        }

        /*
         * Save the newly created account
         */
        localStorage.setItem(
            "placeMateRegisteredUser",
            JSON.stringify(userData)
        );

        /*
         * IMPORTANT:
         * Do NOT automatically log the user in.
         *
         * Registration should go to Sign In.
         */

        return {
            success: true,
            message:
                "Account created successfully. Please sign in.",
        };
    };

    /* -----------------------------
       LOGOUT
    ----------------------------- */

    const logout = () => {
        setUser(null);
    };

    /* -----------------------------
       UPDATE PROFILE
    ----------------------------- */

    const updateProfile = (updatedData) => {
        const updatedUser = {
            ...user,
            ...updatedData,
        };

        setUser(updatedUser);

        const registeredUser =
            localStorage.getItem(
                "placeMateRegisteredUser"
            );

        if (registeredUser) {
            try {
                const savedUser =
                    JSON.parse(registeredUser);

                const updatedRegisteredUser = {
                    ...savedUser,
                    ...updatedData,
                };

                localStorage.setItem(
                    "placeMateRegisteredUser",
                    JSON.stringify(
                        updatedRegisteredUser
                    )
                );
            } catch {
                // Ignore invalid registration data
            }
        }
    };

    /* -----------------------------
       APPLY FOR JOB
    ----------------------------- */

    const applyForJob = (jobId) => {
        if (!user) {
            return {
                success: false,
                message:
                    "Please login before applying.",
            };
        }

        const job = jobs.find(
            (item) => item.id === Number(jobId)
        );

        if (!job) {
            return {
                success: false,
                message:
                    "Job opportunity not found.",
            };
        }

        const alreadyApplied =
            applications.some(
                (application) =>
                    Number(application.jobId) ===
                    Number(jobId)
            );

        if (alreadyApplied) {
            return {
                success: false,
                message:
                    "You have already applied for this position.",
            };
        }

        const newApplication = {
            id: Date.now(),
            jobId: job.id,
            company: job.company,
            position: job.position,
            package: job.package,
            location: job.location,
            appliedDate:
                new Date().toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }
                ),
            status: "Under Review",
        };

        setApplications((previous) => [
            ...previous,
            newApplication,
        ]);

        return {
            success: true,
            message:
                "Application submitted successfully.",
            application: newApplication,
        };
    };

    /* -----------------------------
       REMOVE APPLICATION
    ----------------------------- */

    const removeApplication = (applicationId) => {
        setApplications((previous) =>
            previous.filter(
                (application) =>
                    application.id !==
                    applicationId
            )
        );
    };

    /* -----------------------------
       CHECK APPLICATION
    ----------------------------- */

    const hasApplied = (jobId) => {
        return applications.some(
            (application) =>
                Number(application.jobId) ===
                Number(jobId)
        );
    };

    const value = {
        user,
        jobs,
        applications,
        login,
        register,
        logout,
        updateProfile,
        applyForJob,
        removeApplication,
        hasApplied,
    };

    return (
        <PlacementContext.Provider value={value}>
            {children}
        </PlacementContext.Provider>
    );
}

export function usePlacement() {
    const context =
        useContext(PlacementContext);

    if (!context) {
        throw new Error(
            "usePlacement must be used inside PlacementProvider"
        );
    }

    return context;
}