'use client'

import React, { useCallback } from 'react'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'
import { Input } from '../../../_components/Input'

type FormData = {
  customerName: string
  customerContactNumber: string
  customerEmail: string
  customerAddress: string
}

export const CheckoutForm: React.FC<{}> = () => {
  // const stripe = useStripe()
  // const elements = useElements()
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      // e.preventDefault()
      setIsLoading(true)

      try {
        // const { error: stripeError, paymentIntent } = await stripe?.confirmPayment({
        //   elements: elements!,
        //   redirect: 'if_required',
        //   confirmParams: {
        //     return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation`,
        //   },
        // })

        // if (stripeError) {
        //   setError(stripeError.message)
        //   setIsLoading(false)
        // }

        // if (paymentIntent) {
        // Before redirecting to the order confirmation page, we need to create the order in Payload
        // Cannot clear the cart yet because if you clear the cart while in the checkout
        // you will be redirected to the `/cart` page before this redirect happens
        // Instead, we clear the cart in an `afterChange` hook on the `orders` collection in Payload
        try {
          const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
            method: 'POST',
    
            headers: {
              'Content-Type': 'application/json',
            },
            // paymentIntent.id
            body: JSON.stringify({
              total: cartTotal.raw,
              stripePaymentIntentID: null,
              items: (cart?.items || [])?.map(({ product, quantity }) => ({
                product: typeof product === 'string' ? product : product.id,
                quantity,
                price:
                  typeof product === 'object'
                    ? priceFromJSON(product.priceJSON, 1, true)
                    : undefined,
              })),
              customerName: data.customerName,
              customerContactNumber: data.customerContactNumber,
              customerEmail: data.customerEmail,
              customerAddress: data.customerAddress,
            }),
          })

          if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

          const {
            error: errorFromRes,
            doc,
          }: {
            message?: string
            error?: string
            doc: Order
          } = await orderReq.json()

          if (errorFromRes) throw new Error(errorFromRes)

          router.push(`/order-confirmation?order_id=${doc.id}`)
        } catch (err) {
          // don't throw an error if the order was not created successfully
          // this is because payment _did_ in fact go through, and we don't want the user to pay twice
          console.error(err.message) // eslint-disable-line no-console
          router.push(`/order-confirmation?error=${encodeURIComponent(err.message)}`)
        }
        // }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting payment: ${msg}`)
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal],
    // stripe, elements,
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {error && <Message error={error} />}
      {/* <PaymentElement /> */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <Input
          name="customerName"
          label="Full Name*"
          required
          register={register}
          disabled={isLoading}
          error={errors.customerName}
          type="text"
        />
        <Input
          name="customerContactNumber"
          label="Contact Number*"
          required
          register={register}
          disabled={isLoading}
          error={errors.customerContactNumber}
          type="tel"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <Input
          name="customerEmail"
          label="Email Address*"
          required
          disabled={isLoading}
          register={register}
          error={errors.customerEmail}
          type="email"
        />
        <Input
          name="customerAddress"
          label="Full Address"
          required
          disabled={isLoading}
          register={register}
          error={errors.customerAddress}
          type="text"
        />
      </div>
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="default" />
        <Button
          label={isLoading ? 'Loading...' : 'Checkout'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
