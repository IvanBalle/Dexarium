import { useEffect, useRef } from "react"

function Scrollbar({ children, containerKey }) {
    const containerRef = useRef(null)
    const thumbRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        const thumb = thumbRef.current
        if (!container || !thumb) return

        const updateScrollThumb = () => {
            const maxScrollLeft = container.scrollWidth - container.clientWidth

            if (maxScrollLeft <= 0) {
                thumb.style.opacity = "0"
                return
            }

            const track = thumb.parentElement
            const trackWidth = track ? track.clientWidth : container.clientWidth
            const thumbWidth = Math.max(36, trackWidth * (container.clientWidth / container.scrollWidth))
            const ratio = container.scrollLeft / maxScrollLeft
            const thumbLeft = ratio * Math.max(0, trackWidth - thumbWidth)

            thumb.style.opacity = "1"
            thumb.style.width = `${thumbWidth}px`
            thumb.style.left = `${thumbLeft}px`
        }

        const handleScroll = () => {
            updateScrollThumb()
        }

        container.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", updateScrollThumb)
        updateScrollThumb()

        return () => {
            container.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", updateScrollThumb)
        }
    }, [])

    const scrollCategory = (direction) => {
        const container = containerRef.current
        if (!container) return

        const firstCard = container.querySelector(".card")
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 32 : 320
        const maxScrollLeft = container.scrollWidth - container.clientWidth

        if (maxScrollLeft <= 0) return

        const nextLeft = direction === "left" ? container.scrollLeft - cardWidth : container.scrollLeft + cardWidth

        if (nextLeft <= 0) {
            container.scrollTo({ left: maxScrollLeft, behavior: "smooth" })
            return
        }

        if (nextLeft >= maxScrollLeft) {
            container.scrollTo({ left: 0, behavior: "smooth" })
            return
        }

        container.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
    }

    return (
        <div className="category-nav">
            <button className="category-nav-btn" onClick={() => scrollCategory("left")} aria-label="Scroll left">
                ←
            </button>
            <div ref={containerRef} data-scroll-container={containerKey} className="category-items">
                {children}
            </div>
            <div className="category-scrollbar">
                <div ref={thumbRef} className="custom-scroll-thumb" />
            </div>
            <button className="category-nav-btn" onClick={() => scrollCategory("right")} aria-label="Scroll right">
                →
            </button>
        </div>
    )
}

export default Scrollbar
