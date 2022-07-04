import React from "react"
import ShippingOptions from "../shipping/shipping-options"

const CheckoutDelivery = ({ controller, options, currencyCode = "kes" }) => {
  const { setSelectedShippingMethod, selectedShippingMethod } = controller
  return (
    <div className="my-8">
      <div className="text-gray-700 text-xs flex items-center">
        <div className="bg-gray-400 text-white w-4 h-4 rounded-lg text-center mr-2">
          !
        </div>
        <p>Delivery prices my change for orders outside Nairobi.</p>
      </div>
      <ShippingOptions
        defaultValue={selectedShippingMethod}
        onSelect={setSelectedShippingMethod}
        options={options}
        currencyCode={currencyCode}
      />
    </div>
  )
}

export default CheckoutDelivery
