import { useState } from "react"
import { FILTER_CONFIG } from "../Utils/FilterConfig"

function FilterList({ categories, onFiltersChange, selectedCategory }) {
    const [activeSection, setActiveSection] = useState(null)
    const [activeGroup, setActiveGroup] = useState({})
    const [selectedFilters, setSelectedFilters] = useState({})

    const allItems = Object.fromEntries(categories.map(({ key, items }) => [key, items || []]))
    const sortTextValues = (values) => [...new Set(values.filter((value) => value != null && value !== ""))].sort((a, b) => String(a).localeCompare(String(b)))
    const sortNumberValues = (values) => [...new Set(values.filter((value) => value != null && value !== ""))].sort((a, b) => Number(a) - Number(b))

    const buildFilterValues = (items, filter) => {
        const values = items.flatMap((item) => {
            const value = item[filter.key]
            return Array.isArray(value) ? value : [value]
        })
        return filter.type === "number" ? sortNumberValues(values) : sortTextValues(values)
    }

    const filterSections = Object.entries(FILTER_CONFIG)
        .filter(([key]) => !selectedCategory || key === selectedCategory)
        .map(([key, config]) => ({
            key,
            title: config.title,
            filters: config.filters.map((filter) => ({
                ...filter,
                values: buildFilterValues(allItems[key], filter),
            })),
        }))

    const formatTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")

    const handleFilterChange = (fullKey, value, checked) => {
        const nextFilters = { ...selectedFilters }
        nextFilters[fullKey] = checked ? [...(nextFilters[fullKey] || []), value] : (nextFilters[fullKey] || []).filter((item) => item !== value)
        if (nextFilters[fullKey].length === 0) delete nextFilters[fullKey]
        setSelectedFilters(nextFilters)
        onFiltersChange?.(nextFilters)
    }

    const currentSection = filterSections.find((section) => section.key === activeSection)
    const currentGroup = currentSection?.filters.find((filter) => filter.key === activeGroup[currentSection.key])

    return (
        <div className="filters-container">
            <h5>Filters:</h5>
            <div className="section-list">
                {filterSections.map((section) => {
                    const isActive = activeSection === section.key
                    return (
                        <div key={section.key} className="filter-section">
                            <button type="button" className={`filter-section-title ${isActive ? "filter-section-title-active" : ""}`} onClick={() => {
                                setActiveSection((prev) => {
                                    const next = prev === section.key ? null : section.key
                                    if (next !== prev) setActiveGroup({})
                                    return next
                                })
                            }}>
                                {formatTitle(section.title)}
                            </button>
                        </div>
                    )
                })}
            </div>

            {currentSection && (
                <div className="group-list">
                    {currentSection.filters.map((filter) => {
                        const isGroupOpen = activeGroup[currentSection.key] === filter.key
                        return (
                            <div key={filter.key} className="filter-group">
                                <button type="button" className={`filter-group-title ${isGroupOpen ? "filter-group-title-active" : ""}`} onClick={() => setActiveGroup((prev) => ({ ...prev, [currentSection.key]: prev[currentSection.key] === filter.key ? null : filter.key }))}>
                                    {filter.label}
                                </button>
                            </div>
                        )
                    })}
                </div>
            )}

            {currentGroup && (
                <div className="filter-options">
                    {currentGroup.values.map((value) => {
                        const fullKey = `${currentSection.key}.${currentGroup.key}`
                        const checked = (selectedFilters[fullKey] || []).includes(value)
                        return (
                            <label key={String(value)} className={`filter-checkbox ${checked ? "filter-checkbox-active" : ""}`}>
                                <input type="checkbox" checked={checked} onChange={(event) => handleFilterChange(fullKey, value, event.target.checked)} />
                                {String(value)}
                            </label>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default FilterList
