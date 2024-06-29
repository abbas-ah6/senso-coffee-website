import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Products page',
    },
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'socials',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'createAccountBanner',
      label: 'Create Account Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'loginBanner',
      label: 'Login Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'recoverPasswordBanner',
      label: 'Recover Password Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
