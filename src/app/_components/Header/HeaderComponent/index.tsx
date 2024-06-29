'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Header, Settings } from '../../../../payload/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { HeaderNav } from '../Nav'
import MobileNav from '../MobileNav'
import { noHeaderFooterUrls } from '../../../_constants'
import { usePathname, useSearchParams } from 'next/navigation'
import { useAuth } from '../../../_providers/Auth'
import { CartLink } from '../../CartLink'
import { Button } from '../../Button'
import NextImage from 'next/image'
import styles from './index.module.scss'

const HeaderComponent = ({ header, settings }: { header: Header; settings: Settings }) => {
  const pathName = usePathname()
  const { user } = useAuth()
  const inputRef = useRef(null)
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const searchParams = useSearchParams()
  const isSearchPage = pathName.startsWith('/search')
  const isBuildYourBrandPage = pathName === '/build-your-brand'

  const handleInputIconClick = () => {
    inputRef.current?.focus()
  }

  const handleSearchInput = e => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (searchParams.has('searchQuery') && searchParams.get('searchQuery') !== '') {
      const query = searchParams.get('searchQuery')
      if (query != null) {
        setSearchQuery(query)
      }
    }
  }, [searchParams])

  const createSearchParams = () => {
    const searchParams = new URLSearchParams()
    const trimmedQuery = (searchQuery || '').trim()
    searchParams.set('searchQuery', trimmedQuery)
    return searchParams.toString()
  }

  return (
    <div
      className={[
        noHeaderFooterUrls.includes(pathName) ? styles.hide : '',
        `border-b border-0 border-brand-primary/25 border-solid flex justify-between lg:px-8 px-4 py-4 backdrop-blur-xl filter ${
          isBuildYourBrandPage || isSearchPage ? 'bg-brand-primary/50' : 'bg-brand-primary/50'
        }`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container mx-auto flex justify-between w-full">
        <HeaderNav header={header} />
        <Link className="hidden lg:flex" href="/">
          <Image
            className="object-contain object-center lg:flex hidden"
            height={48}
            width={240}
            alt={settings?.siteLogo?.alt || 'Senso Coffee'}
            src={settings?.siteLogo?.url || ''}
          />
        </Link>
        <div className="flex gap-3 flex-1 lg:justify-end justify-between items-center">
          <div className="flex flex-row items gap-2 cursor-pointer">
            { searchQuery && <Link
              className={`flex items-center`}
              href={{ pathname: '/search', query: createSearchParams() }}
              target="_self"
            >
              <NextImage width={24} height={24} src={'/search-icon.svg'} alt="Search Icon" />
            </Link>}
            <input
              ref={inputRef}
              className="bg-transparent min-h-10 outline-none border-b border-0 border-solid text-b14 leading-headingLH2 border-white text-white placeholder:text-placeholder "
              type="text"
              placeholder="Search"
              value={searchQuery || ''}
              onChange={handleSearchInput}
            />
          </div>
          <div className="flex gap-3 items-center">
            {user && (
              <Link
                onClick={() => {
                  window.location.href = '/account'
                }}
                href="/account"
                className="flex items-center cursor-pointer"
              >
                <NextImage
                  width={24}
                  height={24}
                  alt="Account"
                  src={'/assets/icons/user-icon-menu.svg'}
                />
              </Link>
            )}
            {!user && (
              <Link
                onClick={() => {
                  window.location.href = '/login'
                }}
                href="/login"
                className="flex items-center cursor-pointer"
              >
                <NextImage width={24} height={24} alt="Login" src={'/assets/icons/SignIn.svg'} />
              </Link>
            )}
            <CartLink />
            <div className="lg:hidden flex items-center">
              <MobileNav settings={settings} header={header} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
