import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"

function Carousel({ children, containerKey, loadMore, loading }) {
    const containerRef = useRef(null)
    const thumbRef = useRef(null)
    const [thumbStyle, setThumbStyle] = useState({ width: "0px", left: "0px", opacity: 0 })
    const [canScroll, setCanScroll] = useState(false)

    const location = useLocation()
    const notHome = location.pathname !== "/"

    const updateScrollThumb = () => {
        const container = containerRef.current
        const thumb = thumbRef.current
        if (!container || !thumb) return

        const track = thumb.parentElement
        const area = container.parentElement
        const trackWidth = area ? area.clientWidth : track ? track.clientWidth : 0
        const scrollableWidth = Math.max(0, container.scrollWidth - container.clientWidth)
        const scrollable = scrollableWidth > 1 && trackWidth > 0

        setCanScroll(scrollable)

        if (!scrollable) {
            if (container.scrollLeft !== 0) {
                container.scrollLeft = 0
            }
            setThumbStyle({ width: "0px", left: "0px", opacity: 0 })
            return
        }

        const clampedScrollLeft = Math.min(container.scrollLeft, scrollableWidth)
        if (clampedScrollLeft !== container.scrollLeft) {
            container.scrollLeft = clampedScrollLeft
        }

        const thumbWidth = Math.max(36, trackWidth * (container.clientWidth / container.scrollWidth))
        const ratio = clampedScrollLeft / scrollableWidth
        const thumbLeft = ratio * Math.max(0, trackWidth - thumbWidth)

        setThumbStyle({ width: `${thumbWidth}px`, left: `${thumbLeft}px`, opacity: 1 })
    }

    useEffect(() => {
        window.addEventListener("resize", updateScrollThumb)
        return () => {
            window.removeEventListener("resize", updateScrollThumb)
        }
    }, [])

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        updateScrollThumb()

        const resizeObserver = new ResizeObserver(updateScrollThumb)
        resizeObserver.observe(container)

        const mutationObserver = new MutationObserver(updateScrollThumb)
        mutationObserver.observe(container, {
            childList: true,
            subtree: true,
        })

        return () => {
            resizeObserver.disconnect()
            mutationObserver.disconnect()
        }
    }, [containerKey, children])

    const scrollCategory = (direction) => {
        const container = containerRef.current
        if (!container) return

        const firstCard = container.querySelector(".card")
        const cardWidth = firstCard ? firstCard.getBoundingClientRect().width + 32 : 320
        console.log(cardWidth)
        const maxScrollLeft = container.scrollWidth - container.clientWidth

        if (maxScrollLeft <= 0) return

        const currentLeft = container.scrollLeft
        const nextLeft = direction === "left" ? currentLeft - cardWidth : currentLeft + cardWidth

        if (direction === "left") {
            if (currentLeft <= 1) {
                container.scrollTo({ left: maxScrollLeft, behavior: "smooth" })
                return
            }
            if (nextLeft <= 0) {
                container.scrollTo({ left: 0, behavior: "smooth" })
                return
            }
        } else {
            /* if (currentLeft >= maxScrollLeft - 1) {
                container.scrollTo({ left: 0, behavior: "smooth" })
                return
            } */
            if (currentLeft >= maxScrollLeft - 1) {
                loadMore?.()
                return
            }
            /* if (nextLeft >= maxScrollLeft) {
                container.scrollTo({ left: maxScrollLeft, behavior: "smooth" })
                return
            } */
            if (nextLeft >= maxScrollLeft) {
                loadMore?.()
                container.scrollTo({
                    left: maxScrollLeft,
                    behavior: "smooth",
                })
                return
            }
        }

        container.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" })
    }
    const handleScroll = () => {
        updateScrollThumb()

        const container = containerRef.current
        if (!container) return

        const isNearEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 100
        console.log("scroll")
        console.log(isNearEnd)
        if (isNearEnd && !loading) {
            loadMore?.()
        }
    }
    return (
        <div className={`carousel-container ${notHome ? "not-home" : ""}`}>
            <div className={`category-nav${canScroll ? "" : " category-nav-no-scroll"}`}>
                <button className="category-nav-btn" onClick={() => scrollCategory("left")} aria-label="Scroll left" hidden={!canScroll}>
                    <span className="category-nav-btn-icon-before"></span>
                </button>
                <div className="category-scroll-area">
                    <div
                        ref={containerRef}
                        data-scroll-container={containerKey}
                        className={`category-items ${canScroll ? "" : " category-items-center"} ${notHome ? "not-home-content" : ""}`}
                        onScroll={handleScroll}
                    >
                        {children}
                    </div>
                    <div className="category-scrollbar" hidden={!canScroll}>
                        <div ref={thumbRef} className="custom-scroll-thumb" style={thumbStyle} />
                    </div>
                </div>
                <button className="category-nav-btn" onClick={() => scrollCategory("right")} aria-label="Scroll right" hidden={!canScroll}>
                    <span className="category-nav-btn-icon-after"></span>
                </button>
            </div>
        </div>
    )
}

export default Carousel
