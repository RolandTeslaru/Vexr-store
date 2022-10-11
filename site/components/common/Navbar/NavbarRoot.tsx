import { FC, useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.scss'

const NavbarRoot: FC = ({ children }) => {

  return (
    <div className={cn(s.root)}>
      {children}
    </div>
  )
}

export default NavbarRoot
