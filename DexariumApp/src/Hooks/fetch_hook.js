import { useEffect, useState } from "react"

export function useFetch(fetchFunction) {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)

            const results = await fetchFunction(page)

            setData((prev) => [...prev, ...results])

            setLoading(false)
        }

        fetchData()
    }, [page, fetchFunction])

    const loadMore = () => {
        console.log("loadMore")
        if (!loading) {
            setPage((prev) => prev + 1)
        }
    }

    return {
        data,
        loadMore,
        loading,
    }
}
