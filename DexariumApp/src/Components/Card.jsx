//import React from "react";

function Card({ item = {}, titleKey = "name" }) {
    if (!item || typeof item !== "object") {
        return null
    }

    const title = item[titleKey] || item.title || item.name || Object.values(item).find((value) => typeof value === "string")
    const entries = Object.entries(item).filter(([key]) => !["title", "name", "image", "icon", "synopsis"].includes(key))

    return (
        <article className="card">
            {(item.image || item.icon) && (
                <div className="card-media">
                    <img src={item.image || item.icon} alt={title || "item"} />
                </div>
            )}

            {title && <h2 className="card-title">{title}</h2>}

            <dl className="card-details">
                {entries.map(([key, value]) => (
                    <div key={key} className="card-detail">
                        <dt>{key}</dt>
                        <dd>{String(value)}</dd>
                    </div>
                ))}
            </dl>
        </article>
    )
}

export default Card
