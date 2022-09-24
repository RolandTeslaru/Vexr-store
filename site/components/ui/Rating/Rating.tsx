import { FC, memo } from 'react'
import rangeMap from '@lib/range-map'
import { Star } from '@components/icons'
import cn from 'clsx'
import styles from "./Rating.module.scss"

export interface RatingProps {
  value: number
}

const Quantity: FC<RatingProps> = ({ value = 5 }) => (
  <div className={styles.rating}>
    {rangeMap(5, (i) => (
      <span
        key={`star_${i}`}
        className={cn('inline-block ml-1 ', {
          'text-accent-5': i >= Math.floor(value),
        })}
      >
        <div className={styles.star}>
          <Star />
        </div>
      </span>
    ))}
  </div>
)

export default memo(Quantity)
