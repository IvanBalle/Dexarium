export function matchesFilters(item, filterKey, selectedValues) {
    if (!selectedValues.length) return true;

    const value = item[filterKey];

    if (Array.isArray(value)) {
        return selectedValues.some(selected => value.includes(selected));
    }

    return selectedValues.includes(value);
}