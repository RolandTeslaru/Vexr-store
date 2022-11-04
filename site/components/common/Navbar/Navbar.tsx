import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import s from './Navbar.module.scss'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import Image from "next/image"
import {AiOutlineSearch} from "react-icons/ai"

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => {
  
  const [showSearch, setShowSearch] = useState(false)

  return(
  <NavbarRoot showSearch={showSearch} setShowSearch={setShowSearch}>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={`${s.nav}`}>
        <div className={s.items_container}>
          <div className={s.logo}>
            <Link href="/">
              <a aria-label='Logo'>
                <Image width={147} height={30} src={"/VexrLogo-WhitePNG.webp"} alt={"Vexr Logo "} />
              </a>
            </Link>
          </div>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>See all products</a>
            </Link>
            <Link href="/order">
              <a href={s.link}>Track Order</a>
            </Link>
            {/* Categories */}
            {/* {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))} */}
          </nav>
        </div>
        {/* className="justify-center flex-1 hidden lg:flex " */}
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className={`justify-center flex-1 hidden lg:flex`}>
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          {process.env.COMMERCE_SEARCH_ENABLED && (
            <div className="flex lg:hidden cursor-pointer">
              <AiOutlineSearch onClick={() => setShowSearch(!showSearch)}/>
            </div>
          )}
          <UserNav />
        </div>
        
      </div>
      {process.env.COMMERCE_SEARCH_ENABLED && showSearch && (
        
        <div className={s.search}>
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
  )
}
export default Navbar