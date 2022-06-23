import React from "react"

const InfoMessage = ({ info }) => {
  return (
    <div
      role="alert"
      className="flex items-center text-gray-700 text-sm bg-blue-300 px-4 py-2 rounded-md mt-4"
    >
      <div className="bg-blue-400 text-white font-medium w-8 h-5 rounded-lg text-center mr-2">
        !
      </div>
      <span>{info}</span>
    </div>
  )
}

export default InfoMessage
