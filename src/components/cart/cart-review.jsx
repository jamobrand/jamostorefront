import { Link } from "gatsby"
import React from "react"
import Totals from "../checkout/totals"

const CartReview = ({ cart }) => {
  const beginCheckout = () => {
    // if (typeof window !== "undefined" || !item) {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "KES",
        value: `${parseFloat(((cart.subtotal / 100) * 1 * 1).toFixed(2))}`,
        items: [cart.items],
      },
    })
    window.dataLayer.push({
      event: "InitiateCheckout",
      products: {
        content_type: "product",
        content_ids: [`${cart.items.map(cart => cart.variant.product_id)}`],
        value: `${parseFloat(((cart.subtotal / 100) * 1 * 1).toFixed(2))}`,
        currency: "KES",
        contents: [cart.items],
        num_items: `${cart.items.length}`,
      },
    })
    // }
  }

  return (
    <div className="bg-white rounded-md shadow px-8 py-6 w-full sticky top-28">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="mb-4">
        <Totals cart={cart} />
      </div>
      <Link onClick={() => beginCheckout()} to="/checkout">
        <button className="btn-ui w-full">Checkout</button>
      </Link>
    </div>
  )
}

export default CartReview
