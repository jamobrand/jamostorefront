import React, { useEffect, useState } from "react"
import { classNames } from "../../utils/class-names"

const Banner = () => {
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    if (localStorage) {
      setIsHidden(localStorage.getItem("hideBannerMsg") === "true")
    }
  }, [])

  const hideBanner = () => {
    localStorage.setItem("hideBannerMsg", "true")
    setIsHidden(true)
  }

  return (
    <div
      className={classNames(
        isHidden ? "hidden" : "",
        "bg-ui-top h-10 flex items-center justify-between text-sm font-bold text-blue px-4 sm:px-6 lg:px-8"
      )}
    >
      <p className="text-white font-bold">
        To Order Call or WhatsApp @ 0746 381892.
      </p>
      <button onClick={() => hideBanner()}>&times;</button>
    </div>
  )
}

export default Banner
