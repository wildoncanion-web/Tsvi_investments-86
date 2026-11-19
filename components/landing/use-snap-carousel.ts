"use client"

import { useCallback, useRef, useState } from "react"

export function useSnapCarousel<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    const center = el.scrollLeft + el.clientWidth / 2
    let closest = 0
    let smallest = Number.POSITIVE_INFINITY
    Array.from(el.children).forEach((child, index) => {
      const node = child as HTMLElement
      const distance = Math.abs(node.offsetLeft + node.offsetWidth / 2 - center)
      if (distance < smallest) {
        smallest = distance
        closest = index
      }
    })
    setActiveIndex(closest)
  }, [])

  const scrollTo = useCallback((index: number) => {
    const el = ref.current
    const child = el?.children[index] as HTMLElement | undefined
    if (!el || !child) return
    el.scrollTo({ left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2, behavior: "smooth" })
  }, [])

  return { ref, activeIndex, onScroll, scrollTo }
}
