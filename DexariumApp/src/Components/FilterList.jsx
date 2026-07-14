import { useState } from "react"
import DB from "../../Backend/Database.json"
import { FILTER_CONFIG } from "../Utils/FilterConfig"

function FilterList({ onFiltersChange, selectedCategory }) {
    const [activeSection, setActiveSection] = useState(null)
    const [activeGroup, setActiveGroup] = useState({})
    const [selectedFilters, setSelectedFilters] = useState({})

    const allItems = {
        games: DB.games || [],
        movies: DB.movies || [],
        anime: DB.anime || [],
        tvshows: DB.TVshows || [],
    }
    const sortTextValues = (values) => [...new Set(values.filter((value) => value != null))].sort((a, b) => String(a).localeCompare(String(b)))
    const sortNumberValues = (values) => [...new Set(values.filter((value) => value != null))].sort((a, b) => Number(a) - Number(b))

    
    const buildFilterValues = (items, filter) => {
        const values = items.flatMap(item => {
            const value = item[filter.key];
            return Array.isArray(value) ? value : [value];
        });

        return filter.type === "number"
            ? sortNumberValues(values)
            : sortTextValues(values);
    }

    const buildFilterSections  = () => {
        return Object.entries(FILTER_CONFIG)
            .filter(([key]) => !selectedCategory || key === selectedCategory)
            .map(([key, config]) => {

                const items = selectedCategory
                    ? allItems[selectedCategory]
                    : allItems[key];

                return {

                    key,

                    title: config.title,

                    filters: config.filters.map(filter => ({

                        ...filter,

                        values: buildFilterValues(items, filter)

                    }))

                };

            });
    }
    
    const filterSections = buildFilterSections();
    const handleFilterChange = (fullKey, value, checked) => {
      
        const nextFilters = { ...selectedFilters }

        if (!nextFilters[fullKey]) {
            nextFilters[fullKey] = []
        }

        if (checked) {
            nextFilters[fullKey] = [...nextFilters[fullKey], value]
        } else {
            nextFilters[fullKey] = nextFilters[fullKey].filter((item) => item !== value)
        }

        if (nextFilters[fullKey].length === 0) {
            delete nextFilters[fullKey]
        }

        setSelectedFilters(nextFilters)
        onFiltersChange?.(nextFilters)
    }

   const formatTitle = text => text.charAt(0).toUpperCase() + text.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2");
    
    return (
        <div className="filters-container">  
            <h5>
                Filters:
            </h5>
            <div className="section-list">
                {filterSections.map((section) => {
                    const isActive = activeSection === section.key

                    return (
                        
                        <div key={section.key} id={section.key} className="filter-section">
                            <button type="button" className={`filter-section-title ${isActive ? "filter-section-title-active" : ""}`} onClick={() => setActiveSection(prev => prev === section.key ? null : section.key)}>
                                {formatTitle(section.title)}
                            </button>

                            {isActive && (
                                <div className="group-list">
                                    {section.filters.map(filter => {
                                        const isGroupOpen = activeGroup[section.key] === filter.key;

                                        return(
                                            <div key={filter.key} className="filter-group">
                                                <button  className={`filter-group-title ${isGroupOpen ? "filter-group-title-active" : ""}`} onClick={() => setActiveGroup(prev => ({ ...prev, [section.key]: prev[section.key] === filter.key ? null : filter.key })) }>
                                                    {filter.label}
                                                </button>
                                                {isGroupOpen && ( 
                                                    <div className="filter-options">
                                                        {filter.values.map(value => {
                                                            const fullKey = `${section.key}.${filter.key}`;
                                                            const checked = (selectedFilters[fullKey] || []).includes(value);

                                                            return (
                                                                <label key={value} className={`filter-checkbox ${checked ? "filter-checkbox-active" : ""}`}>
                                                                <input type="checkbox" checked={checked} onChange={(event) =>  handleFilterChange(fullKey, value, event.target.checked)}/>
                                                                {value}
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>    
        </div>
        
            
    )
}


export default FilterList
