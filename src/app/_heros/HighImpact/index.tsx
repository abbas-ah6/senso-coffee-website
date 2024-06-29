import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'
import DitributorRegistrationForm from './ditributorRegistrationForm'

export const HighImpactHero: React.FC<Page['hero']> = ({
  richText,
  media,
  links,
  heading,
  subHeading,
}) => {
  const fileName = media?.filename
  const backgroundImageStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}
  return (
    <div
      id='top'
      style={backgroundImageStyle}
      className={`bg-cover bg-no-repeat min-h-[520px] bg-center flex flex-col justify-end
    lg:min-h-[720px]
    `}
    >
      <div className="flex flex-col mt-[110px] lg:mt-0 lg:flex-row container mx-auto justify-between lg:items-end items-start gap-4">
        <div
          className={`${classes.blur} flex p-[24px] flex-col max-w-full text-center md:text-left h-fit rounded-2xl w-full
          md:max-w-[520px]
        lg:max-w-[600px] lg:text-left lg:py-[64px] lg:px-[42px]
        `}
        >
          {/* <RichText content={richText} /> */}
          <h1
            className="text-h2M text-white leading-headingLH1 font-bold
          lg:text-h2
          "
          >
            {heading}
          </h1>
          <p className="text-b16 leading-headingLH1 text-white mt-6 font-normal">{subHeading}</p>
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className="flex flex-row gap-6 pl-0 pt-6 list-none my-0 justify-center
              md:justify-start
            lg:justify-start
            "
            >
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <DitributorRegistrationForm />
      </div>
    </div>
  )
}
