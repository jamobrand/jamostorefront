import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from "react-instantsearch-dom"

import React from "react"
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch"

const searchClient = instantMeiliSearch(
  process.env.GATSBY_MEILISEARCH_HOST,
  process.env.GATSBY_MEILISEARCH_API_KEY
)

const Search = () => (
  <InstantSearch indexName="products" searchClient={searchClient}>
    <SearchBox />
    <Hits hitComponent={Hit} />
    <Pagination />
  </InstantSearch>
)

const Hit = ({ hit }) => {
  return (
    <div key={hit.id}>
      <div className="hit-name">
        <Highlight attribute="name" hit={hit} />
      </div>
      <img src={hit.image} align="left" alt={hit.name} />
      <div className="hit-description">
        <Snippet attribute="description" hit={hit} />
      </div>
      <div className="hit-info">price: {hit.price}</div>
      <div className="hit-info">release date: {hit.releaseDate}</div>
    </div>
  )
}

export default Search
