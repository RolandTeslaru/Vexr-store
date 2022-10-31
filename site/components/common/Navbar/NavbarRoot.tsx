import { FC, useState, useEffect } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.scss'
import { useRouter } from 'next/router'

const NavbarRoot: FC = ({ children }) => {
  // Nav hide control system
  const {pathname} = useRouter()
  console.log("path name " + pathname);
  

  const [hideNav, setHideNav] = useState(true)
  const handleNav = () => {
    if(window.scrollY > 200 ){
      setHideNav(false);
    } else {
      setHideNav(true);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleNav)
    return () => {
      window.removeEventListener('scroll', handleNav)
    }
  },[])
  console.log(hideNav)

  return (
    <div  className={`${s.root} ${hideNav && pathname === "/" && s.transparent} ${pathname !== "/" && s.sticky}`}>
      {children}
    </div>
  )
}

export default NavbarRoot
