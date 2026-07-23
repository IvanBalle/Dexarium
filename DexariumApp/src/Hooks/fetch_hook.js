import { useEffect, useState } from "react";

export function useFetch(fetchFunction) {

    const [data, setData] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const results = await fetchFunction();

            setData(results);
        }

        fetchData();

    }, [fetchFunction]);

    return data;
}