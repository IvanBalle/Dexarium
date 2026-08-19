import { useEffect, useState } from "react"

export function useFetch(fetchFunction, getId = item => item.id) {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)

            try {
                const results = await fetchFunction(page)

                if (!Array.isArray(results)) return

                setData(prev => {
                    const ids = new Set(prev.map(getId))

                    return [
                        ...prev,
                        ...results.filter(item => !ids.has(getId(item)))
                    ]
                })
            }
            catch(err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [page, fetchFunction])


    const loadMore = () => {
        console.log("loadMore")
        if (loading) return

        setPage(prev => prev + 1)
    }
    

    return {
        data,
        loadMore,
        loading,
    }
}
