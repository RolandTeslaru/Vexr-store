import {
  FC,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.scss'
import { useRouter } from 'next/router'

interface NavbarTypes {
  children: ReactNode
  showSearch: boolean
  setShowSearch: Dispatch<SetStateAction<boolean>>
}

const NavbarRoot: FC<NavbarTypes> = ({
  children,
  showSearch,
  setShowSearch,
}) => {
  // Nav hide control system
  const { pathname } = useRouter()
  const [hideNav, setHideNav] = useState(true)
  const handleNav = () => {
    if (window.scrollY > 200) {
      setHideNav(false)
    } else {
      setHideNav(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleNav)
    return () => {
      window.removeEventListener('scroll', handleNav)
    }
  }, [])

  return (
    <div
      className={`${s.root} ${
        hideNav && !showSearch && pathname === '/' && s.transparent
      }  ${pathname !== '/' && s.sticky}`}
    >
      {children}
    </div>
  )
}

export default NavbarRoot
