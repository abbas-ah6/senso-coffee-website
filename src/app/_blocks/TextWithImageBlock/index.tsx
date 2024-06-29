import React, { useEffect } from 'react'
import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import { CMSLink } from '../../_components/Link'
import Image from 'next/image'

type Props = Extract<Page['layout'][0], { blockType: 'textWithImageBlock' }>

export const TextWithImageBlock: React.FC<Props & { id?: string }> = ({ imagePosition, richText, media }) => {
  const fileName = media?.filename || "";
  // const backgroundImageStyle = fileName ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` } : {};
  return (
    <section id='our-mission-and-vision' className='bg-white'>
      <div className={`container mx-auto py-8 px-4 gap-4 flex flex-col items-center ${imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'}
      lg:py-16 lg:px-8 lg:gap-8
      `}>
        <div className='text-center flex items-center flex-1 lg:text-left'>
          <RichText className="rich-text text-brand-black" content={richText} />
        </div>
        <div className='flex justify-center
        '>
          <Image width={500} height={500} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`} className="object-cover object-center rounded-[42px] hidden lg:flex" alt={media?.alt || "image"} />
          <Image width={320} height={320} src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`} className="object-cover object-center rounded-[42px] flex lg:hidden" alt={media?.alt || "image"} />
        </div>
      </div>
    </section>
  )
}