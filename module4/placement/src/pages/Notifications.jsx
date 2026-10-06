import { useState } from "react";
import { notifications } from "../data/mockData";

function Notifications() {
    const [filter, setFilter] = useState("All");

    const filters = [
        { label: "All", value: "All" },
        { label: "Interviews", value: "interview" },
        { label: "Companies", value: "company" },
        { label: "Announcements", value: "announcement" },
        { label: "Deadlines", value: "deadline" },
    ];

    const filteredNotifications =
        filter === "All"
            ? notifications
            : notifications.filter(
                  (notification) =>
                      notification.type === filter
              );

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        UPDATES & ALERTS
                    </span>

                    <h1>Notifications</h1>

                    <p>
                        Stay updated with your placement activities
                        and important announcements.
                    </p>
                </div>

                <div className="job-count">
                    <strong>
                        {filteredNotifications.length}
                    </strong>
                    <span>Notifications</span>
                </div>
            </div>

            <div className="notification-filters">
                {filters.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        className={
                            filter === item.value
                                ? "notification-filter active"
                                : "notification-filter"
                        }
                        onClick={() =>
                            setFilter(item.value)
                        }
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {filteredNotifications.length === 0 ? (
                <div className="empty-state">
                    <div>♢</div>

                    <h2>No Notifications</h2>

                    <p>
                        There are no notifications in this category
                        right now.
                    </p>
                </div>
            ) : (
                <section className="dashboard-panel notifications-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>Recent Notifications</h2>

                            <p>
                                Important updates from your
                                placement cell.
                            </p>
                        </div>

                        <span className="notification-total">
                            {filteredNotifications.length} Updates
                        </span>
                    </div>

                    <div className="notifications-list">
                        {filteredNotifications.map(
                            (notification) => (
                                <div
                                    className="notification-page-item"
                                    key={notification.id}
                                >
                                    <div
                                        className={`notification-icon ${notification.type}`}
                                    >
                                        {notification.icon || "!"}
                                    </div>

                                    <div className="notification-page-content">
                                        <div className="notification-title-row">
                                            <h3>
                                                {
                                                    notification.title
                                                }
                                            </h3>

                                            <span>
                                                {
                                                    notification.time
                                                }
                                            </span>
                                        </div>

                                        <p>
                                            {
                                                notification.message
                                            }
                                        </p>

                                        <span
                                            className={`notification-category ${notification.type}`}
                                        >
                                            {notification.type ===
                                            "interview"
                                                ? "Interview"
                                                : notification.type ===
                                                  "company"
                                                ? "Company Update"
                                                : notification.type ===
                                                  "deadline"
                                                ? "Deadline"
                                                : "Announcement"}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}

export default Notifications;