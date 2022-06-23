import React from "react"
import Helmet from "react-helmet"

const StructuredData = ({ children }) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(children)}</script>
    </Helmet>
  )
}

export default StructuredData
