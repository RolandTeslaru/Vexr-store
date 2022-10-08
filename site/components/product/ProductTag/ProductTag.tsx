import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductTag.module.scss'
import styles from "./ProductTag.module.scss"
import DiscountTag from '../DiscountTag/DiscountTag'

interface ProductTagProps {
  className?: string
  name?: string
  price?: string
  fontSize?: number
  oldPrice?:string
  discount?:string
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price='',
  className = '',
  fontSize = 32,
  oldPrice='',
  discount=''
}) => {
  return (
    <div className={cn(s.root, className, styles.root)}>
      {name && (
        <h3 className={s.name}>
          <span
            className={cn({ [s.fontsizing]: fontSize < 32 })}
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: `${fontSize}px`,
            }}
          >
            {name}
          </span>
        </h3>
      )}
      <div className="flex flex-row">
        <h4 className={s.price}>
          {price} 
        </h4>
        <p className={styles.price + " line-through text-slate-300 xs:text-xs"}>{oldPrice}</p>
        {discount && (
          <DiscountTag
            discount={discount}
          />
        )}
      </div>

    </div>
  )
}

export default ProductTag
