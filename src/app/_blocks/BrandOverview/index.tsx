import React from 'react';
import { Page } from '../../../payload/payload-types';
import RichText from '../../_components/RichText';
import Image from 'next/image';

import classes from './index.module.scss';

type Props = Extract<Page['layout'][0], { blockType: 'brandOverview' }>;

const BrandOverview: React.FC<Props & { id?: string }> = ({ richText, media, brandTimeLine }) => {
  const fileName = media?.filename;

  return (
    <section className="bg-brand-light-brown">
      <div
        className="container mx-auto py-8 px-4 text-center justify-center flex flex-col items-center
        lg:py-16 lg:px-8"
      >
        <div
          className="text-center
        md:max-w-[520px] lg:max-w-[720px]"
        >
          <RichText className="rich-text mb-5 text-brand-dark" content={richText} />
        </div>
        <Image
          width={670}
          height={320}
          alt={media?.alt || 'Image'}
          className='hidden lg:flex object-contain object-center'
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
        />
          <Image
          width={280}
          height={220}
          alt={media?.alt || 'Image'}
          className='flex lg:hidden object-contain object-center'
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
        />
        {/* <div className={classes.timelineContainer}>
          <div className={classes.timeline}>
            <div className={classes.timelineDivider}></div>
            {brandTimeLine.map((item, index) => (
              <div
                key={index}
                className={[
                  classes.timelineItem,
                  `${index % 2 === 0 ? classes.top : classes.bottom}`,
                ].join(' ')}
              >
                <div className={classes.timelineConnector}></div>
                <div className={classes.timelineContent}>
                  <div className={classes.timelineYear}>
                    <h3>{item.year}</h3>
                    <p>{item.shortInformation}</p>
                  </div>
                  <div
                    className={[
                      classes.timelineDescription,
                      `${index % 2 === 0 ? classes.right : classes.left}`,
                    ].join(' ')}
                  >
                    <p>{item.shortDescription}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default BrandOverview;
