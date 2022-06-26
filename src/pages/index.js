import { graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import React from "react"
import StructuredData from "../components/utility/structuredData"
import CollectionPreview from "../components/categories/collection-preview"
import ProductListItem from "../components/products/product-list-item"
import Grid from "../components/utility/grid"
import SearchEngineOptimization from "../components/utility/seo"
import { useCollections } from "../hooks/use-collections"

const IndexPage = ({ data }) => {
  const { products, collections } = data
  const prods = data.products.edges.map(edge => edge.node)
  const collectionPreviews = useCollections(collections, products)

  return (
    <div>
      <SearchEngineOptimization title="Jamobrand Home" />
      <StructuredData>
        {{
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://jamobrand.com",
          name: "Jamobrand Home | Home Décor Products, Home & Kitchen, Home Décor Accents, & More",
          description:
            "Home Decor, Home and Kitchen Products, Decor Accents & More",
          sameAs: [
            "https://facebook.com/jamobrand",
            "https://twitter.com/jamobrand",
            "https://instagram.com/jamobrand",
            "https://linkedin.com/company/jamo-brand",
            "https://www.youtube.com/channel/UCoKNfI8YFd1Th3m5r4d7_Yg/featured",
          ],
        }}
      </StructuredData>

      <div className="bg-ui-landcolor pb-12 lg:pb-0 w-full px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center max-w-screen-2xl mx-auto">
          <StaticImage
            src="../images/home-dec.png"
            alt="Home Decor Products Assembled Jamobrand."
            placeholder="tracedSVG"
            className="w-full lg:w-1/2 h-auto"
          />
          <div>
            <h1 className="text-3xl">Transform Your Home Today</h1>
            {/* <p className="mt-2 text-lg font-normal">
              Contribute to Medusa and receive free merch
              <br />
              as a token of our appreciation
            </p> */}
            <p className="mt-2 text-lg font-normal">
              Shop home decor products today!
            </p>
            {/* <button className="btn-ui mt-4 min-w-full lg:min-w-0">
              Learn more
            </button> */}
          </div>
        </div>
      </div>
      <div className="layout-base my-12 min-h-0">
        <Grid
          title={"Featured"}
          cta={{ to: "/products", text: "Browse all products" }}
        >
          {prods.slice(0, 4).map(p => {
            return <ProductListItem product={p} key={p.handle} />
          })}
        </Grid>
        <div className="mt-12">
          <Grid
            title="Shop by collection"
            cta={{ to: "/collections", text: "Browse all collections" }}
          >
            {collectionPreviews.slice(0, 4).map(collection => {
              return (
                <CollectionPreview
                  key={collection.id}
                  collection={collection}
                />
              )
            })}
          </Grid>
        </div>
      </div>
    </div>
  )
}
export const query = graphql`
  query {
    products: allMedusaProducts {
      edges {
        node {
          handle
          title
          collection_id
          thumbnail {
            childImageSharp {
              gatsbyImageData
            }
          }
          variants {
            prices {
              amount
              currency_code
            }
          }
        }
      }
    }
    collections: allMedusaCollections {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`

export default IndexPage
