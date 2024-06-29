import React, { useState, useRef, useEffect } from 'react'
import { Header, Settings } from '../../../../payload/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../../../_providers/Auth'
import classes from './index.module.scss'
import { CMSLink } from '../../Link'

const MobileNav = ({ header, settings }: { header: Header; settings: Settings }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navItems = header?.navItems || []
  const modalRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  return (
    <>
      <button className={classes.menuButton} onClick={toggleMenu}>
        <Image src="/assets/icons/burger-icon.svg" alt="Menu Icon" width={24} height={24} />
      </button>
      {isOpen && (
        <div className={[classes.modal, 'bg-brand-dark'].filter(Boolean).join(' ')} ref={modalRef}>
          <div className={classes.modalContent}>
            <button className={classes.closeButton} onClick={toggleMenu}>
              &times;
            </button>
            <Link href="/">
              <Image
                className="object-contain object-center"
                height={48}
                width={240}
                alt={settings?.siteLogo?.alt || 'Senso Coffee'}
                src={settings?.siteLogo?.url || ''}
              />
            </Link>
            <nav className={[classes.nav, 'flex'].filter(Boolean).join(' ')}>
              {navItems.map(({ link }, i) => {
                const href =
                  link.type === 'reference' &&
                  typeof link.reference?.value === 'object' &&
                  link.reference.value.slug
                    ? `${
                        link.reference?.relationTo !== 'pages'
                          ? `/${link.reference?.relationTo}`
                          : ''
                      }/${link?.reference?.value?.slug}`
                    : link?.url
                    ? link.url
                    : '#'

                return (
                  <Link
                    key={i}
                    target="_self"
                    href={href}
                    onClick={() => {
                      setTimeout(() => {
                        toggleMenu()
                      }, 4000)
                    }}
                    className={'text-white text-h5 font-medium leading-headingLH2'}
                  >
                    {link.label && link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileNav
