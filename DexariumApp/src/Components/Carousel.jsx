import { useEffect, useRef, useState } from "react"

function Carousel({ children, containerKey }) {
    const containerRef = useRef(null)
    const thumbRef = useRef(null)
    const [thumbStyle, setThumbStyle] = useState({ width: "0px", left: "0px", opacity: 0 })

    const updateScrollThumb = () => {
        const container = containerRef.current
        const thumb = thumbRef.current
        if (!container || !thumb) return

        const track = thumb.parentElement
        const trackWidth = track ? track.clientWidth : 0
        const scrollableWidth = Math.max(0, container.scrollWidth - container.clientWidth)

        if (scrollableWidth <= 1 || trackWidth <= 0) {
            setThumbStyle({ width: "0px", left: "0px", opacity: 0 })
            return
        }

        const thumbWidth = Math.max(36, trackWidth * (container.clientWidth / container.scrollWidth))
        const ratio = container.scrollLeft / scrollableWidth
        const thumbLeft = ratio * Math.max(0, trackWidth - thumbWidth)

        setThumbStyle({ width: `${thumbWidth}px`, left: `${thumbLeft}px`, opacity: 1 })
    }

    useEffect(() => {
        window.addEventListener("resize", updateScrollThumb)
        updateScrollThumb()

        return () => {
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
        <div className="carousel-container">
            <div className="category-nav">
                <button className="category-nav-btn" onClick={() => scrollCategory("left")} aria-label="Scroll left">
                    <span className="category-nav-btn-icon-before"></span>
                </button>
                <div className="category-scroll-area">
                    <div ref={containerRef} data-scroll-container={containerKey} className="category-items" onScroll={updateScrollThumb}>
                        {children}
                    </div>
                    <div className="category-scrollbar">
                        <div ref={thumbRef} className="custom-scroll-thumb" style={thumbStyle} />
                    </div>
                </div>
                <button className="category-nav-btn" onClick={() => scrollCategory("right")} aria-label="Scroll right">
                    <span className="category-nav-btn-icon-after"></span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
