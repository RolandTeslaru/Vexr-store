import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductTag.module.scss'
import styles from "./ProductTag.module.scss"

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
  oldPrice?: string
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price='',
  oldPrice= "",
  className = '',
  fontSize = 32,
}) => {
  return (
    <div className={cn(s.root, className, styles.root)}>
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
      <h4>
        
      </h4>
      <h4 className={s.price}>{price}</h4>
      <h3>{oldPrice}</h3>
    </div>
  )
}

export default ProductTag
