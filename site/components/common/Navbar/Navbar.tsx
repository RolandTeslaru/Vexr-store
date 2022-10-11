import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Image from "next/image"

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  // // Nav hide control system
  // const [showNav, setShowNav] = useState(true)
  // const handleNav = () => {
  //   if(window.scrollY > 100 ){
  //     setShowNav(false);
  //   } else {
  //     setShowNav(true);
  //   }
  // }
  // useEffect(() => {
  //   window.addEventListener('scroll', handleNav)
  //   return () => {
  //     window.removeEventListener('scroll', handleNav)
  //   }
  // })

  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
        <div className={s.items_container}>
          <Link href="/">
            <a aria-label='Logo' className={s.logo}>
              <Image width={147} height={30} src={"/VexrLogo-WhitePNG.webp"} alt={"Vexr Logo "} />
            </a>
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>See all products</a>
            </Link>
            {/* Categories */}
            {/* {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))} */}
          </nav>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className={s.search}>
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
)
export default Navbar