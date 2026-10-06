function StatCard({ title, value, subtitle, icon, type }) {
    return (
        <article className="stat-card">
            <div className="stat-card-top">
                <div className={`stat-icon ${type}`}>
                    {icon}
                </div>

                <span className="stat-card-arrow">
                    ↗
                </span>
            </div>

            <h3>{value}</h3>

            <p>{title}</p>

            <span className="stat-subtitle">
                {subtitle}
            </span>
        </article>
    );
}

export default StatCard;