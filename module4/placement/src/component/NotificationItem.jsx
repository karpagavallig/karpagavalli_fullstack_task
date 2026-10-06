function NotificationItem({ notification }) {
    const iconType = notification.type || "announcement";

    return (
        <div className="notification-item">
            <div className={`notification-icon ${iconType}`}>
                {notification.icon || "!"}
            </div>

            <div className="notification-content">
                <strong>{notification.title}</strong>

                <p>{notification.message}</p>

                <span>{notification.time}</span>
            </div>

            <div className="notification-arrow">
                →
            </div>
        </div>
    );
}

export default NotificationItem;