const getSiteInfoQuery = /* GraphQL */ `
  query getSiteInfo {
    shop {
      name
      refundPolicy {
        body
        id
        url
        title
      }
      privacyPolicy{
        body
        id
        url
        title
      }
      shippingPolicy{
        body
        id
        url
        title
      }
    }
  }
`
export default getSiteInfoQuery
