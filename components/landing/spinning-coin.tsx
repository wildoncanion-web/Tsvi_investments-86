import styles from "./spinning-coin.module.css"

const EDGE_LAYERS = Array.from({ length: 12 }, (_, i) => i)

export function SpinningCoin() {
  return (
    <div className={styles.stage} role="img" aria-label="Spinning gold Bitcoin coin">
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
        <div className={`${styles.face} ${styles.front}`} />
        <div className={`${styles.face} ${styles.back}`} />
      </div>
    </div>
  )
}
