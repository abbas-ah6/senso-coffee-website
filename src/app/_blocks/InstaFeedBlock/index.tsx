"use client"

import React, { useEffect, useState } from 'react'
import { Page } from '../../../payload/payload-types'
import classes from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'

type Props = Extract<Page['layout'][0], { blockType: 'instaFeedBlock' }> & {
  id?: string
}

type InstagramPost = {
  id: string
  caption: string
  media_url: string
  media_type: string
  timestamp: string
  permalink: string
}

type InstagramPaging = {
  cursors: {
    before: string
    after: string
  }
}

type InstagramFeed = {
  data: InstagramPost[]
  paging?: InstagramPaging
}

export const InstaFeedBlock: React.FC<Props> = ({ heading }) => {
  const [instagramFeed, setInstagramFeed] = useState<InstagramFeed | null>(null)
  const [after, setAfter] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchFeed = async (after: string | null = null) => {
    try {
      const url = new URL("https://graph.instagram.com/me/media")
      url.searchParams.append("scope", "user_profile,user_media,instagram_graph_user_profile")
      url.searchParams.append("fields", "id,caption,media_url,media_type,timestamp,permalink")
      url.searchParams.append("access_token", "IGQWROc1ZAtTHBvaEFNTDRreFd6M2ZAmbmYyeGE3b3pzek9WYUMzN0gzT2hneXJDV3dFNlFFSklWNFIxVWF5ZAERoNXRaRW9HU2VYNDhjbXJwQl82M0NpT1k2T190QlRaOEFwbGUyN0dkWUJUYVU0Uk13MDQ5Unp5dTgZD")
      if (after) {
        url.searchParams.append("after", after)
      }

      const response = await fetch(url.toString(), {
        headers: {
          'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' https://checkout.stripe.com https://api.stripe.com https://maps.googleapis.com https://graph.instagram.com; frame-src 'self"
        }
      })
      console.log(response)
      const result = await response.json()

      if (response.ok) {
        setInstagramFeed((prevFeed) => {
          if (!prevFeed) return result
          return {
            ...result,
            data: [...prevFeed.data, ...result.data],
          }
        })
        setAfter(result.paging?.cursors.after || null)
      } else {
        setError(result.error.message)
      }
    } catch (err: any) {
      console.error('Error fetching Instagram feed:', err.message)
      setError(err.message)
    }
  }

  const loadMore = () => {
    fetchFeed(after)
  }

  useEffect(() => {
    fetchFeed()
  }, [])

  return (
    <>
      {error && <p className="text-red-500 hidden">{error}</p>}

      {instagramFeed && (
        <section id="about-senso-distributors" className="bg-cover bg-no-repeat bg-center hidden">
          <div className="container mx-auto py-8 px-4 flex-col flex lg:py-16 lg:px-8 lg:flex-row items-center">
            <h2 className="text-2xl font-semibold">{heading || "Instagram Feed"}</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {instagramFeed.data.map((post: InstagramPost) => (
                <div key={post.id} className="relative group w-full h-[300px]">
                  <Link
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative"
                  >
                    {post.media_type === 'VIDEO' ? (
                      <video
                        src={post.media_url}
                        controls={false}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={post.media_url}
                        alt={post.caption ?? ''}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                    )}

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-[300px]">
                      <p className="text-white text-center text-xs truncate">{post.caption}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {after && <button onClick={loadMore} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Load More</button>}
          </div>
        </section>
      )}
    </>
  )
}

export default InstaFeedBlock
