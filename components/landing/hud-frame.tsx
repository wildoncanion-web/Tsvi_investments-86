import type { CSSProperties, HTMLAttributes, ReactNode } from "react"
import styles from "./hud-frame.module.css"

type HudFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  contentClassName?: string
  active?: boolean
  variant?: "default" | "highlight"
  fill?: string
  showTab?: boolean
  style?: CSSProperties
}

export function HudFrame({
  children,
  className = "",
  contentClassName = "",
  active = false,
  variant = "default",
  fill,
  showTab = true,
  style,
  ...rest
}: HudFrameProps) {
  const frameStyle = fill ? ({ ...style, "--frame-fill": fill } as CSSProperties) : style

  return (
    <div
      className={`${styles.frame} ${className}`}
      data-active={active}
      data-variant={variant}
      style={frameStyle}
      {...rest}
    >
      <span aria-hidden="true" className={styles.edge} />
      <span aria-hidden="true" className={styles.fill} />
      <span aria-hidden="true" className={styles.inner} />
      {showTab && <span aria-hidden="true" className={styles.tab} />}
      <span aria-hidden="true" className={styles.bars} />
      <div className={`${styles.content} ${contentClassName}`}>{children}</div>
    </div>
  )
}
