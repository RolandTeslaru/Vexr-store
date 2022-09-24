import { FC } from 'react'
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
  <NavbarRoot>
    <Container clean className="mx-auto max-w-8xl px-6">
      <div className={s.nav}>
      {/* "flex items-center flex-1" */}
        <div className={s.items_container}>
          <Link href="/">
            {/* <a className={s.logo} aria-label="Logo">
              <img src="/VexrLogo-WhitePNG.png" alt="Vexr_logo" />
            </a> */}
            <a aria-label='Logo' className={s.logo}>
              <Image width={147} height={30} src={"/VexrLogo-WhitePNG.png"} alt={"Vexr Logo "} />
            </a>
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
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
