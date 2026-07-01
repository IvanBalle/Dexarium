import { useState } from "react"
import DB from "../../Backend/Database.json"

function FilterList({ onFiltersChange, selectedCategory }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeGroup, setActiveGroup] = useState(null)
    const [activeGenreGroup, setActiveGenreGroup] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState({})
    const allItems = {
        games: DB.games || [],
        movies: DB.movies || [],
        anime: DB.anime || [],
        tvshows: DB.TVshows || [],
    }
    const sortTextValues = (values) => [...new Set(values.filter((value) => value != null))].sort((a, b) => String(a).localeCompare(String(b)))
    const sortNumberValues = (values) => [...new Set(values.filter((value) => value != null))].sort((a, b) => Number(a) - Number(b))

    const allFilters = {
        releaseYear: sortNumberValues(Object.values(allItems).flatMap((items) => items.map((item) => item.releaseYear))),
        country: sortTextValues(Object.values(allItems).flatMap((items) => items.map((item) => item.country))),
        publisher: sortTextValues(Object.values(allItems).flatMap((items) => items.map((item) => item.publisher))),
        genres: Object.fromEntries(Object.entries(allItems).map(([key, items]) => [key, sortTextValues(items.flatMap((item) => item.genres || []))])),
    }

    const activeItems = selectedCategory ? allItems[selectedCategory] : Object.values(allItems).flatMap((items) => items)
    const visibleFilters = {
        releaseYear: sortNumberValues(activeItems.map((item) => item.releaseYear)),
        country: sortTextValues(activeItems.map((item) => item.country)),
        ...(selectedCategory
            ? selectedCategory === "games"
                ? { publisher: sortTextValues(activeItems.map((item) => item.publisher)) }
                : {}
            : { publisher: sortTextValues(activeItems.map((item) => item.publisher)) }),
        genres: selectedCategory ? { [selectedCategory]: allFilters.genres[selectedCategory] } : allFilters.genres,
    }
    const handleFilterChange = (filterKey, value, checked) => {
        const nextFilters = { ...selectedFilters }

        if (!nextFilters[filterKey]) {
            nextFilters[filterKey] = []
        }

        if (checked) {
            nextFilters[filterKey] = [...nextFilters[filterKey], value]
        } else {
            nextFilters[filterKey] = nextFilters[filterKey].filter((item) => item !== value)
        }

        if (nextFilters[filterKey].length === 0) {
            delete nextFilters[filterKey]
        }

        setSelectedFilters(nextFilters)
        onFiltersChange?.(nextFilters)
    }

    return (
        <>
            <button className="filter-toggle-button" onClick={() => setIsOpen((prev) => !prev)}>
                Filters
            </button>

            {isOpen && (
                <div className="filter-list">
                    {Object.entries(visibleFilters).map(([groupName, values]) => {
                        const isActive = activeGroup === groupName

                        return (
                            <div key={groupName} id={groupName} className="filter-group">
                                <button type="button" className="filter-group-title" onClick={() => setActiveGroup((prev) => (prev === groupName ? null : groupName))}>
                                    {groupName}
                                </button>
                                {isActive && (
                                    <div className="filter-options">
                                        {Array.isArray(values)
                                            ? values.map((value) => (
                                                  <label key={value} className="filter-checkbox">
                                                      <input
                                                          type="checkbox"
                                                          checked={(selectedFilters[groupName] || []).includes(value)}
                                                          onChange={(event) => handleFilterChange(groupName, value, event.target.checked)}
                                                      />
                                                      {value}
                                                  </label>
                                              ))
                                            : Object.entries(values).map(([categoryKey, categoryValues]) => {
                                                  const isGenreActive = activeGenreGroup === categoryKey

                                                  return (
                                                      <div key={categoryKey} id={categoryKey} className="filter-subgroup">
                                                          <button
                                                              type="button"
                                                              className="filter-subgroup-title"
                                                              onClick={() => setActiveGenreGroup((prev) => (prev === categoryKey ? null : categoryKey))}
                                                          >
                                                              {categoryKey}
                                                          </button>
                                                          {isGenreActive && (
                                                              <div className="filter-options">
                                                                  {categoryValues.map((value) => (
                                                                      <label key={value} className="filter-checkbox">
                                                                          <input
                                                                              type="checkbox"
                                                                              checked={(selectedFilters[`genres:${categoryKey}`] || []).includes(value)}
                                                                              onChange={(event) => handleFilterChange(`genres:${categoryKey}`, value, event.target.checked)}
                                                                          />
                                                                          {value}
                                                                      </label>
                                                                  ))}
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
            )}
        </>
    )
}

export default FilterList
