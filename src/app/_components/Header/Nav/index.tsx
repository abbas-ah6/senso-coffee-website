'use client'

import React from 'react'
import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'
import { CartLink } from '../../CartLink'
import Link from 'next/link'
import { Button } from '../../Button'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[classes.nav, user === undefined && classes.hide, 'lg:flex hidden flex-1']
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
    </nav>
  )
}
