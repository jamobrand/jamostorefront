import React, { useEffect, useState } from "react"
import OrderCompletedItem from "../components/orders/order-completed-item"
import OrderTotal from "../components/orders/order-total"
import SearchEngineOptimization from "../components/utility/seo"

const OrderConfirmed = ({ location }) => {
  const [order, setOrder] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState(
    "Hang on, while we process your order."
  )

  useEffect(() => {
    const getOrder = async () => {
      const state = location.state
      const stateOrder = state?.order

      if (stateOrder) {
        setOrder(stateOrder)
      }
      setLoading(false)
    }

    getOrder()
    if (typeof window !== "undefined" || !order) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ ecommerce: null })
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          currency: "KES",
          email: `${order.email}`,
          customerFirstName: `${order.shipping_address.first_name}`,
          customerLastName: `${order.shipping_address.last_name}`,
          customerCity: `${order.shipping_address.city}`,
          customerCounty: `${order.shipping_address.province}`,
          customerLocation: `${order.shipping_address.address_1}`,
          customerApartment: `${order.shipping_address.address_2}`,
          customerStreetName: `${order.shipping_address.postal_code}`,
          customerPhoneNumber: `${order.shipping_address.phone}`,
          customerId: `${order.customer_id}`,
          transaction_id: `${order.id}`,
          affiliation: "Jamobrand",
          tax: `${order.tax_total}`,
          shipping: `${order.shipping_total}`,
          value: `${parseFloat(((order.total / 100) * 1 * 1).toFixed(2))}`,
          items: [
            order.items.map(
              item =>
                `item_id: ${item.id},
                item_name: ${item.title},
                price: ${parseFloat(
                  ((item.unit_price / 100) * 1 * 1).toFixed(2)
                )},
                quantity: ${item.quantity}`
            ),
          ],
        },
      })
    }
  }, [location.state, order])

  console.log(order)

  useEffect(() => {
    const onNoOrder = () => {
      if (!order && !loading) {
        setMessage(
          "We couldn't find your order, it might have gone through but we can't seem to find it at the moment. Please check your email for an order confirmation."
        )
      }
    }

    const checkForOrder = setTimeout(onNoOrder, 5000)

    return () => clearTimeout(checkForOrder)
  }, [order, loading])

  return !loading && order ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Order Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">THANK YOU</span>
        <h1>Order Confirmed</h1>
        <p className="text-md font-light mt-3">
          Your order #{order.display_id} was successfully processed. You will
          receive an email with the tracking number of your parcel once it’s
          avaliable.
        </p>
        <div className="my-8">
          {order.items.map((item, index) => {
            return (
              <OrderCompletedItem
                key={index}
                item={item}
                currencyCode={order.currency_code}
              />
            )
          })}
        </div>
        <OrderTotal order={order} />
      </div>
    </div>
  ) : (
    <div className="h-screen flex items-center justify-center px-6">
      <p>{message}</p>
    </div>
  )
}

export default OrderConfirmed
