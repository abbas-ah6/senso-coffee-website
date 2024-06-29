'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { RemoveFromCartButton } from '../RemoveFromCartButton'

import classes from './index.module.scss'

export const priceFromJSON = (priceJSON: string, quantity: number = 1, raw?: boolean): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsedPrice = parseFloat(priceJSON) * quantity
      const roundedPrice = Number(parsedPrice.toFixed(2))
      price = roundedPrice.toLocaleString('en-US', {
        style: 'decimal',
        currency: 'LBP',
      })
      
      // const parsed = JSON.parse(priceJSON)?.data[0]
      // const priceValue = parsed.unit_amount * quantity
      // const priceType = parsed.type

      // if (raw) return priceValue.toString()

      // price = (priceValue / 100).toLocaleString('en-US', {
      //   style: 'currency',
      //   currency: 'USD', // TODO: use `parsed.currency`
      // })

      // if (priceType === 'recurring') {
      //   price += `/${
      //     parsed.recurring.interval_count > 1
      //       ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
      //       : parsed.recurring.interval
      //   }`
      // }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON),
    withQuantity: priceFromJSON(priceJSON, quantity),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(priceJSON),
      withQuantity: priceFromJSON(priceJSON, quantity),
    })
  }, [priceJSON, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={classes.price}>
          <p className="text-b16 text-brand-dark leading-headingLH2">{price?.withQuantity}{" "}LBP</p>
          {quantity > 1 && (
            <small className="text-b16 text-brand-dark leading-headingLH2">{`${price.actualPrice} x ${quantity}`}</small>
          )}
        </div>
      )}
      {product.productStatus === 'inStock' ? (
        button && button === 'addToCart' ? (
          <AddToCartButton product={product} appearance="primary" />
        ) : (
          button === 'removeFromCart' && <RemoveFromCartButton product={product} />
        )
      ) : (
        button && (
          <div className="px-3 py-2 bg-brand-red text-white text-b16 leading-headingLH2 font-semibold rounded-xl">
            Out of Stock
          </div>
        )
      )}
    </div>
  )
}
