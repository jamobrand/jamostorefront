require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl = process.env.URL || `https://jamobrand.com`

module.exports = {
  siteMetadata: {
    title: `Home Décor Products, Home & Kitchen, Home Décor Accents, & More`,
    description: `Discover Home Décor Products on Jamobrand.com at a great price. Our Home Décor category offers a great selection of Home Décor Products and more`,
    site_name: `Jamobrand Home | Home Décor Products, Home & Kitchen, Home Décor Accents, & More`,
    author: `@jamobrand`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: false,
        enableWebVitalsTracking: true,
        //selfHostedOrigin: "https://jbclient.jamobrand.com",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "info",
        path: `${__dirname}/src/content/info/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: false,
        develop: false,
        tailwind: true,
      },
    },
    {
      resolve: `gatsby-source-medusa`,
      options: {
        storeUrl:
          process.env.GATSBY_MEDUSA_BACKEND_URL || `http://localhost:9000`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: "/",
        query: `{
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          const pathToDateMap = {}

          const pages = allPages.map(page => {
            return { ...page, ...pathToDateMap[page.path] }
          })

          return pages
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://jamobrand.com",
        sitemap: "https://jamobrand.com/sitemap-0.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jamobrand.com`,
        short_name: `Jamobrand.com`,
        description: `Shop home decor and household products.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#634096`,
        display: `standalone`,
        icon: `src/images/icon-t.svg`,
      },
    },
    // `gatsby-plugin-offline`,
  ],
}
