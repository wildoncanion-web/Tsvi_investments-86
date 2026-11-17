import styles from "./spinning-coin.module.css"

const EDGE_LAYERS = Array.from({ length: 12 }, (_, i) => i)

export function SpinningCoin() {
  return (
    <div className={styles.stage} role="img" aria-label="Spinning gold Tsvi Investments coin">
      <div className={styles.shadow} aria-hidden="true" />
      <div className={styles.coin} aria-hidden="true">
        {EDGE_LAYERS.map((layer) => (
          <div
            key={layer}
            className={styles.edge}
            style={{
              transform: `translateZ(calc(var(--coin-size) * ${((layer / (EDGE_LAYERS.length - 1)) * 0.06 - 0.03).toFixed(4)}))`,
            }}
          />
        ))}
        <div className={`${styles.face} ${styles.front}`}>
          <span className={styles.symbol}>T</span>
          <span className={styles.label}>Tsvi</span>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.symbol}>$</span>
          <span className={styles.label}>Invest</span>
        </div>
      </div>
    </div>
  )
}
