import { navigate } from "gatsby"
import React, { useState } from "react"
import { useCart } from "../../../hooks/use-cart"
// import ErrorMessage from "../../utility/error-message"
import InfoMessage from "../../utility/info-message"

// 🚧 This is a test payment, and is for testing purposes only.
// Look at the Medusa documentation on how to use one of our
// existing payment plugins or how to implement one:
// https://docs.medusajs.com/guides/plugins

const ManualPayment = () => {
  const {
    actions: { completeCart, setPaymentSession },
  } = useCart()

  const [processing, setProcessing] = useState(false)

  const handleTestPayment = async () => {
    setProcessing(true)

    const cart = await setPaymentSession("manual")

    if (!cart) {
      setProcessing(false)
      return
    }

    const order = await completeCart(cart.id)

    if (!order) {
      setProcessing(false)
      return
    }

    setProcessing(false)
    navigate("/order-confirmed", { state: { order } })
  }

  return (
    <div className="flex flex-col">
      <InfoMessage
        info={
          "For select orders around Nairobi an initial deposit is required to show commitment. Outside Nairobi full payment has to be made.For more info contact our customer service @ 0746 381892."
        }
      />
      <button
        className="btn-ui my-4"
        onClick={handleTestPayment}
        disabled={processing}
      >
        {processing ? "Processing..." : "Place Order"}
      </button>
    </div>
  )
}

export default ManualPayment
