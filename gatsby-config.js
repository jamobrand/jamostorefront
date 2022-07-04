require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl = process.env.URL || `https://jamobrand.com`

module.exports = {
  siteMetadata: {
    title: `Home Decor Products, Home & Kitchen & More`,
    description: `Browse home decor products from wallpapers, decor items and accents, kitchenware and kitchen items, organization and storage products & more from Jamobrand Home`,
    site_name: `Jamobrand Home | Home Décor Products, Home & Kitchen & More`,
    author: `@jamobrand`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GOOGLE_TAGMANAGER_ID,
        includeInDevelopment: false,
        defaultDataLayer: function () {
          return {
            pageType: window.pageType,
          }
        },
        enableWebVitalsTracking: true,
        selfHostedOrigin: "https://jbclient.jamobrand.com",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: process.env.GATSBY_GA_TRACKING_ID,
      },
      pluginConfig: {
        head: true,
        origin: "https://jbclient.jamobrand.com",
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
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path, lastmod, changefreq, priority }) => {
          return {
            url: path,
            lastmod,
            changefreq,
            priority,
          }
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://jamobrand.com",
        sitemap: "https://jamobrand.com/sitemap-0.xml",
        policy: [
          {
            userAgent: "*",
            allow: "/",
            disallow: [
              "https://jamobrand.com/swap/",
              "https://jamobrand.com/account/",
              "https://jamobrand.com/swap-confirmed/",
              "https://jamobrand.com/account/order-history/",
              "https://jamobrand.com/shopping-bag/",
              "https://jamobrand.com/return-confirmed/",
              "https://jamobrand.com/order-confirmed/",
              "https://jamobrand.com/create-return/",
              "https://jamobrand.com/checkout/",
            ],
          },
        ],
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
    `gatsby-plugin-offline`,
  ],
}
